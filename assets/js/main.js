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


const WEBHOOK_URL = "http://localhost:5678/webhook/geogas-contacto";

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const button = contactForm.querySelector("button[type='submit']");
    const originalText = button.textContent;

    button.disabled = true;
    button.textContent = "Enviando...";

    if (formMessage) {
      formMessage.textContent = "";
      formMessage.className = "form-message";
    }

    try {
      const formData = new FormData(contactForm);
      const body = new URLSearchParams(formData);

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        body: body
      });

      if (!response.ok) {
        throw new Error("No se pudo enviar");
      }

      if (formMessage) {
        formMessage.textContent = "Consulta enviada correctamente. Te responderemos en breve.";
        formMessage.classList.add("success");
      }

      contactForm.reset();

    } catch (error) {
      if (formMessage) {
        formMessage.textContent = "No se pudo enviar la consulta. Intentá nuevamente.";
        formMessage.classList.add("error");
      }
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });
}