const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

// Cada galería controla solamente sus propias tres imágenes.
document.querySelectorAll('[data-gallery]').forEach(gallery => {
  const images = [...gallery.querySelectorAll('.gallery-image')];
  const indicators = [...gallery.querySelectorAll('.indicator')];
  const counter = gallery.querySelector('.gallery-counter');
  let current = 0;

  function showImage(index) {
    current = (index + images.length) % images.length;
    images.forEach((img, i) => {
      img.classList.toggle('is-active', i === current);
      img.setAttribute('aria-hidden', String(i !== current));
    });
    indicators.forEach((button, i) => {
      button.classList.toggle('is-active', i === current);
      button.setAttribute('aria-pressed', String(i === current));
    });
    counter.textContent = `${current + 1} / ${images.length}`;
  }

  gallery.querySelector('.prev').addEventListener('click', () => showImage(current - 1));
  gallery.querySelector('.next').addEventListener('click', () => showImage(current + 1));
  indicators.forEach((button, i) => button.addEventListener('click', () => showImage(i)));
  showImage(0);
});

const projectData = {
  sazon: {
    eyebrow: 'APP MÓVIL · KOTLIN',
    title: 'Sazon',
    description: 'Aplicación móvil de recetas organizada por categorías, con pantallas para consultar ingredientes y preparación.',
    tags: ['Kotlin', 'Jetpack Compose', 'Android Studio']
  },
  restaurant: {
    eyebrow: 'DESARROLLO WEB',
    title: 'Restaurant',
    description: 'Sitio web para un restaurante, diseñado para presentar su oferta gastronómica y facilitar la consulta de productos y servicios.',
    tags: ['HTML / CSS', 'JavaScript', 'PHP / MySQL']
  },
  fisio: {
    eyebrow: 'SISTEMA WEB',
    title: 'FisioApp',
    description: 'Interfaz para registrar pacientes, consultar expedientes y organizar sesiones de fisioterapia.',
    tags: ['HTML / CSS', 'JavaScript', 'Bootstrap']
  },
  consultoria: {
    eyebrow: 'ASESORÍA TECNOLÓGICA',
    title: 'Consultoría',
    description: 'Orientación para identificar necesidades tecnológicas y proponer soluciones relacionadas con páginas web, software y sistemas informáticos.',
    tags: ['Desarrollo web', 'Software', 'Soluciones TI']
  }
};

const dialog = document.getElementById('projectDialog');
document.querySelectorAll('.project-details').forEach(button => {
  button.addEventListener('click', () => {
    const project = projectData[button.dataset.project];
    document.getElementById('dialogEyebrow').textContent = project.eyebrow;
    document.getElementById('dialogTitle').textContent = project.title;
    document.getElementById('dialogDescription').textContent = project.description;
    const tags = document.getElementById('dialogTags');
    tags.replaceChildren(...project.tags.map(tag => {
      const span = document.createElement('span');
      span.textContent = tag;
      return span;
    }));
    dialog.showModal();
  });
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

// Correo donde recibirás los mensajes del portafolio
const CONTACT_EMAIL = 'gustavo_rotf@hotmail.com';

document.getElementById('contactForm').addEventListener('submit', event => {
    event.preventDefault();

    const form = event.currentTarget;

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();

    const subject = encodeURIComponent(
        `Contacto desde mi portafolio — ${name}`
    );

    const body = encodeURIComponent(
        `Nombre: ${name}\n` +
        `Correo: ${email}\n\n` +
        `Mensaje:\n${message}`
    );

    // Preparar el correo
    window.location.href =
        `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
});