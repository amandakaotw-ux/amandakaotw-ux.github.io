/* ============================================================
   FamilyMart × Jellycat — script.js  v4
   Mobile menu: dropdown only, body never permanently locked.
   ============================================================ */
'use strict';

/* ════════════════════════════════════
   PRODUCT DATA
════════════════════════════════════ */
const PRODUCTS = {
  onigiri: {
    img:   'images/02_card_onigiri_safe.jpg',
    mood:  'Playful', moodColor: '#00A05A',
    badge: '限定款',
    name:  'Fami Reborn Onigiri',
    desc:  '像一枚藏在日常裡的柔軟幸運符，把便利商店最熟悉的小日常，變成手心裡最可愛的收藏。',
    tags:  ['盲盒驚喜', '輕巧收藏', '適合拍照分享'],
  },
  latte: {
    img:   'images/03_card_latte_safe.jpg',
    mood:  'Comfort', moodColor: '#0090D9',
    badge: '實用款',
    name:  'Mini Latte Re Cup Charm',
    desc:  '從每天的一杯咖啡出發，把環保杯套的實用概念，變成可以隨身帶著走的柔軟陪伴。',
    tags:  ['吊飾功能', '日常搭配', '輕巧收藏'],
  },
  oden: {
    img:   'images/04_card_oden_safe.jpg',
    mood:  'Charming', moodColor: '#E07A28',
    badge: '療癒款',
    name:  'Oden Upcycle Pouch',
    desc:  '把冬天裡熱呼呼的便利商店記憶，變成一個能收納、能陪伴、也能被收藏的小小療癒物。',
    tags:  ['輕巧收藏', '日常搭配', '適合拍照分享'],
  },
  potato: {
    img:   'images/05_card_potato_safe.jpg',
    mood:  'Sweet', moodColor: '#9B6FC0',
    badge: '收藏款',
    name:  'Sweet Potato Green Buddy',
    desc:  '甜甜暖暖的地瓜，是簡單生活裡最溫柔的存在，適合留給每一個需要被安慰的日子。',
    tags:  ['輕巧收藏', '適合拍照分享', '日常搭配'],
  },
};

const TAG_DESCS = {
  '盲盒驚喜':    '每次開盒都像打開一份小小日常驚喜，讓收藏多了一點期待，也多了一點陪伴感。',
  '輕巧收藏':    '尺寸剛剛好，不佔空間，適合放在桌面、床邊、辦公區或包包旁的小角落。',
  '適合拍照分享': '柔和色系與可愛造型很適合日常拍攝，不論是咖啡桌、書桌還是外出穿搭，都很好入鏡。',
  '吊飾功能':    '可以掛在包包、鑰匙圈或隨身物品上，讓可愛隨時隨地陪著你。',
  '日常搭配':    '不只是收藏，也能成為包包吊飾、桌面小物或房間擺飾，讓可愛自然融入生活。',
};

const MOODS = {
  playful:  {
    img:  'images/02_card_onigiri_safe.jpg',
    color: '#00A05A',
    label: 'Playful', name: 'Fami Reborn Onigiri',
    personality: '你是那種走進便利商店，每次都能發現新驚喜的人。收藏是你的語言，可愛是你的日常宣言。',
    share: '「今天在全家遇到我的 Jellycat Match 了 🍙 #FamilyMartJellycat」',
  },
  comfort: {
    img:  'images/03_card_latte_safe.jpg',
    color: '#0090D9',
    label: 'Comfort', name: 'Mini Latte Re Cup Charm',
    personality: '你喜歡在安靜角落慢慢喝一杯咖啡，把每一件小事都過得很細緻。陪你的，當然要同樣溫柔。',
    share: '「找到最像我的 Jellycat 了 ☕ 沉靜又可愛 #FamilyMartJellycat #MiniLatte」',
  },
  sweet: {
    img:  'images/05_card_potato_safe.jpg',
    color: '#9B6FC0',
    label: 'Sweet', name: 'Sweet Potato Green Buddy',
    personality: '你是那種在需要安慰的時候，就會自己去全家買地瓜的人。甜甜的日子，從一個擁抱開始。',
    share: '「暖暖甜甜就是我 🍠 #FamilyMartJellycat #SweetPotato」',
  },
  charming: {
    img:  'images/04_card_oden_safe.jpg',
    color: '#E07A28',
    label: 'Charming', name: 'Oden Upcycle Pouch',
    personality: '你享受生活裡每一個溫暖瞬間，喜歡有質感的小物，也懂得把平凡日子過得很有味道。',
    share: '「療癒款果然是我的菜 🍢 #FamilyMartJellycat #CozyVibes」',
  },
};

/* ════════════════════════════════════
   HELPERS
════════════════════════════════════ */
const $  = id  => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

function navHeight() {
  const h = document.getElementById('site-header');
  return h ? h.offsetHeight : 72;
}

/* ════════════════════════════════════
   1. NAVBAR scroll shadow
════════════════════════════════════ */
const siteHeader = document.getElementById('site-header');

window.addEventListener('scroll', function () {
  siteHeader.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

/* ════════════════════════════════════
   2. MOBILE MENU — stable, no body lock
════════════════════════════════════ */
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const menuLinks  = document.querySelectorAll('.mobile-menu .mobile-link');

function closeMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.remove('is-open');
  menuButton.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
  // Body is NEVER permanently locked — nothing to undo
}

function openMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.add('is-open');
  menuButton.classList.add('is-open');
  menuButton.setAttribute('aria-expanded', 'true');
  mobileMenu.setAttribute('aria-hidden', 'false');
}

menuButton.addEventListener('click', function (e) {
  e.stopPropagation();
  if (mobileMenu.classList.contains('is-open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Each menu link: smooth scroll then close
menuLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const href   = this.getAttribute('href');
    const target = href ? document.querySelector(href) : null;

    closeMenu();

    if (target) {
      // Small delay so CSS transition has time to start closing
      setTimeout(function () {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  });
});

// Click outside menu → close
document.addEventListener('click', function (e) {
  if (!mobileMenu || !mobileMenu.classList.contains('is-open')) return;
  if (!mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
    closeMenu();
  }
});

// ESC key → close
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeMenu();
});

/* ════════════════════════════════════
   3. SMOOTH SCROLL — desktop nav + all anchor links
════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  // Skip mobile-menu links (handled above)
  if (anchor.closest('.mobile-menu')) return;

  anchor.addEventListener('click', function (e) {
    const href   = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ════════════════════════════════════
   4. SCROLL REVEAL
════════════════════════════════════ */
const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.10 });

document.querySelectorAll('.reveal').forEach(function (el) {
  revealObserver.observe(el);
});

/* ════════════════════════════════════
   5. PRODUCTS — thumb switch + tag switch
════════════════════════════════════ */
function buildTags(tags) {
  const container = $('pdTags');
  if (!container) return;
  container.innerHTML = '';
  tags.forEach(function (tag) {
    const btn = document.createElement('button');
    btn.className   = 'pd-tag-btn';
    btn.textContent = tag;
    btn.dataset.tag = tag;
    btn.setAttribute('role', 'tab');
    btn.addEventListener('click', function () { activateTag(tag, btn); });
    container.appendChild(btn);
  });
  // Auto-activate first
  const first = container.querySelector('.pd-tag-btn');
  if (first) activateTag(tags[0], first);
}

function activateTag(tag, btn) {
  $$('.pd-tag-btn').forEach(function (b) {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');
  const descEl = $('pdTagDesc');
  if (!descEl) return;
  descEl.style.opacity = '0';
  setTimeout(function () {
    descEl.textContent   = TAG_DESCS[tag] || '';
    descEl.style.opacity = '1';
  }, 100);
}

function activateProduct(key) {
  const d = PRODUCTS[key];
  if (!d) return;

  // Thumb active states
  $$('.product-thumb').forEach(function (t) {
    t.classList.toggle('active', t.dataset.key === key);
  });

  // Fade panel out
  const detail = document.getElementById('productDetail');
  if (detail) { detail.style.opacity = '.4'; detail.style.transition = 'opacity .14s ease'; }

  setTimeout(function () {
    const imgEl = $('pdImg');
    if (imgEl) { imgEl.src = d.img; imgEl.alt = d.name; }

    const moodEl = $('pdMood');
    if (moodEl) { moodEl.textContent = d.mood; moodEl.style.background = d.moodColor; }

    const badgeEl = $('pdBadge');   if (badgeEl) badgeEl.textContent = d.badge;
    const nameEl  = $('pdName');    if (nameEl)  nameEl.textContent  = d.name;
    const descEl  = $('pdDesc');    if (descEl)  descEl.textContent  = d.desc;

    buildTags(d.tags);

    if (detail) { detail.style.opacity = '1'; detail.style.transition = 'opacity .3s ease'; }
  }, 140);
}

$$('.product-thumb').forEach(function (thumb) {
  thumb.addEventListener('click', function () {
    const key = this.dataset.key;
    // Bounce
    this.classList.remove('product-bounce');
    void this.offsetWidth;
    this.classList.add('product-bounce');
    setTimeout(() => this.classList.remove('product-bounce'), 600);

    activateProduct(key);
  });

  // Touch: bounce feedback
  thumb.addEventListener('touchstart', function () {
    this.classList.add('product-bounce');
    setTimeout(() => this.classList.remove('product-bounce'), 600);
  }, { passive: true });
});

// Init default product
activateProduct('onigiri');

/* ════════════════════════════════════
   6. JELLYCAT MATCH — mood buttons
════════════════════════════════════ */
function activateMood(key) {
  const m = MOODS[key];
  if (!m) return;

  $$('.mood-btn').forEach(function (btn) {
    const on = btn.dataset.mood === key;
    btn.classList.toggle('active', on);
    btn.setAttribute('aria-selected', on ? 'true' : 'false');
  });

  const img = $('matchImg');
  if (img) {
    img.style.opacity = '.3';
    img.style.transition = 'opacity .14s ease';
    setTimeout(function () {
      img.src = m.img; img.alt = m.name;
      img.style.opacity = '1'; img.style.transition = 'opacity .3s ease';
      img.classList.remove('product-bounce');
      void img.offsetWidth;
      img.classList.add('product-bounce');
      setTimeout(() => img.classList.remove('product-bounce'), 600);
    }, 140);
  }

  const labelEl = $('matchMoodLabel');
  if (labelEl) { labelEl.textContent = m.label; labelEl.style.background = m.color; }
  const nameEl  = $('matchName');        if (nameEl)  nameEl.textContent  = m.name;
  const persEl  = $('matchPersonality'); if (persEl)  persEl.textContent  = m.personality;
  const shareEl = $('matchShare');       if (shareEl) shareEl.textContent = m.share;
}

$$('.mood-btn').forEach(function (btn) {
  btn.addEventListener('click', function () { activateMood(this.dataset.mood); });
});

activateMood('playful');

/* ════════════════════════════════════
   7. QR CODE — real, scannable
════════════════════════════════════ */
function generateQR() {
  const el = $('qrcode');
  if (!el) return;
  if (typeof QRCode === 'undefined') {
    setTimeout(generateQR, 300);
    return;
  }
  el.innerHTML = '';
  new QRCode(el, {
    text:         'https://amandakaotw-ux.github.io/',
    width:        176, height: 176,
    colorDark:    '#143C33',
    colorLight:   '#ffffff',
    correctLevel: QRCode.CorrectLevel.H,
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', generateQR);
} else {
  generateQR();
}

/* ════════════════════════════════════
   8. Active nav highlight on scroll
════════════════════════════════════ */
const allSections   = document.querySelectorAll('section[id]');
const desktopAnchors = document.querySelectorAll('.nav-links a:not(.nav-cta-btn)');

const sectionObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    desktopAnchors.forEach(function (a) {
      const match = a.getAttribute('href') === '#' + id;
      a.style.color      = match ? '#00A05A' : '';
      a.style.background = match ? 'rgba(0,160,90,.09)' : '';
      a.style.fontWeight = match ? '700' : '';
    });
  });
}, { rootMargin: '-38% 0px -57% 0px' });

allSections.forEach(function (s) { sectionObserver.observe(s); });

/* ════════════════════════════════════
   9. Hero parallax (desktop, hover-capable devices only)
════════════════════════════════════ */
const heroSec  = document.getElementById('hero');
const heroImg  = heroSec && heroSec.querySelector('.hero-img-col img');

if (heroImg && window.matchMedia('(hover:hover) and (min-width:821px)').matches) {
  heroSec.addEventListener('mousemove', function (e) {
    const r  = heroImg.getBoundingClientRect();
    const cx = (e.clientX - r.left) / r.width  - 0.5;
    const cy = (e.clientY - r.top)  / r.height - 0.5;
    heroImg.style.transform = 'scale(1.04) translate(' + (cx * 7) + 'px,' + (cy * 5) + 'px)';
  }, { passive: true });
  heroSec.addEventListener('mouseleave', function () {
    heroImg.style.transform = '';
  });
}
