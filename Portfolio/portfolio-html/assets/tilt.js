(function() {
  function initTilt() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
      if (card.dataset.tiltInitialized) return;
      card.dataset.tiltInitialized = "true";

      // Add glare element
      let glare = card.querySelector('.card-glare');
      if (!glare) {
        glare = document.createElement('div');
        glare.className = 'card-glare';
        card.appendChild(glare);
      }

      let reqId = null;
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;
      let targetScale = 1;
      let currentScale = 1;
      let isHovered = false;

      function update() {
        // Dampening factor (0.1 for smooth tracking, 0.05 for return)
        const lerpFactor = isHovered ? 0.15 : 0.08;
        
        currentX += (targetX - currentX) * lerpFactor;
        currentY += (targetY - currentY) * lerpFactor;
        currentScale += (targetScale - currentScale) * lerpFactor;
        
        card.style.setProperty('transform', 
          `perspective(1200px) rotateX(${currentX}deg) rotateY(${currentY}deg) scale3d(${currentScale}, ${currentScale}, ${currentScale})`, 
          'important'
        );

        if (!isHovered && Math.abs(currentX) < 0.01 && Math.abs(currentY) < 0.01 && Math.abs(currentScale - 1) < 0.001) {
          card.style.setProperty('transform', 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)', 'important');
          reqId = null;
          return;
        }

        reqId = requestAnimationFrame(update);
      }

      card.addEventListener('mousemove', e => {
        isHovered = true;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        targetX = ((centerY - y) / centerY) * 12;
        targetY = ((x - centerX) / centerX) * 12;
        targetScale = 1;

        // Update glare
        if (glare) {
          glare.style.opacity = '1';
          const glareX = (x / rect.width) * 100;
          const glareY = (y / rect.height) * 100;
          glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 80%)`;
        }

        if (!reqId) reqId = requestAnimationFrame(update);
      });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        targetX = 0;
        targetY = 0;
        targetScale = 1;
        if (glare) glare.style.opacity = '0';
        if (!reqId) reqId = requestAnimationFrame(update);
      });
      
      // Force container to allow overflow
      const container = card.parentElement;
      if (container) container.style.overflow = 'visible';
    });
  }

  // Initial init
  initTilt();

  // Watch for dynamic card additions
  const observer = new MutationObserver(() => initTilt());
  observer.observe(document.body, { childList: true, subtree: true });
})();
