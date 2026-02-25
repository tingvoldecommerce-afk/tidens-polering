/* ─────────────────────────────────────────
   Tidens Polering – main.js
   ───────────────────────────────────────── */

// ── NAVBAR: scroll shadow ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ── NAVBAR: mobile hamburger ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ── ACCORDION ──
document.querySelectorAll('.acc-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item     = btn.closest('.acc-item');
    const body     = item.querySelector('.acc-body');
    const isOpen   = btn.getAttribute('aria-expanded') === 'true';

    // Close all
    document.querySelectorAll('.acc-btn').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.closest('.acc-item').querySelector('.acc-body').classList.remove('open');
    });

    // Open clicked (if it was closed)
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      body.classList.add('open');
    }
  });
});

// ── SMOOTH SCROLL: offset for fixed navbar ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── FORM: Formspree AJAX handler ──
const form        = document.getElementById('offerForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Simple validation
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#ef4444';
        valid = false;
      }
    });
    if (!valid) return;

    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        form.hidden = true;
        formSuccess.hidden = false;
      } else {
        submitBtn.disabled = false;
        alert('Der opstod en fejl. Prøv igen eller ring på 26 24 09 33.');
      }
    } catch {
      submitBtn.disabled = false;
      alert('Der opstod en fejl. Prøv igen eller ring på 26 24 09 33.');
    }
  });
}

// ── ANIMATE: fade in sections on scroll ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.usp-item, .service-card, .review-card, .trust-badge, .acc-item, .stat'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ── REVIEWS SLIDER ──
const track = document.getElementById('reviewsTrack');
const dots  = document.querySelectorAll('.dot');
if (track) {
  let cur = 0;
  const cards = track.querySelectorAll('.review-card');
  const total = cards.length;

  function goTo(n) {
    cur = (n + total) % total;
    track.style.transform = `translateX(-${cur * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === cur));
  }

  document.querySelector('.slider-prev').addEventListener('click', () => goTo(cur - 1));
  document.querySelector('.slider-next').addEventListener('click', () => goTo(cur + 1));
  dots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.idx)));
}

// Add fade-in styles dynamically
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(18px);
    transition: opacity .5s ease, transform .5s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
