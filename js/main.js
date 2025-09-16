document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Caso 1: reveal/fade generales
          if (
            entry.target.classList.contains("reveal") ||
            entry.target.classList.contains("fade-left") ||
            entry.target.classList.contains("fade-right") ||
            entry.target.classList.contains("fade-up")
          ) {
            entry.target.classList.add("active");
          }
  
          // Caso 2: stagger (varios hijos en delay escalonado)
          if (entry.target.classList.contains("stagger")) {
            const children = entry.target.querySelectorAll(":scope > *");
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add("active");
              }, index * 200); // delay de 0.2s
            });
          }
  
          // Caso 3: reveal-up (animación con delay manual en cada hijo)
          if (entry.target.classList.contains("reveal-up-container")) {
            let delay = 0;
            entry.target.querySelectorAll(".reveal-up").forEach((el) => {
              el.style.animationDelay = delay + "s";
              el.classList.add("active");
              delay += 0.2;
            });
          }
  
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
  
    // Observar los elementos que pueden animarse
    const animatedElements = document.querySelectorAll(
      ".reveal, .fade-left, .fade-right, .fade-up, .stagger, .reveal-up-container"
    );
  
    animatedElements.forEach(el => observer.observe(el));
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const animatedItems = document.querySelectorAll(
      ".animate-slide-left, .animate-slide-right"
    );
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target); // solo una vez
        }
      });
    }, { threshold: 0.2 });
  
    animatedItems.forEach(item => observer.observe(item));
  });
  