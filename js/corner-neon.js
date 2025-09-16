// Anima el trazo de la esquina neón y maneja visibilidad en hover
(() => {
    const cards = document.querySelectorAll('[data-corner-neon]');
    const SPEED = 140; // píxeles por segundo para el dashoffset
  
    cards.forEach(card => {
      const overlay = card.querySelector('[data-neon-overlay]');
      const path = overlay?.querySelector('#neon-stroke');
      if (!overlay || !path) return;
  
      // preparar dasharray/offset según longitud real del path
      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
  
      let raf = null;
      let last = null;
      let offset = len;
  
      const animate = (t) => {
        if (last == null) last = t;
        const dt = (t - last) / 1000;
        last = t;
  
        offset -= SPEED * dt;
        if (offset < 0) offset += len;
        path.style.strokeDashoffset = `${offset}`;
  
        raf = requestAnimationFrame(animate);
      };
  
      const onEnter = () => {
        overlay.style.opacity = '1';
        last = null;
        if (!raf) raf = requestAnimationFrame(animate);
      };
  
      const onLeave = () => {
        overlay.style.opacity = '0';
        if (raf) cancelAnimationFrame(raf);
        raf = null;
        last = null;
        offset = len; // reinicia al borde
        path.style.strokeDashoffset = `${offset}`;
      };
  
      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mouseleave', onLeave);
  
      // También reacciona al foco por accesibilidad
      card.addEventListener('focusin', onEnter);
      card.addEventListener('focusout', onLeave);
    });
  })();
  