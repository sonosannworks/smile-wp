// ============================================================
//  街のデジタル塾 スマイル — LP Script
// ============================================================

// ---- Hamburger / Mobile Nav --------------------------------
const hamburger    = document.getElementById('hamburger');
const mobileNav    = document.getElementById('mobileNav');
const navOverlay   = document.getElementById('navOverlay');

function openMobileNav() {
  mobileNav.classList.add('open');
  navOverlay.classList.add('show');
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  mobileNav.classList.remove('open');
  navOverlay.classList.remove('show');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  mobileNav.classList.contains('open') ? closeMobileNav() : openMobileNav();
});
navOverlay.addEventListener('click', closeMobileNav);
document.getElementById('mobileNavClose').addEventListener('click', closeMobileNav);

// ---- FAQ Accordion -----------------------------------------
document.querySelectorAll('.faq__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer   = btn.nextElementSibling;
    const expanded = btn.getAttribute('aria-expanded') === 'true';

    // close all
    document.querySelectorAll('.faq__question').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });

    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      answer.classList.add('open');
    }
  });
});

// ---- Scroll Fade-in ----------------------------------------
const fadeEls = document.querySelectorAll(
  '.features__item, .course-card, .voice-card, .faq__item, .classroom__item, .news-box__inner, .access-box'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// ---- Active nav on scroll ----------------------------------
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.header__nav-link');

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset + 100;
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.header__nav-link[href="#${sec.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { passive: true });

// ---- Contact Form ------------------------------------------
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name  = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (!name) {
    alert('お名前をご入力ください。');
    document.getElementById('name').focus();
    return;
  }
  if (!phone) {
    alert('電話番号をご入力ください。');
    document.getElementById('phone').focus();
    return;
  }

  // 送信成功表示（実際の送信処理はここに追加）
  this.style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
});

// ---- Float CTA 表示制御 ------------------------------------
const floatCta = document.getElementById('floatCta');
window.addEventListener('scroll', () => {
  floatCta.style.opacity = window.pageYOffset > 200 ? '1' : '0';
}, { passive: true });
floatCta.style.opacity = '0';
floatCta.style.transition = 'opacity .3s';
