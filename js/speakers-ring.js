// Ondas del borde circular en hover para cada [data-speaker]
(() => {
    const cards = document.querySelectorAll('[data-speaker]');
    if (!cards.length) return;
  
    let raf = null;
  
    cards.forEach((card, idx) => {
      const svg = card.querySelector('.speaker-ring');
      if (!svg) return;
  
      // —— Unicidad de IDs por tarjeta
      const grad = svg.querySelector('#grad-speaker');
      const filt = svg.querySelector('#wavy');
      const ring = svg.querySelector('.ring-anim');
  
      const uid = `spk${idx}`;
      grad && grad.setAttribute('id', `grad-speaker-${uid}`);
      ring && ring.setAttribute('stroke', `url(#grad-speaker-${uid})`);
      filt && filt.setAttribute('id', `wavy-${uid}`);
      ring && ring.setAttribute('filter', `url(#wavy-${uid})`);
  
      const turb = svg.querySelector(`#wavy-${uid} feTurbulence`);
      const disp = svg.querySelector(`#wavy-${uid} feDisplacementMap`);
  
      // Estado de animación por tarjeta
      let running = false;
      let t0 = 0;
  
      const animate = (t) => {
        if (!running) return;
        if (!t0) t0 = t;
        const time = (t - t0) / 1000;
  
        // Oscilar suavemente baseFrequency y escala para simular “ondulación”
        const bf = 0.010 + Math.sin(time * 2.2) * 0.004;  // 0.006 – 0.014
        const sc = 3 + Math.sin(time * 2.2 + Math.PI / 3) * 1.4; // 1.6 – 4.4
  
        if (turb) turb.setAttribute('baseFrequency', bf.toFixed(4));
        if (disp) disp.setAttribute('scale', sc.toFixed(2));
  
        raf = requestAnimationFrame(animate);
      };
  
      const start = () => {
        if (running) return;
        running = true;
        svg.style.willChange = 'transform';
        raf = requestAnimationFrame(animate);
      };
  
      const stop = () => {
        running = false;
        t0 = 0;
        if (raf) cancelAnimationFrame(raf);
        raf = null;
        // Resetea valores
        if (turb) turb.setAttribute('baseFrequency', '0.013');
        if (disp)  disp.setAttribute('scale', '4');
        svg.style.willChange = '';
      };
  
      card.addEventListener('mouseenter', start);
      card.addEventListener('mouseleave', stop);
      card.addEventListener('focusin', start);
      card.addEventListener('focusout', stop);
    });
  })();
  