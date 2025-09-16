// Aurora Neon hover for cards with [data-aurora]
(() => {
    const cards = document.querySelectorAll('[data-aurora]');
  
    cards.forEach(card => {
      const overlay = card.querySelector('[data-aurora-overlay]');
      if (!overlay) return;
  
      // Mostrar/ocultar overlay con hover (por si el padre no es .group)
      card.addEventListener('mouseenter', () => {
        overlay.style.opacity = '1';
      });
      card.addEventListener('mouseleave', () => {
        overlay.style.opacity = '0';
      });
  
      // Mover blobs con el cursor
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        // Guardamos en variables CSS para que los <span> usen var(--x/--y)
        overlay.style.setProperty('--x', `${x}%`);
        overlay.style.setProperty('--y', `${y}%`);
      });
    });
  })();
  