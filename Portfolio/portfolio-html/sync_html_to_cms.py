import os
import json
import re

def sync_html_to_cms():
    projects_dir = 'content/projects'
    html_files = [f for f in os.listdir('.') if f.endswith('.html') and f != 'index.html']
    
    synced_count = 0
    
    for html_file in html_files:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find slug
        slug_match = re.search(r'data-project-slug="([^"]+)"', content)
        if not slug_match:
            continue
            
        slug = slug_match.group(1)
        json_path = os.path.join(projects_dir, f"{slug}.json")
        
        if not os.path.exists(json_path):
            continue
            
        with open(json_path, 'r', encoding='utf-8') as f:
            project_data = json.load(f)
            
        # Robust field extraction
        # Find all tags that have data-cms-field
        # <(tagname) [^>]*data-cms-field="path"[^>]*>(content)</\1>
        field_matches = re.finditer(r'<([a-z0-9]+)\s+[^>]*data-cms-field="([^"]+)"[^>]*>(.*?)</\1>', content, re.DOTALL | re.IGNORECASE)
        
        changed = False
        for match in field_matches:
            tag_name = match.group(1)
            field_path = match.group(2)
            new_value = match.group(3).strip()
            
            # Clean up value (remove excessive whitespace)
            new_value = re.sub(r'\s+', ' ', new_value)
            
            # Navigate deep into the dictionary
            parts = field_path.split('.')
            target = project_data
            for part in parts[:-1]:
                if part not in target:
                    target[part] = {}
                target = target[part]
            
            old_value = target.get(parts[-1])
            if old_value != new_value:
                target[parts[-1]] = new_value
                changed = True
                print(f"Updated {slug} -> {field_path}")

        if changed:
            with open(json_path, 'w', encoding='utf-8') as f:
                json.dump(project_data, f, indent=2)
            synced_count += 1

    if synced_count > 0:
        print(f"\nSynced {synced_count} project(s) from HTML to CMS.")
        os.system('python3 build_projects.py')
    else:
        print("No changes detected in HTML files.")

if __name__ == "__main__":
    sync_html_to_cms()
