// Ripple (gota + ondas) neón que sigue al cursor en tarjetas con [data-ripple-card]
(() => {
    const CARDS = document.querySelectorAll('[data-ripple-card]');
    if (!CARDS.length) return;
  
    CARDS.forEach(card => {
      const overlay = card.querySelector('[data-ripple-overlay]');
      if (!overlay) return;
  
      // Creamos los elementos una sola vez por tarjeta
      const dot = document.createElement('span');
      dot.className = 'ripple-dot';
      const ring1 = document.createElement('span');
      ring1.className = 'ripple-ring r1';
      const ring2 = document.createElement('span');
      ring2.className = 'ripple-ring r2';
      const ring3 = document.createElement('span');
      ring3.className = 'ripple-ring r3';
      overlay.append(dot, ring1, ring2, ring3);
  
      let inside = false;
  
      const move = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
  
        // Posiciona gota y anillos
        [dot, ring1, ring2, ring3].forEach(el => {
          el.style.left = `${x}px`;
          el.style.top  = `${y}px`;
        });
      };
  
      const enter = (e) => {
        inside = true;
        overlay.style.opacity = '1';
        move(e);
      };
  
      const leave = () => {
        inside = false;
        overlay.style.opacity = '0';
      };
  
      card.addEventListener('mouseenter', enter);
      card.addEventListener('mousemove', (e) => { if (inside) move(e); });
      card.addEventListener('mouseleave', leave);
  
      // Accesibilidad (teclado): coloca el ripple en el centro
      card.addEventListener('focusin', () => {
        const rect = card.getBoundingClientRect();
        const fakeEvent = { clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 };
        enter(fakeEvent);
      });
      card.addEventListener('focusout', leave);
    });
  })();
  