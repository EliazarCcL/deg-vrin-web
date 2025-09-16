// Carrusel simple para #hero-carousel
(function () {
    const root = document.getElementById('hero-carousel');
    if (!root) return;
  
    const track = root.querySelector('[data-track]');
    const slides = Array.from(track.children);
    const prevBtn = root.querySelector('[data-prev]');
    const nextBtn = root.querySelector('[data-next]');
    const dots = Array.from(root.querySelectorAll('[data-dot]'));
  
    let index = 0;
    let autoplayId = null;
    const AUTOPLAY_MS = 5000;
  
    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, n) => (d.dataset.active = String(n === index)));
    }
  
    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }
  
    // Eventos
    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
  
    // Autoplay (pausa con hover)
    function start() { stop(); autoplayId = setInterval(next, AUTOPLAY_MS); }
    function stop() { if (autoplayId) clearInterval(autoplayId); autoplayId = null; }
  
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
  
    // Gestos táctiles básicos
    let startX = null;
    root.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; stop(); }, { passive: true });
    root.addEventListener('touchend', (e) => {
      if (startX === null) return;
      const endX = e.changedTouches[0].clientX;
      if (endX - startX > 40) prev();
      if (startX - endX > 40) next();
      startX = null; start();
    });
  
    // Init
    goTo(0);
    start();
  
    // Accesibilidad: mover con teclado cuando el carrusel tiene foco
    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });
  })();
  