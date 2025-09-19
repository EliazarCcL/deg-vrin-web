class MainHeader1 extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <header class="sticky top-0 z-20 border-b border-white/10 bg-[#473273]/95 backdrop-blur">
          <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
            <!-- Logo -->
            <a href="../../index.html" class="inline-flex items-center gap-3">
              <img src="../../img/logo.png" alt="Logo" class="h-16">
              <span class="sr-only">Inicio</span>
            </a>
  
            <!-- Botón móvil -->
            <button id="menuBtn"
              class="md:hidden inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#473273] focus:ring-white/60"
              aria-controls="primaryMenu" aria-expanded="false" aria-label="Abrir menú">
              <svg id="iconOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
              <svg id="iconClose" xmlns="http://www.w3.org/2000/svg" class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
  
            <!-- Menú desktop -->
            <nav class="hidden md:flex items-center gap-8 font-semibold">
              <a href="../../index.html" class="hover:text-[#99e3f0]">Inicio</a>
              <a href="../../programas.html" class="hover:text-[#99e3f0]">Programas</a>
              <a href="../../eventos.html" class="hover:text-[#99e3f0]">Eventos</a>
              <a href="../../emprendimientos.html" class="hover:text-[#99e3f0]">Emprendimientos</a>
            </nav>
          </div>
  
          <!-- Menú móvil -->
          <nav id="primaryMenu" class="md:hidden max-h-0 overflow-hidden transition-[max-height] duration-300 ease-in-out">
            <div class="space-y-1 px-4 pb-4 pt-2 font-semibold">
              <a href="../../index.html" class="block rounded-md px-3 py-2 hover:bg-white/10">Inicio</a>
              <a href="../../programas.html" class="block rounded-md px-3 py-2 hover:bg-white/10">Programas</a>
              <a href="../../eventos.html" class="block rounded-md px-3 py-2 hover:bg-white/10">Eventos</a>
              <a href="../../emprendimientos.html" class="block rounded-md px-3 py-2 hover:bg-white/10">Emprendimientos</a>
            </div>
          </nav>
        </header>
      `;
  
      // JS del menú hamburguesa
      const btn = this.querySelector('#menuBtn');
      const menu = this.querySelector('#primaryMenu');
      const iconOpen = this.querySelector('#iconOpen');
      const iconClose = this.querySelector('#iconClose');
  
      const closeMenu = () => {
        menu.style.maxHeight = '0px';
        btn.setAttribute('aria-expanded', 'false');
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
      };
  
      const openMenu = () => {
        menu.style.maxHeight = menu.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
        iconOpen.classList.add('hidden');
        iconClose.classList.remove('hidden');
      };
  
      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        expanded ? closeMenu() : openMenu();
      });
  
      // Si cambia a desktop, cerramos el menú móvil
      window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
        if (e.matches) closeMenu();
      });
    }
  }
  
  customElements.define('main-header1', MainHeader1);
  