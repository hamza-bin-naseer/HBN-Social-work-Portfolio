(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const toast = document.getElementById('toast');

  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 3600);
  };

  // Mobile navigation
  navToggle?.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navMenu.classList.toggle('open', !isOpen);
  });

  document.querySelectorAll('.nav-menu a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle?.setAttribute('aria-expanded', 'false');
      navMenu?.classList.remove('open');
    });
  });

  // Header state and active menu item
  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.nav-menu a[href^="#"]')];
  const updateNavigation = () => {
    header?.classList.toggle('scrolled', window.scrollY > 16);
    const current = sections.reduce((active, section) => {
      return window.scrollY >= section.offsetTop - 140 ? section.id : active;
    }, 'home');
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
  };
  window.addEventListener('scroll', updateNavigation, { passive: true });
  updateNavigation();

  // Reveal animation
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  // Impact counters
  const animateCounter = (el) => {
    const target = Number(el.dataset.target || 0);
    const suffix = el.dataset.suffix || '';
    const duration = 900;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.7 });
  document.querySelectorAll('.counter').forEach((el) => counterObserver.observe(el));

  // Gallery filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
      galleryItems.forEach((item) => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('hidden', !show);
      });
    });
  });

  // CV placeholder action. Add assets/Hamza-Bin-Naseer-CV.pdf and replace this handler with a direct link when ready.
  document.getElementById('cv-download')?.addEventListener('click', (event) => {
    event.preventDefault();
    showToast('CV placeholder: add your PDF as assets/Hamza-Bin-Naseer-CV.pdf, then update the link in index.html.');
  });

  // Contact form: update this email before publishing.
  // Contact form — opens Gmail with a prepared message
const portfolioEmail = '241980005@gift.edu.pk';

document.getElementById('contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const data = new FormData(form);

  const name = String(data.get('name') || '').trim();
  const visitorEmail = String(data.get('email') || '').trim();
  const organisation =
    String(data.get('organisation') || '').trim() || 'Not provided';
  const message = String(data.get('message') || '').trim();

  const subject = `Portfolio enquiry from ${name}`;

  const body = [
    `Name: ${name}`,
    `Email: ${visitorEmail}`,
    `Organisation: ${organisation}`,
    '',
    'Message:',
    message
  ].join('\n');

  const gmailURL =
    'https://mail.google.com/mail/?view=cm&fs=1' +
    `&to=${encodeURIComponent(portfolioEmail)}` +
    `&su=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  const emailWindow = window.open(gmailURL, '_blank');

  if (emailWindow) {
    emailWindow.opener = null;
    showToast('Gmail has opened with your prepared message.');
  } else {
    showToast('Popup blocked. Please allow popups and try again.');
  }
});








// Activity card image sliders
document.querySelectorAll('.card-slider').forEach((slider) => {
  const slides = [...slider.querySelectorAll('.card-slide')];
  const previousButton = slider.querySelector('.slider-previous');
  const nextButton = slider.querySelector('.slider-next');
  const dotsContainer = slider.querySelector('.slider-dots');

  if (slides.length === 0) return;

  let currentIndex = 0;
  let autoplayTimer;

  // Create one navigation dot for every image
  slides.forEach((slide, index) => {
    const dot = document.createElement('button');

    dot.type = 'button';
    dot.className = 'slider-dot';
    dot.setAttribute('aria-label', `Show photograph ${index + 1}`);

    dot.addEventListener('click', () => {
      showSlide(index);
      restartAutoplay();
    });

    dotsContainer.appendChild(dot);
  });

  const dots = [...dotsContainer.querySelectorAll('.slider-dot')];

  const showSlide = (newIndex) => {
    currentIndex = (newIndex + slides.length) % slides.length;

    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentIndex);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  };

  const nextSlide = () => {
    showSlide(currentIndex + 1);
  };

  const previousSlide = () => {
    showSlide(currentIndex - 1);
  };

  const startAutoplay = () => {
    window.clearInterval(autoplayTimer);

    autoplayTimer = window.setInterval(() => {
      nextSlide();
    }, 4000);
  };

  const stopAutoplay = () => {
    window.clearInterval(autoplayTimer);
  };

  const restartAutoplay = () => {
    stopAutoplay();
    startAutoplay();
  };

  previousButton?.addEventListener('click', () => {
    previousSlide();
    restartAutoplay();
  });

  nextButton?.addEventListener('click', () => {
    nextSlide();
    restartAutoplay();
  });

  // Pause slider when mouse is over the image
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);

  // Pause slider while using keyboard controls
  slider.addEventListener('focusin', stopAutoplay);
  slider.addEventListener('focusout', startAutoplay);

  showSlide(0);
  startAutoplay();
});








  

  document.getElementById('year').textContent = new Date().getFullYear();
})();
