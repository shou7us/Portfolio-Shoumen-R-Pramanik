import json
import os

with open('projects.json', 'r') as f:
    data = json.load(f)

projects = data.get('projects', [])

for project in projects:
    slug = project.get('slug')
    if slug:
        file_path = f'content/projects/{slug}.json'
        with open(file_path, 'w') as f:
            json.dump(project, f, indent=2)
        print(f"Created {file_path}")
