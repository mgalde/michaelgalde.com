/* ═══════════════════════════════════════════════════════
   Michael Galde — main.js
═══════════════════════════════════════════════════════ */

const html      = document.documentElement;
const nav       = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
const themeBtn  = document.getElementById('themeToggle');

/* ── THEME ──────────────────────────────────────────────── */
function preferredTheme() {
  const saved = localStorage.getItem('mg-theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('mg-theme', theme);
}

// Apply immediately to avoid flash of wrong theme
applyTheme(preferredTheme());

themeBtn.addEventListener('click', () => {
  applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

// Sync with OS preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('mg-theme')) applyTheme(e.matches ? 'dark' : 'light');
});

/* ── MOBILE NAV ─────────────────────────────────────────── */
function closeNav() {
  navLinks.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}

navToggle.addEventListener('click', () => {
  const opening = !navLinks.classList.contains('open');
  navLinks.classList.toggle('open', opening);
  navToggle.classList.toggle('open', opening);
  navToggle.setAttribute('aria-expanded', String(opening));
});

// Close on any nav link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeNav);
});

// Close on outside click
document.addEventListener('click', e => {
  if (!nav.contains(e.target)) closeNav();
});

/* ── NAV SCROLL SHADOW ──────────────────────────────────── */
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

/* ── SMOOTH SCROLL (anchor links) ───────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = nav.offsetHeight + 12;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── CONTACT FORM ───────────────────────────────────────── */
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) return;

    // Build a mailto link and open it
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:Consulting@michaelgalde.com`
      + `?subject=${encodeURIComponent(subject || 'Website Inquiry')}`
      + `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    // Show success state
    form.reset();
    formSuccess.hidden = false;
    setTimeout(() => { formSuccess.hidden = true; }, 6000);
  });
}
