// ============================================
// FromNowOn Studios — Smooth Interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Burger ---
  const burger = document.querySelector('.burger');
  const mobNav = document.querySelector('.mob-nav');

  if (burger) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      mobNav.classList.toggle('active');
    });
    mobNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('active');
        mobNav.classList.remove('active');
      });
    });
  }

  // --- Scroll Reveal ---
  const reveals = document.querySelectorAll('[data-reveal]');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const siblings = Array.from(el.parentElement.children).filter(c => c.hasAttribute('data-reveal'));
        const i = siblings.indexOf(el);
        setTimeout(() => el.classList.add('visible'), i * 150);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => obs.observe(el));

  // --- Progress Bars ---
  const bars = document.querySelectorAll('.ms-fill, .journey-fill');

  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.width = entry.target.dataset.width + '%';
        }, 400);
        barObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  bars.forEach(b => barObs.observe(b));

  // --- Smooth Anchors ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) {
        window.scrollTo({
          top: t.getBoundingClientRect().top + window.scrollY - 70,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Parallax on hero images ---
  const imgs = document.querySelectorAll('.hero-img');
  if (imgs.length && window.matchMedia('(min-width: 900px)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      imgs.forEach((img, i) => {
        const speed = 0.08 + i * 0.04;
        img.style.transform = img.style.transform.replace(/translateY\([^)]*\)/, '') +
          ` translateY(${y * speed}px)`;
      });
    }, { passive: true });
  }

});
