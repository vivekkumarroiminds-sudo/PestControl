/* =========================================================
   Pest Control Emergency — site interactions
   ========================================================= */

// ---- Mobile nav toggle ----
const navBurger = document.querySelector('.nav-burger');
const mainNav = document.querySelector('.main-nav');
if (navBurger && mainNav) {
  navBurger.addEventListener('click', () => mainNav.classList.toggle('open'));
}

// ---- Service-area tabs (homepage) ----
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const key = tab.dataset.tab;
    tabs.forEach(t => t.classList.toggle('active', t === tab));
    panels.forEach(p => p.classList.toggle('active', p.dataset.panel === key));
  });
});

// ---- FAQ accordion ----
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const ans = item.querySelector('.faq-a');
    const open = item.classList.toggle('open');
    ans.style.maxHeight = open ? ans.scrollHeight + 'px' : null;
  });
});

// ---- Contact form (front-end only demo) ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.getElementById('formMsg');
    if (msg) { msg.classList.add('show'); }
    contactForm.reset();
  });
}

// ---- Scroll reveal (staggered) ----
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
}
