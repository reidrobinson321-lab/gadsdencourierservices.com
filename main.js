/* ============================================================
   GADSDEN COURIER SERVICES — SHARED JS
   ============================================================ */

// ── Hamburger / Mobile Nav ──────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on nav link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// ── Scroll-based fade-in ────────────────────────────────────
const fadeTargets = document.querySelectorAll('.fade-in, .fade-in-up');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeTargets.forEach(el => observer.observe(el));
} else {
  // Fallback for older browsers
  fadeTargets.forEach(el => el.classList.add('visible'));
}

// ── Header scroll style ─────────────────────────────────────
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.style.borderBottomColor = 'rgba(255,255,255,0.1)';
      header.style.backdropFilter = 'blur(10px)';
    } else {
      header.style.borderBottomColor = 'rgba(255,255,255,0.07)';
      header.style.backdropFilter = 'none';
    }
  }, { passive: true });
}

// ── Active nav link by page ─────────────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.site-nav a, .mobile-nav a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.classList.add('active');
  } else if (currentPage === '' && href === 'index.html') {
    link.classList.add('active');
  } else {
    // Remove active from links that don't match (handles static active attr)
    if (href !== 'contact.html' || !link.classList.contains('nav-book-btn')) {
      link.classList.remove('active');
    }
  }
});

// ── Form submit placeholder ─────────────────────────────────
document.querySelectorAll('form[data-placeholder]').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    if (btn) {
      const original = btn.textContent;
      btn.textContent = 'Submitted!';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        form.reset();
      }, 3000);
    }
  });
});
