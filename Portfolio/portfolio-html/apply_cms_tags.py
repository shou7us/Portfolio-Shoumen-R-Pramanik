import os
import re

mapping = {
    "customer-directory-case-study.html": "customer-directory",
    "experience-navigator.html": "experience-navigator",
    "ai-assistant-case-study.html": "ai-assistant",
    "ai-survey-creation-case-study.html": "survey-creation-90",
    "sogolytics-case-study.html": "ai-powered-insights",
    "sogolytics-dashboard-case-study.html": "custom-dashboard",
    "sogolytics-filter-architecture-case-study.html": "smart-filter-architecture",
    "case-study-derived-fields.html": "ai-derived-fields",
    "breaking-enterprise-ceiling-full.html": "breaking-enterprise-ceiling",
    "breaking-the-enterprise-ceiling.html": "breaking-enterprise-ceiling"
}

for filename, slug in mapping.items():
    if not os.path.exists(filename):
        continue
        
    with open(filename, 'r') as f:
        content = f.read()
    
    # Add script if missing
    if 'cms-sync.js' not in content:
        content = content.replace('</head>', '<script src="cms-sync.js"></script>\n</head>')
    
    # Add data-project-slug to body if missing
    if 'data-project-slug' not in content:
        content = re.sub(r'<body([^>]*)>', f'<body\\1 data-project-slug="{slug}">', content)
    
    with open(filename, 'w') as f:
        f.write(content)
    print(f"Updated {filename} with slug {slug}")
