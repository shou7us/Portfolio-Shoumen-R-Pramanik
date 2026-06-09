/**
 * CMS Sync Helper
 * Automatically populates static HTML pages with data from individual project files
 */
(function() {
  async function initCMS() {
    const body = document.body;
    const slug = body.getAttribute('data-project-slug');
    if (!slug) return;

    try {
      // Fetch the individual project data file
      const response = await fetch(`content/projects/${slug}.json?t=${Date.now()}`);
      if (!response.ok) {
        // Fallback to the main projects.json if individual file doesn't exist
        const mainResponse = await fetch(`projects.json?t=${Date.now()}`);
        const mainData = await mainResponse.json();
        const project = mainData.projects.find(p => p.slug === slug);
        if (project) populatePage(project);
        return;
      }

      const project = await response.json();
      populatePage(project);

    } catch (err) {
      console.error('CMS Sync Error:', err);
    }
  }

  function populatePage(project) {
    console.log(`CMS Sync: Populating page with data for "${project.slug}"`, project);

    // 1. Update text fields (supports dot notation like "meta.role")
    document.querySelectorAll('[data-cms-field]').forEach(el => {
      const fieldPath = el.getAttribute('data-cms-field');
      const value = getDeepValue(project, fieldPath);
      if (value !== undefined && value !== null) {
        if (el.tagName === 'IMG') {
          el.src = value;
        } else if (el.classList.contains('cms-bg')) {
          el.style.backgroundImage = `url('${value}')`;
        } else {
          el.innerHTML = value; // Use innerHTML to allow basic formatting if needed
        }
      }
    });

    // 2. Update image lists (Final Screens, Wireframes)
    document.querySelectorAll('[data-cms-list]').forEach(container => {
      const listPath = container.getAttribute('data-cms-list');
      const items = getDeepValue(project, listPath);
      
      if (items && Array.isArray(items) && items.length > 0) {
        // Clear existing placeholders
        container.innerHTML = '';
        
        items.forEach(item => {
          // Handle both string arrays and object arrays from CMS
          const imgPath = typeof item === 'string' ? item : item.image;
          if (!imgPath) return;

          const img = document.createElement('img');
          img.src = imgPath;
          img.className = container.getAttribute('data-cms-class') || 'cms-list-img';
          container.appendChild(img);
        });
      }
    });
  }

  function getDeepValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }

  // Run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCMS);
  } else {
    initCMS();
  }
})();
