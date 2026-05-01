/* FamilyMart × Jellycat — script.js */
'use strict';

/* ── Navbar scroll shadow ── */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 12);
}, { passive: true });

/* ── Hamburger / Mobile nav ── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});

document.querySelectorAll('#mobileNav a').forEach(a => {
  a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

/* ── Smooth scroll for all anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const navH = navbar.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── Intersection Observer — scroll reveal ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.10 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Form validation ── */
const form = document.getElementById('signupForm');
const successBox = document.getElementById('formSuccess');

const rules = {
  fname:  { test: v => v.trim().length >= 2,        msg: '請輸入姓名（至少 2 個字）' },
  fphone: { test: v => /^09\d{8}$/.test(v.trim()),  msg: '請輸入有效手機（例：0912345678）' },
  femail: { test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: '請輸入有效 Email' },
  forder: { test: v => v.trim().length >= 4,         msg: '請輸入訂單或發票號碼（至少 4 碼）' },
};

function setErr(id, show) {
  const input = document.getElementById(id);
  const msg   = document.getElementById(id + 'Err');
  if (!input || !msg) return;
  input.classList.toggle('err', show);
  msg.classList.toggle('show', show);
  if (show) msg.textContent = rules[id].msg;
}

Object.keys(rules).forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('blur',  () => setErr(id, !rules[id].test(el.value)));
  el.addEventListener('input', () => { if (el.classList.contains('err')) setErr(id, !rules[id].test(el.value)); });
});

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    Object.keys(rules).forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const ok = rules[id].test(el.value);
      setErr(id, !ok);
      if (!ok) valid = false;
    });
    if (!valid) {
      const firstErr = form.querySelector('.err');
      if (firstErr) {
        const top = firstErr.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      return;
    }
    form.style.display = 'none';
    successBox.classList.add('show');
    successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}
