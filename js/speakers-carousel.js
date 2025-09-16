// speakers-carousel.js
(() => {
    const root = document.querySelector('#speakers-carousel');
    if (!root) return;
  
    const viewport = root.querySelector('[data-viewport]');
    const track    = root.querySelector('[data-track]');
    const btnPrev  = root.querySelector('[data-prev]');
    const btnNext  = root.querySelector('[data-next]');
  
    let perView, index, autoId;
    let resizing = false;
  
    const mq = window.matchMedia('(min-width: 768px)'); // md breakpoint
  
    const getPerView = () => (mq.matches ? 2 : 1);
  
    const slideWidth = () => viewport.clientWidth / perView;
  
    const setTransform = (instant = false) => {
      track.style.transitionDuration = instant ? '0ms' : '500ms';
      track.style.transform = `translateX(${-index * slideWidth()}px)`;
    };
  
    const build = () => {
      // limpiar clones previos
      track.querySelectorAll('[data-clone]').forEach(n => n.remove());
  
      const items = Array.from(track.children);
      perView = getPerView();
      index = perView; // arrancamos después de los clones iniciales
  
      // clonar extremos según perView
      const first = items.slice(0, perView).map(n => n.cloneNode(true));
      const last  = items.slice(-perView).map(n => n.cloneNode(true));
      first.forEach(cl => { cl.dataset.clone = 'true'; track.appendChild(cl); });
      last.forEach(cl  => { cl.dataset.clone = 'true'; track.insertBefore(cl, track.firstChild); });
  
      // fijar anchos por slide (flex-none + width ya vienen con Tailwind)
      setTransform(true);
    };
  
    const next = () => { index += 1; setTransform(); };
    const prev = () => { index -= 1; setTransform(); };
  
    // loop infinito corrigiendo cuando caemos en clones
    track.addEventListener('transitionend', () => {
      const total = track.children.length;
      if (index >= total - perView) { // pasamos al final => salta al inicio real
        index = perView;
        setTransform(true);
      } else if (index < perView) {   // pasamos al inicio => salta al final real
        index = total - perView * 2;
        setTransform(true);
      }
    });
  
    // autoplay
    const startAuto = () => {
      stopAuto();
      autoId = setInterval(next, 3500);
    };
    const stopAuto = () => autoId && clearInterval(autoId);
  
    // hover pausa
    root.addEventListener('mouseenter', stopAuto);
    root.addEventListener('mouseleave', startAuto);
  
    // controles
    btnNext.addEventListener('click', next);
    btnPrev.addEventListener('click', prev);
  
    // rebuild en resize (debounce)
    const onResize = () => {
      if (resizing) return;
      resizing = true;
      requestAnimationFrame(() => {
        build();
        resizing = false;
      });
    };
    window.addEventListener('resize', onResize);
    mq.addEventListener?.('change', onResize);
  
    // init
    build();
    startAuto();
  })();
  