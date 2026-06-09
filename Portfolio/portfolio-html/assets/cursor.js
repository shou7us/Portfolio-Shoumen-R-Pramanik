(function() {
  // Only initialize on desktop
  if (window.matchMedia('(max-width: 1024px)').matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  cursor.id = 'cursor';
  document.body.appendChild(cursor);

  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  ring.id = 'cursorRing';
  document.body.appendChild(ring);

  let mx = 0, my = 0, rx = 0, ry = 0;
  
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animRing() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  const handleMouseEnter = () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
    ring.style.width = '50px';
    ring.style.height = '50px';
    ring.style.borderColor = 'rgba(201, 76, 46, 0.6)';
  };

  const handleMouseLeave = () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    ring.style.width = '32px';
    ring.style.height = '32px';
    ring.style.borderColor = 'rgba(201, 76, 46, 0.35)';
  };

  const attachEvents = (elements) => {
    elements.forEach(el => {
      if (el.dataset.cursorBound) return;
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
      el.dataset.cursorBound = "true";
    });
  };

  // Initial attachment
  const selector = 'a, button, tr, .card, .btn-primary, .btn-ghost, .nav-logo, .chip';
  attachEvents(document.querySelectorAll(selector));

  // Observe for dynamic elements
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            if (node.matches(selector)) attachEvents([node]);
            attachEvents(node.querySelectorAll(selector));
          }
        });
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
