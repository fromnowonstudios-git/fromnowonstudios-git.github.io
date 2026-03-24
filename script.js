// ============================================
// FromNowOn Studios — Creative Interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Custom Cursor Glow ---
  const glow = document.querySelector('.cursor-glow');
  if (glow && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  // --- Burger Menu ---
  const burger = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (burger) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      mobileNav.classList.toggle('active');
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        mobileNav.classList.remove('active');
      });
    });
  }

  // --- Scroll Reveal ---
  const reveals = document.querySelectorAll('.work-card, .prog-item');

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const siblings = Array.from(el.parentElement.children);
        const i = siblings.indexOf(el);
        setTimeout(() => el.classList.add('visible'), i * 120);
        revealObs.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObs.observe(el));

  // --- Animated Progress Bars ---
  const bars = document.querySelectorAll('.prog-fill, .xp-fill');

  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        setTimeout(() => {
          bar.style.width = bar.dataset.width + '%';
        }, 400);
        barObs.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => barObs.observe(bar));

  // --- Count Up ---
  const pcts = document.querySelectorAll('.prog-pct');

  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.textContent);
        countUp(el, 0, target, 1200);
        countObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  pcts.forEach(el => countObs.observe(el));

  function countUp(el, start, end, duration) {
    const t0 = performance.now();
    function tick(now) {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(start + (end - start) * eased) + '%';
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // --- Smooth Anchor Scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 60,
          behavior: 'smooth'
        });
      }
    });
  });

});
