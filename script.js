/* ===== FamilyMart × Jellycat — script.js ===== */

/* ---------- Navbar scroll shadow ---------- */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ---------- Hamburger / Mobile Nav ---------- */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

// Close mobile nav on link click
document.querySelectorAll('#mobileNav a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
  });
});

/* ---------- Smooth scroll for all anchor links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const offset = 72; // navbar height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ---------- Scroll reveal ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

/* ---------- File input label ---------- */
const fileInput = document.getElementById('receipt');
const fileNameDisplay = document.querySelector('.file-name-display');

if (fileInput) {
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      fileNameDisplay.textContent = '已選擇：' + fileInput.files[0].name;
    } else {
      fileNameDisplay.textContent = '支援 JPG、PNG、PDF，最大 10MB';
    }
  });
}

/* ---------- Form validation & submit ---------- */
const form = document.getElementById('registrationForm');
const formSuccess = document.getElementById('formSuccess');

const validators = {
  name: {
    el: () => document.getElementById('name'),
    msg: () => document.getElementById('nameError'),
    validate: v => v.trim().length >= 2,
    errTxt: '請輸入姓名（至少 2 個字）'
  },
  phone: {
    el: () => document.getElementById('phone'),
    msg: () => document.getElementById('phoneError'),
    validate: v => /^09\d{8}$/.test(v.trim()),
    errTxt: '請輸入有效的手機號碼（例：0912345678）'
  },
  email: {
    el: () => document.getElementById('email'),
    msg: () => document.getElementById('emailError'),
    validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    errTxt: '請輸入有效的電子郵件地址'
  },
  order: {
    el: () => document.getElementById('order'),
    msg: () => document.getElementById('orderError'),
    validate: v => v.trim().length >= 4,
    errTxt: '請輸入訂單編號或發票號碼（至少 4 個字元）'
  }
};

function setError(key, show) {
  const { el, msg, errTxt } = validators[key];
  const input = el();
  const errEl = msg();
  if (show) {
    input.classList.add('error');
    errEl.textContent = errTxt;
    errEl.classList.add('visible');
  } else {
    input.classList.remove('error');
    errEl.classList.remove('visible');
  }
}

// Live validation on blur
Object.keys(validators).forEach(key => {
  const input = validators[key].el();
  if (!input) return;
  input.addEventListener('blur', () => {
    setError(key, !validators[key].validate(input.value));
  });
  input.addEventListener('input', () => {
    if (input.classList.contains('error')) {
      setError(key, !validators[key].validate(input.value));
    }
  });
});

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    let isValid = true;
    Object.keys(validators).forEach(key => {
      const input = validators[key].el();
      if (!input) return;
      const valid = validators[key].validate(input.value);
      setError(key, !valid);
      if (!valid) isValid = false;
    });

    if (!isValid) {
      // Scroll to first error
      const firstError = form.querySelector('.form-input.error, .form-select.error');
      if (firstError) {
        const top = firstError.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      return;
    }

    // Show success
    form.style.display = 'none';
    formSuccess.classList.add('visible');

    // Scroll to success message
    const formCard = document.querySelector('.form-card');
    if (formCard) {
      const top = formCard.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
}

/* ---------- "登錄收藏" buttons → scroll to form ---------- */
document.querySelectorAll('.btn-register').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.querySelector('#form');
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ---------- Hero entrance animations ---------- */
// Elements with opacity:0 set in CSS are animated via @keyframes + animation-delay
// Additional page-load animation for any .hero-anim elements
window.addEventListener('load', () => {
  document.querySelectorAll('.hero-anim').forEach((el, i) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    }, i * 120);
  });
});
