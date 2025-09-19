// footer-app.js
class FooterApp1 extends HTMLElement {
    connectedCallback() {
      // Valores por defecto (funciona sin pasar atributos)
      const year = this.getAttribute('year') || new Date().getFullYear();
      const brand = this.getAttribute('brand') || 'Incubadora de Empresas';
      const logo = this.getAttribute('logo') || '../../img/logo.png';
      const address = this.getAttribute('address') || 'Av. Siempre Viva 123, Cusco';
      const phone = this.getAttribute('phone') || '+51 999 999 999';
      const email = this.getAttribute('email') || 'incubadora@ejemplo.com';
      const facebook = this.getAttribute('facebook') || '#';
      const instagram = this.getAttribute('instagram') || '#';
      const linkedin = this.getAttribute('linkedin') || '#';
  
      this.innerHTML = `
        <footer class="bg-slate-950 text-slate-300">
          <div class="mx-auto max-w-7xl px-6 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <img src="${logo}" alt="Logo ${brand}" class="h-10">
              <p class="mt-3 text-sm text-slate-400">${brand} · © ${year}</p>
            </div>
            <div>
              <h4 class="font-semibold text-white">Enlaces</h4>
              <ul class="mt-3 space-y-2 text-sm">
                <li><a href="../../programas.html" class="hover:text-white">Programas</a></li>
                <li><a href="../../eventos.html" class="hover:text-white">Eventos</a></li>
                <li><a href="../../emprendimientos.html" class="hover:text-white">emprendimiento</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold text-white">Contacto</h4>
              <p class="mt-3 text-sm">${address}</p>
              <p class="text-sm">${phone}</p>
              <p class="text-sm">${email}</p>
            </div>
            <div>
              <h4 class="font-semibold text-white">Síguenos</h4>
              <div class="mt-3 flex gap-3">
                <a class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" href="${facebook}" aria-label="Facebook">
                  <i class="fa-brands fa-facebook-f" aria-hidden="true"></i>
                </a>
                <a class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" href="${instagram}" aria-label="Instagram">
                  <i class="fa-brands fa-instagram" aria-hidden="true"></i>
                </a>
                <a class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" href="${linkedin}" aria-label="LinkedIn">
                  <i class="fa-brands fa-linkedin-in" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </footer>
      `;
    }
  }
  customElements.define('footer-app1', FooterApp1);
 
  