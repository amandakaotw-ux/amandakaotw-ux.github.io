/* ============================================================
   FamilyMart × Jellycat — script.js
   ============================================================ */
'use strict';

/* ── Product data ── */
const PRODUCTS = {
  onigiri: {
    img:      'images/02_card_onigiri_safe.jpg',
    mood:     'Playful',
    label:    '再生飯糰盲盒',
    name:     'Fami Reborn Onigiri',
    desc:     '像一枚藏在日常裡的柔軟幸運符，把便利商店裡最熟悉的小日常，變成手心裡最可愛的收藏。',
    tags:     ['盲盒驚喜', '輕巧收藏', '適合拍照分享'],
    moodColor:'#00A05A',
  },
  latte: {
    img:      'images/03_card_latte_safe.jpg',
    mood:     'Calm',
    label:    '環保杯套吊飾',
    name:     'Mini Latte Re Cup Charm',
    desc:     '從每天的一杯咖啡出發，把環保杯套的實用概念，變成可以隨身帶著走的柔軟陪伴。',
    tags:     ['吊飾功能', '日常搭配', '咖啡控小物'],
    moodColor:'#0090D9',
  },
  oden: {
    img:      'images/04_card_oden_safe.jpg',
    mood:     'Cozy',
    label:    '再生關東煮小隊',
    name:     'Oden Upcycle Pouch',
    desc:     '把冬天裡熱呼呼的便利商店記憶，變成一個能收納、能陪伴、也能被收藏的小小療癒物。',
    tags:     ['小物收納', '療癒造型', '溫暖生活感'],
    moodColor:'#E07A28',
  },
  potato: {
    img:      'images/05_card_potato_safe.jpg',
    mood:     'Sweet',
    label:    '地瓜綠色夥伴',
    name:     'Sweet Potato Green Buddy',
    desc:     '甜甜暖暖的地瓜，是簡單生活裡最溫柔的存在，適合留給每一個需要被安慰的日子。',
    tags:     ['暖色系造型', '柔軟陪伴', '秋冬收藏感'],
    moodColor:'#9B6FC0',
  },
};

/* ── Jellycat Match data ── */
const MOODS = {
  playful: {
    product:     'onigiri',
    img:         'images/02_card_onigiri_safe.jpg',
    moodLabel:   'Playful',
    name:        'Fami Reborn Onigiri',
    personality: '你是那種走進便利商店，每次都能發現新驚喜的人。收藏是你的語言，可愛是你的日常宣言。',
    share:       '「今天在全家遇到我的 Jellycat Match 了 🍙 #FamilyMartJellycat #GreenUniverse」',
  },
  calm: {
    product:     'latte',
    img:         'images/03_card_latte_safe.jpg',
    moodLabel:   'Calm',
    name:        'Mini Latte Re Cup Charm',
    personality: '你喜歡在安靜的角落慢慢喝一杯咖啡，把每一件小事都過得很細緻。陪你的，當然要同樣溫柔。',
    share:       '「找到最像我的 Jellycat 了 ☕ 沉靜又可愛 #FamilyMartJellycat #MiniLatte」',
  },
  cozy: {
    product:     'oden',
    img:         'images/04_card_oden_safe.jpg',
    moodLabel:   'Cozy',
    name:        'Oden Upcycle Pouch',
    personality: '你享受窩在家裡的溫暖，比起出發，你更愛的是到達。關東煮的熱呼呼，就是你的生活節奏。',
    share:       '「療癒款果然是我的菜 🍢 #FamilyMartJellycat #CozyVibes」',
  },
  sweet: {
    product:     'potato',
    img:         'images/05_card_potato_safe.jpg',
    moodLabel:   'Sweet',
    name:        'Sweet Potato Green Buddy',
    personality: '你是那種在需要安慰的時候，就會自己去全家買地瓜的人。甜甜的日子，從一個擁抱開始。',
    share:       '「暖暖甜甜就是我 🍠 #FamilyMartJellycat #SweetPotato」',
  },
};

/* ════════════════════════════════════
   1. Navbar scroll shadow
════════════════════════════════════ */
const navbar = document.getElementById('navbar');
const NAV_H  = () => navbar.offsetHeight;

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 12);
}, { passive: true });

/* ════════════════════════════════════
   2. Hamburger / Mobile nav
════════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close mobile nav when any link is clicked
mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

/* ════════════════════════════════════
   3. Smooth scroll + nav highlight
════════════════════════════════════ */
function smoothScrollTo(target) {
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - NAV_H() - 8;
  window.scrollTo({ top, behavior: 'smooth' });
  // Highlight target section briefly
  target.classList.remove('nav-targeted');
  void target.offsetWidth;
  target.classList.add('nav-targeted');
  setTimeout(() => target.classList.remove('nav-targeted'), 1500);
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#' || id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    smoothScrollTo(target);
  });
});

/* ════════════════════════════════════
   4. Scroll reveal (IntersectionObserver)
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
   5. Product card: click → bounce + update story
════════════════════════════════════ */
function updateStory(productKey) {
  const d = PRODUCTS[productKey];
  if (!d) return;

  // Fade out
  const storySection = document.getElementById('product-story');
  storySection.style.opacity = '.5';
  storySection.style.transition = 'opacity .15s ease';

  setTimeout(() => {
    document.getElementById('storyImg').src         = d.img;
    document.getElementById('storyImg').alt         = d.name;
    document.getElementById('storyMood').textContent = d.mood;
    document.getElementById('storyMood').style.background = d.moodColor;
    document.getElementById('storyLabel').textContent = d.label;
    document.getElementById('storyName').textContent  = d.name;
    document.getElementById('storyDesc').textContent  = d.desc;

    const tagsEl = document.getElementById('storyTags');
    tagsEl.innerHTML = d.tags.map(t => `<span class="story-tag">${t}</span>`).join('');

    storySection.style.opacity   = '1';
    storySection.style.transition = 'opacity .3s ease';

    // Highlight
    storySection.classList.remove('highlight');
    void storySection.offsetWidth;
    storySection.classList.add('highlight');
    setTimeout(() => storySection.classList.remove('highlight'), 1000);

    // Scroll to story
    smoothScrollTo(storySection);
  }, 150);
}

document.querySelectorAll('.card-wrap').forEach(card => {
  const activate = () => {
    const key = card.dataset.product;

    // Bounce animation
    card.classList.remove('product-bounce');
    void card.offsetWidth;
    card.classList.add('product-bounce');
    setTimeout(() => card.classList.remove('product-bounce'), 650);

    updateStory(key);
  };

  card.addEventListener('click', activate);
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
  });
  // Touch support
  card.addEventListener('touchstart', () => {
    card.classList.add('product-bounce');
    setTimeout(() => card.classList.remove('product-bounce'), 650);
  }, { passive: true });
});

/* ════════════════════════════════════
   6. Jellycat Match mood buttons
════════════════════════════════════ */
function updateMatch(moodKey) {
  const m = MOODS[moodKey];
  if (!m) return;

  const matchImg = document.getElementById('matchImg');
  matchImg.style.opacity = '.4';
  matchImg.style.transition = 'opacity .15s ease';

  setTimeout(() => {
    matchImg.src = m.img;
    matchImg.alt = m.name;
    matchImg.style.opacity   = '1';
    matchImg.style.transition = 'opacity .3s ease';
    // Bounce the image
    matchImg.classList.remove('product-bounce');
    void matchImg.offsetWidth;
    matchImg.classList.add('product-bounce');
    setTimeout(() => matchImg.classList.remove('product-bounce'), 650);
  }, 150);

  document.getElementById('matchMoodLabel').textContent  = m.moodLabel;
  document.getElementById('matchName').textContent       = m.name;
  document.getElementById('matchPersonality').textContent = m.personality;
  document.getElementById('matchShare').textContent      = m.share;
}

document.querySelectorAll('.mood-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateMatch(btn.dataset.mood);
  });
});

/* ════════════════════════════════════
   7. QR Code generation (real, scannable)
════════════════════════════════════ */
function initQRCode() {
  const el = document.getElementById('qrcode');
  if (!el || typeof QRCode === 'undefined') {
    // Retry after a short delay if library hasn't loaded yet
    setTimeout(initQRCode, 300);
    return;
  }
  el.innerHTML = ''; // clear any previous attempt
  new QRCode(el, {
    text:         'https://amandakaotw-ux.github.io/',
    width:        180,
    height:       180,
    colorDark:    '#143C33',
    colorLight:   '#ffffff',
    correctLevel: QRCode.CorrectLevel.H,
  });
}

// Wait for DOM + QRCode lib
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initQRCode);
} else {
  initQRCode();
}

/* ════════════════════════════════════
   8. Hero img: subtle mouse-move parallax (desktop only)
════════════════════════════════════ */
const heroImg = document.querySelector('#hero .hero-img-wrap img');
if (heroImg && window.matchMedia('(hover:hover)').matches) {
  document.getElementById('hero').addEventListener('mousemove', e => {
    const { left, top, width, height } = heroImg.getBoundingClientRect();
    const cx = (e.clientX - left) / width  - 0.5;
    const cy = (e.clientY - top)  / height - 0.5;
    heroImg.style.transform = `scale(1.04) translate(${cx * 8}px, ${cy * 5}px)`;
  }, { passive: true });
  document.getElementById('hero').addEventListener('mouseleave', () => {
    heroImg.style.transform = '';
  });
}

/* ════════════════════════════════════
   9. Active nav link highlight on scroll
════════════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a, .mobile-nav a');

const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navAs.forEach(a => {
        a.style.color = '';
        a.style.background = '';
        if (a.getAttribute('href') === '#' + id) {
          if (!a.classList.contains('nav-cta-link') && !a.classList.contains('mobile-nav-cta')) {
            a.style.color = '#00A05A';
            a.style.background = 'rgba(0,160,90,.1)';
          }
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObs.observe(s));
