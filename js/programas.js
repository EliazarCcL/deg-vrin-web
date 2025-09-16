
  // Observa elementos con clase .reveal-left / .reveal-right
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Si quieres que se repita cada vez que salen/entran, comenta la línea siguiente
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal-left, .reveal-right').forEach(el => observer.observe(el));



