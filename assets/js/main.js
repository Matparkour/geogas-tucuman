const body = document.body;
const toggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-nav-menu]');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    body.classList.toggle('menu-open');
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => body.classList.remove('menu-open')));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('[data-lightbox]').forEach(button => {
  button.addEventListener('click', () => {
    const src = button.querySelector('img')?.getAttribute('src');
    if (!src) return;
    const box = document.createElement('div');
    box.className = 'lightbox open';
    box.innerHTML = `<button type="button" aria-label="Cerrar">×</button><img src="${src}" alt="Imagen ampliada">`;
    document.body.appendChild(box);
    box.querySelector('button').addEventListener('click', () => box.remove());
    box.addEventListener('click', (e) => { if (e.target === box) box.remove(); });
  });
});
