/* ============================================================
   FamilyMart × Jellycat — script.js  v3
   All interactions fully implemented.
   ============================================================ */
'use strict';

/* ════════════════════════════════════
   DATA
════════════════════════════════════ */

const PRODUCTS = {
  onigiri: {
    img:   'images/02_card_onigiri_safe.jpg',
    mood:  'Playful',
    badge: '限定款',
    name:  'Fami Reborn Onigiri',
    desc:  '像一枚藏在日常裡的柔軟幸運符，把便利商店最熟悉的小日常，變成手心裡最可愛的收藏。',
    tags:  ['盲盒驚喜', '輕巧收藏', '適合拍照分享'],
    moodColor: '#00A05A',
  },
  latte: {
    img:   'images/03_card_latte_safe.jpg',
    mood:  'Comfort',
    badge: '實用款',
    name:  'Mini Latte Re Cup Charm',
    desc:  '從每天的一杯咖啡出發，把環保杯套的實用概念，變成可以隨身帶著走的柔軟陪伴。',
    tags:  ['吊飾功能', '日常搭配', '輕巧收藏'],
    moodColor: '#0090D9',
  },
  oden: {
    img:   'images/04_card_oden_safe.jpg',
    mood:  'Charming',
    badge: '療癒款',
    name:  'Oden Upcycle Pouch',
    desc:  '把冬天裡熱呼呼的便利商店記憶，變成一個能收納、能陪伴、也能被收藏的小小療癒物。',
    tags:  ['輕巧收藏', '日常搭配', '適合拍照分享'],
    moodColor: '#E07A28',
  },
  potato: {
    img:   'images/05_card_potato_safe.jpg',
    mood:  'Sweet',
    badge: '收藏款',
    name:  'Sweet Potato Green Buddy',
    desc:  '甜甜暖暖的地瓜，是簡單生活裡最溫柔的存在，適合留給每一個需要被安慰的日子。',
    tags:  ['輕巧收藏', '適合拍照分享', '日常搭配'],
    moodColor: '#9B6FC0',
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
  playful: {
    img:         'images/02_card_onigiri_safe.jpg',
    label:       'Playful',
    name:        'Fami Reborn Onigiri',
    personality: '你是那種走進便利商店，每次都能發現新驚喜的人。收藏是你的語言，可愛是你的日常宣言。',
    share:       '「今天在全家遇到我的 Jellycat Match 了 🍙 #FamilyMartJellycat」',
    color:       '#00A05A',
  },
  comfort: {
    img:         'images/03_card_latte_safe.jpg',
    label:       'Comfort',
    name:        'Mini Latte Re Cup Charm',
    personality: '你喜歡在安靜角落慢慢喝一杯咖啡，把每一件小事都過得很細緻。陪你的，當然要同樣溫柔。',
    share:       '「找到最像我的 Jellycat 了 ☕ 沉靜又可愛 #FamilyMartJellycat #MiniLatte」',
    color:       '#0090D9',
  },
  sweet: {
    img:         'images/05_card_potato_safe.jpg',
    label:       'Sweet',
    name:        'Sweet Potato Green Buddy',
    personality: '你是那種在需要安慰的時候，就會自己去全家買地瓜的人。甜甜的日子，從一個擁抱開始。',
    share:       '「暖暖甜甜就是我 🍠 #FamilyMartJellycat #SweetPotato」',
    color:       '#9B6FC0',
  },
  charming: {
    img:         'images/04_card_oden_safe.jpg',
    label:       'Charming',
    name:        'Oden Upcycle Pouch',
    personality: '你享受生活裡每一個溫暖瞬間，喜歡有質感的小物，也懂得把平凡日子過得很有味道。',
    share:       '「療癒款果然是我的菜 🍢 #FamilyMartJellycat #CozyVibes」',
    color:       '#E07A28',
  },
};

/* ════════════════════════════════════
   HELPERS
════════════════════════════════════ */
const $ = id => document.getElementById(id);
const NAV_H = () => document.getElementById('navbar').offsetHeight;

function smoothTo(selector) {
  const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_H() - 8;
  window.scrollTo({ top, behavior: 'smooth' });
}

/* ════════════════════════════════════
   1. NAVBAR — scroll shadow
════════════════════════════════════ */
const navbar = $('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

/* ════════════════════════════════════
   2. HAMBURGER + MOBILE MENU
════════════════════════════════════ */
const hamburger  = $('hamburger');
const mobileMenu = $('mobileMenu');
const navOverlay = $('navOverlay');

function openMenu() {
  mobileMenu.style.display !== 'flex' && (mobileMenu.style.display = 'flex');
  // Force reflow then slide
  requestAnimationFrame(() => {
    mobileMenu.classList.add('open');
    navOverlay.classList.add('show');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden',  'false');
  });
}

function closeMenu() {
  mobileMenu.classList.remove('open');
  navOverlay.classList.remove('show');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden',  'true');
}

hamburger.addEventListener('click', () => {
  hamburger.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
});

navOverlay.addEventListener('click', closeMenu);

// Close on any mobile link click + smooth scroll
mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      closeMenu();
      // Short delay to let menu close before scrolling
      setTimeout(() => smoothTo(href), 250);
    }
  });
});

/* ════════════════════════════════════
   3. SMOOTH SCROLL — all anchor links
════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  if (a.closest('.mobile-menu')) return; // already handled above
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    // Close mobile menu if open
    closeMenu();
    setTimeout(() => smoothTo(target), 50);
  });
});

/* ════════════════════════════════════
   4. SCROLL REVEAL
════════════════════════════════════ */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.10 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ════════════════════════════════════
   5. PRODUCTS — thumb click + tag click
════════════════════════════════════ */
let currentProductKey = 'onigiri';
let currentTagKey     = null;

function buildTags(tags) {
  const container = $('pdTags');
  container.innerHTML = '';
  tags.forEach(tag => {
    const btn = document.createElement('button');
    btn.className      = 'pd-tag-btn';
    btn.textContent    = tag;
    btn.dataset.tag    = tag;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', 'false');
    btn.addEventListener('click', () => activateTag(tag, btn));
    container.appendChild(btn);
  });
  // Auto-activate first tag
  if (tags.length) {
    const firstBtn = container.querySelector('.pd-tag-btn');
    if (firstBtn) activateTag(tags[0], firstBtn);
  }
}

function activateTag(tag, btn) {
  // Remove active from all tag buttons
  document.querySelectorAll('.pd-tag-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');
  currentTagKey = tag;

  const descEl = $('pdTagDesc');
  descEl.style.opacity = '0';
  setTimeout(() => {
    descEl.textContent = TAG_DESCS[tag] || '';
    descEl.style.opacity = '1';
  }, 120);
}

function activateProduct(key) {
  const d = PRODUCTS[key];
  if (!d) return;
  currentProductKey = key;

  // Update thumb active state
  document.querySelectorAll('.product-thumb').forEach(t => {
    t.classList.toggle('active', t.dataset.key === key);
  });

  // Fade out → update → fade in
  const detail = document.querySelector('.product-detail');
  detail.style.opacity = '.4';
  detail.style.transition = 'opacity .15s ease';

  setTimeout(() => {
    // Image
    const img = $('pdImg');
    img.src = d.img;
    img.alt = d.name;

    // Text fields
    const moodEl = $('pdMood');
    moodEl.textContent       = d.mood;
    moodEl.style.background  = d.moodColor;
    $('pdBadge').textContent = d.badge;
    $('pdName').textContent  = d.name;
    $('pdDesc').textContent  = d.desc;

    // Tags
    buildTags(d.tags);

    detail.style.opacity    = '1';
    detail.style.transition = 'opacity .3s ease';
  }, 150);
}

// Thumb buttons
document.querySelectorAll('.product-thumb').forEach(thumb => {
  thumb.addEventListener('click', () => {
    const key = thumb.dataset.key;
    // Bounce the thumb
    thumb.classList.remove('product-bounce');
    void thumb.offsetWidth;
    thumb.classList.add('product-bounce');
    setTimeout(() => thumb.classList.remove('product-bounce'), 600);

    activateProduct(key);
  });
  // Touch support
  thumb.addEventListener('touchstart', () => {
    thumb.classList.add('product-bounce');
    setTimeout(() => thumb.classList.remove('product-bounce'), 600);
  }, { passive: true });
});

// Initialise with first product
activateProduct('onigiri');

/* ════════════════════════════════════
   6. JELLYCAT MATCH — mood buttons
════════════════════════════════════ */
function activateMood(moodKey) {
  const m = MOODS[moodKey];
  if (!m) return;

  // Update button states
  document.querySelectorAll('.mood-btn').forEach(btn => {
    const isActive = btn.dataset.mood === moodKey;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  // Fade image
  const img = $('matchImg');
  img.style.opacity    = '.3';
  img.style.transition = 'opacity .15s ease';

  setTimeout(() => {
    img.src             = m.img;
    img.alt             = m.name;
    img.style.opacity   = '1';
    img.style.transition = 'opacity .3s ease';

    // Bounce
    img.classList.remove('product-bounce');
    void img.offsetWidth;
    img.classList.add('product-bounce');
    setTimeout(() => img.classList.remove('product-bounce'), 600);
  }, 150);

  // Update text
  const labelEl = $('matchMoodLabel');
  labelEl.textContent      = m.label;
  labelEl.style.background = m.color;
  $('matchName').textContent        = m.name;
  $('matchPersonality').textContent = m.personality;
  $('matchShare').textContent       = m.share;
}

document.querySelectorAll('.mood-btn').forEach(btn => {
  btn.addEventListener('click', () => activateMood(btn.dataset.mood));
});

// Init
activateMood('playful');

/* ════════════════════════════════════
   7. QR CODE — real, scannable
════════════════════════════════════ */
function initQR() {
  const el = $('qrcode');
  if (!el) return;
  if (typeof QRCode === 'undefined') {
    // Retry up to 5 times if lib not yet loaded
    let tries = 0;
    const retry = setInterval(() => {
      tries++;
      if (typeof QRCode !== 'undefined') {
        clearInterval(retry);
        generateQR(el);
      } else if (tries > 10) {
        clearInterval(retry);
      }
    }, 300);
    return;
  }
  generateQR(el);
}

function generateQR(el) {
  el.innerHTML = '';
  new QRCode(el, {
    text:         'https://amandakaotw-ux.github.io/',
    width:        176,
    height:       176,
    colorDark:    '#143C33',
    colorLight:   '#ffffff',
    correctLevel: QRCode.CorrectLevel.H,
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initQR);
} else {
  initQR();
}

/* ════════════════════════════════════
   8. ACTIVE NAV LINK on scroll
════════════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
const desktopLinks = document.querySelectorAll('.nav-links a:not(.nav-cta-btn)');

const activeObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      desktopLinks.forEach(a => {
        const isMatch = a.getAttribute('href') === '#' + id;
        a.style.color      = isMatch ? '#00A05A' : '';
        a.style.background = isMatch ? 'rgba(0,160,90,.09)' : '';
        a.style.fontWeight = isMatch ? '700' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => activeObs.observe(s));

/* ════════════════════════════════════
   9. HERO IMAGE — subtle parallax (desktop only)
════════════════════════════════════ */
const heroSection  = document.getElementById('hero');
const heroImgEl    = heroSection && heroSection.querySelector('.hero-img-col img');

if (heroImgEl && window.matchMedia('(hover:hover) and (min-width:821px)').matches) {
  heroSection.addEventListener('mousemove', e => {
    const r  = heroImgEl.getBoundingClientRect();
    const cx = (e.clientX - r.left)  / r.width  - 0.5;
    const cy = (e.clientY - r.top)   / r.height - 0.5;
    heroImgEl.style.transform = `scale(1.04) translate(${cx * 7}px, ${cy * 5}px)`;
  }, { passive: true });
  heroSection.addEventListener('mouseleave', () => {
    heroImgEl.style.transform = '';
  });
}
