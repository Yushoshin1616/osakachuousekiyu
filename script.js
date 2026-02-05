(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('[data-lang-toggle]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navBackdrop = document.querySelector('[data-nav-backdrop]');
  const mobileNav = document.querySelector('.mobile-nav');

  const applyLang = (lang) => {
    root.setAttribute('data-lang', lang);
    document.querySelectorAll('[data-lang]').forEach((el) => {
      el.hidden = el.getAttribute('data-lang') !== lang;
    });
    document.querySelectorAll('[data-placeholder-ja]').forEach((el) => {
      const value = lang === 'ja' ? el.getAttribute('data-placeholder-ja') : el.getAttribute('data-placeholder-en');
      if (value) {
        el.setAttribute('placeholder', value);
      }
    });
  };

  const stored = localStorage.getItem('lang') || 'ja';
  applyLang(stored);

  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = root.getAttribute('data-lang') === 'ja' ? 'en' : 'ja';
      localStorage.setItem('lang', next);
      applyLang(next);
    });
  }

  const closeNav = () => {
    document.body.classList.remove('nav-open');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
    }
    if (mobileNav) {
      mobileNav.setAttribute('aria-hidden', 'true');
    }
  };

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = document.body.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      if (mobileNav) {
        mobileNav.setAttribute('aria-hidden', String(!isOpen));
      }
    });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeNav);
  }

  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeNav);
    });
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      closeNav();
    }
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('in-view'));
  }
})();
