// Búsqueda y filtro para cards de películas
(() => {
    const $q = document.querySelector('#buscar-pelis');
    const $sel = document.querySelector('#filtro-genero');
    const $grid = document.querySelector('#grid-pelis');
    const $empty = document.querySelector('#sin-resultados');
    if (!$q || !$grid) return;
  
    const cards = Array.from($grid.children);
  
    const norm = (s) => (s || '')
      .toString()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .trim();
  
    let query = '';
    let genero = 'all';
    let rafId = null;
  
    const apply = () => {
      let visible = 0;
      const nq = norm(query);
  
      cards.forEach(card => {
        const t = norm(card.dataset.title);
        const g = (card.dataset.genero || '').toLowerCase();
        const y = (card.dataset.year || '');
        const tags = norm(card.dataset.tags);
  
        const text = `${t} ${g} ${y} ${tags}`;
        const matchText = !nq || text.includes(nq);
        const matchGenero = genero === 'all' || g === genero;
  
        const show = matchText && matchGenero;
        card.style.display = show ? '' : 'none';
        if (show) visible++;
      });
  
      $empty.classList.toggle('hidden', visible !== 0);
    };
  
    const schedule = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(apply);
    };
  
    // eventos
    $q.addEventListener('input', (e) => { query = e.target.value; schedule(); });
    $sel?.addEventListener('change', (e) => { genero = e.target.value; schedule(); });
  
    // init
    apply();
  })();
  