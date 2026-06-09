import json
import os

projects_dir = 'content/projects'
projects = []

for filename in sorted(os.listdir(projects_dir)):
    if filename.endswith('.json'):
        with open(os.path.join(projects_dir, filename), 'r') as f:
            projects.append(json.load(f))

# Sort by 'order' if available
projects.sort(key=lambda x: x.get('order', 999))

with open('projects.json', 'w') as f:
    json.dump({'projects': projects}, f, indent=2)

print(f"Successfully merged {len(projects)} projects into projects.json")
