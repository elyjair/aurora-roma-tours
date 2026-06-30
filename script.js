// ===== Reveal on scroll =====
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || items.length === 0) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  items.forEach((el) => io.observe(el));
})();

// ===== Chat widget =====
// Il widget reale Algho (<algho-viewer floating="true">) si monta da solo
// sul <body> ed è gestito dallo script inline in index.html: non serve
// alcuna logica aggiuntiva qui.

// ===== Mobile nav burger (semplice toggle) =====
(function () {
  const burger = document.querySelector('.nav-burger');
  const links = document.querySelector('.nav-links');
  if (!burger || !links) return;
  burger.addEventListener('click', () => {
    const open = links.style.display === 'flex';
    links.style.display = open ? 'none' : 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '100%';
    links.style.left = '0';
    links.style.right = '0';
    links.style.background = 'rgba(28,34,46,0.97)';
    links.style.padding = '1.2rem 2rem';
    links.style.gap = '1.1rem';
  });
})();
