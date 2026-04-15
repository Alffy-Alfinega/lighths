/* ============================================================
   LIGHT HIGH SCHOOL — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Preloader ---------- */
  window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(function () {
        preloader.classList.add('hidden');
      }, 500);
    }
  });

  /* ---------- Navbar: scroll behaviour ---------- */
  const mainNav = document.getElementById('mainNav');
  if (mainNav) {
    const onScroll = function () {
      if (window.scrollY > 60) {
        mainNav.classList.add('scrolled');
      } else {
        mainNav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run on load
  }

  /* ---------- Active nav link (handles dropdowns) ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // Mark matching top-level nav-links and dropdown-items
  document.querySelectorAll('#mainNav .nav-link:not(.nav-btn), #mainNav .dropdown-item').forEach(function (link) {
    const href = (link.getAttribute('href') || '').split('#')[0]; // strip anchor
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
      // If this is inside a dropdown, also mark the parent toggle
      const menu = link.closest('.dropdown-menu');
      if (menu) {
        const toggle = menu.previousElementSibling;
        if (toggle) toggle.classList.add('active');
      }
    }
  });

  /* ---------- Back to Top ---------- */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Counter animation ---------- */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString();
    }, 16);
  }

  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (counter) {
      counterObserver.observe(counter);
    });
  }

  /* ---------- Contact / Inquiry form ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      const originalText = btn.innerHTML;

      btn.disabled = true;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending…';

      // Simulate network delay
      setTimeout(function () {
        btn.disabled = false;
        btn.innerHTML = originalText;

        const alert = document.createElement('div');
        alert.className = 'alert alert-success mt-3 d-flex align-items-center gap-2';
        alert.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>Thank you! Your message has been received. We will get back to you shortly.</span>';
        contactForm.appendChild(alert);
        contactForm.reset();

        setTimeout(function () { alert.remove(); }, 6000);
      }, 1400);
    });
  }

  /* ---------- Admissions form ---------- */
  const admissionsForm = document.getElementById('admissionsForm');
  if (admissionsForm) {
    admissionsForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = admissionsForm.querySelector('[type="submit"]');
      const originalText = btn.innerHTML;

      btn.disabled = true;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Submitting…';

      setTimeout(function () {
        btn.disabled = false;
        btn.innerHTML = originalText;

        const alert = document.createElement('div');
        alert.className = 'alert alert-success mt-3 d-flex align-items-center gap-2';
        alert.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>Application submitted successfully! We will contact you within 3 working days.</span>';
        admissionsForm.appendChild(alert);
        admissionsForm.reset();

        setTimeout(function () { alert.remove(); }, 7000);
      }, 1600);
    });
  }

  /* ---------- Mobile nav: close on link click (skip dropdown toggles) ---------- */
  const navbarCollapse = document.getElementById('navbarNav');
  if (navbarCollapse) {
    navbarCollapse.querySelectorAll('.nav-link, .dropdown-item').forEach(function (link) {
      link.addEventListener('click', function () {
        // Don't collapse when tapping a dropdown toggle — that would cancel the dropdown open
        if (this.classList.contains('dropdown-toggle')) return;
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      });
    });
  }

  /* ---------- Smooth anchor scrolling ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- Year in footer ---------- */
  document.querySelectorAll('.current-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

})();
