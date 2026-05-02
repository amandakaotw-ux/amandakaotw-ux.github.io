/* FamilyMart × Jellycat — script.js v5
   Vanilla JS only. No frameworks. No audio. No console errors.
---------------------------------------------------------------- */
'use strict';

/* ════════════════════════════════════
   DATA
════════════════════════════════════ */
const PRODUCTS = {
  onigiri: {
    img:      'images/02_card_onigiri_safe.jpg',
    category: '再生飯糰盲盒',
    mood:     'Playful',
    moodColor:'#00A05A',
    name:     'Fami Reborn Onigiri',
    body:     '像一枚藏在日常裡的柔軟幸運符，把便利商店裡最熟悉的小日常，變成手心裡可愛的收藏。',
    forWho:   '適合喜歡小驚喜、喜歡盲盒、喜歡把日常變得有趣的人。',
    how:      '盲盒收藏、小吊飾、桌面小物。',
    share:    '今天的我，是一顆藏著小驚喜的 Fami Reborn Onigiri。',
  },
  coffee: {
    img:      'images/03_card_latte_safe.jpg',
    category: '環保杯套吊飾',
    mood:     'Charming',
    moodColor:'#E07A28',
    name:     'Mini Coffee Buddy',
    body:     '把早晨第一杯咖啡的溫度，變成一個可以掛在包包上的小小陪伴。',
    forWho:   '適合每天需要一杯咖啡開機、喜歡通勤小配件的人。',
    how:      '包包吊飾、杯套小物、通勤陪伴。',
    share:    '今天的我，是一杯剛剛好的 Mini Coffee Buddy。',
  },
  bao: {
    img:      'images/04_card_oden_safe.jpg',
    category: '再生布料包子角色',
    mood:     'Humble',
    moodColor:'#5BAA6E',
    name:     'Soft Bao Friend',
    body:     '柔軟、圓潤、帶一點慢生活的可愛感，像忙碌日子裡的一口暖呼呼安慰。',
    forWho:   '適合喜歡療癒小物、需要放鬆感、喜歡柔軟觸感的人。',
    how:      '桌面擺飾、床邊小物、午休陪伴。',
    share:    '今天的我，是一顆慢慢呼吸的 Soft Bao Friend。',
  },
  potato: {
    img:      'images/05_card_potato_safe.jpg',
    category: '暖色系收藏吊飾',
    mood:     'Sweet',
    moodColor:'#9B6FC0',
    name:     'Sweet Potato Pal',
    body:     '像冬天便利商店門口飄出的烤地瓜香氣，溫暖、熟悉，也很適合陪你過日常。',
    forWho:   '適合喜歡暖色系、喜歡季節感、喜歡溫柔可愛風格的人。',
    how:      '包包吊飾、秋冬小物、拍照分享。',
    share:    '今天的我，是一顆暖暖的 Sweet Potato Pal。',
  },
};

// Mood → product key mapping
const MOOD_TO_KEY = {
  playful:  'onigiri',
  humble:   'bao',
  sweet:    'potato',
  charming: 'coffee',
};

const MOODS = {
  playful: {
    img:   'images/02_card_onigiri_safe.jpg',
    tag:   'Playful',
    color: '#00A05A',
    name:  'Fami Reborn Onigiri',
    main:  '你喜歡小驚喜，也容易被日常裡可愛的細節點亮。',
    why:   '你不是追求誇張的快樂，而是喜歡在平凡生活裡，找到一點讓人微笑的轉折。',
    how:   '盲盒收藏、桌面小物、朋友交換。',
    share: '今天的我，是一顆藏著小驚喜的 Fami Reborn Onigiri。#FamilyMartJellycat',
  },
  humble: {
    img:   'images/04_card_oden_safe.jpg',
    tag:   'Humble',
    color: '#5BAA6E',
    name:  'Soft Bao Friend',
    main:  '你喜歡安靜、柔軟、不用太用力的陪伴。',
    why:   '你重視舒服的生活節奏，也懂得把自己照顧好。Soft Bao Friend 像一顆溫熱的小靠墊，提醒你慢一點也沒關係。',
    how:   '床邊小物、午休陪伴、桌面療癒擺飾。',
    share: '今天的我，是一顆慢慢呼吸的 Soft Bao Friend。#FamilyMartJellycat',
  },
  sweet: {
    img:   'images/05_card_potato_safe.jpg',
    tag:   'Sweet',
    color: '#9B6FC0',
    name:  'Sweet Potato Pal',
    main:  '你有溫暖的內在，也容易被有季節感的小事打動。',
    why:   'Sweet Potato Pal 像冬天便利商店門口的烤地瓜香氣，溫柔、熟悉，也讓人安心。',
    how:   '包包吊飾、秋冬穿搭、生活照片小道具。',
    share: '今天的我，是一顆暖暖的 Sweet Potato Pal。#FamilyMartJellycat',
  },
  charming: {
    img:   'images/03_card_latte_safe.jpg',
    tag:   'Charming',
    color: '#E07A28',
    name:  'Mini Coffee Buddy',
    main:  '你喜歡俐落、有型，也希望日常小物能替生活加分。',
    why:   'Mini Coffee Buddy 適合陪你通勤、工作與日常移動，像一杯剛剛好的咖啡，不吵，但很有存在感。',
    how:   '包包吊飾、杯套小物、通勤配件。',
    share: '今天的我，是一杯剛剛好的 Mini Coffee Buddy。#FamilyMartJellycat',
  },
};

/* ════════════════════════════════════
   HELPERS
════════════════════════════════════ */
function $(id) { return document.getElementById(id); }
function $$(sel) { return document.querySelectorAll(sel); }

let toastTimer = null;
function showToast(msg) {
  const el = $('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2200);
}

async function copyText(text, btn, successLabel) {
  try {
    await navigator.clipboard.writeText(text);
    var orig = btn.textContent;
    btn.textContent = successLabel || '已複製！';
    setTimeout(function () { btn.textContent = orig; }, 1800);
  } catch (e) {
    // Fallback for older browsers / non-https
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.focus(); ta.select();
    try { document.execCommand('copy'); } catch (_) {}
    document.body.removeChild(ta);
    var orig2 = btn.textContent;
    btn.textContent = successLabel || '已複製！';
    setTimeout(function () { btn.textContent = orig2; }, 1800);
  }
}

/* ════════════════════════════════════
   1. HEADER scroll shadow
════════════════════════════════════ */
var siteHeader = document.querySelector('.site-header');
window.addEventListener('scroll', function () {
  if (siteHeader) siteHeader.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

/* ════════════════════════════════════
   2. MOBILE MENU — dropdown, no body lock
════════════════════════════════════ */
var menuToggle = $('menuToggle');
var mobileMenu = $('mobileMenu');

function closeMenu() {
  if (!mobileMenu || !menuToggle) return;
  mobileMenu.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
}
function openMenu() {
  if (!mobileMenu || !menuToggle) return;
  mobileMenu.classList.add('is-open');
  menuToggle.setAttribute('aria-expanded', 'true');
  mobileMenu.setAttribute('aria-hidden', 'false');
}

if (menuToggle) {
  menuToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    mobileMenu.classList.contains('is-open') ? closeMenu() : openMenu();
  });
}

// Menu links
$$('.mm-link').forEach(function (link) {
  link.addEventListener('click', function (e) {
    var href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      closeMenu();
      setTimeout(function () {
        var target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  });
});

// Click outside → close
document.addEventListener('click', function (e) {
  if (!mobileMenu || !mobileMenu.classList.contains('is-open')) return;
  if (!mobileMenu.contains(e.target) && menuToggle && !menuToggle.contains(e.target)) closeMenu();
});

// ESC → close
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeMenu();
});

/* ════════════════════════════════════
   3. SMOOTH SCROLL — all desktop anchor links
════════════════════════════════════ */
$$('a[href^="#"]').forEach(function (a) {
  if (a.closest('.mobile-menu')) return; // handled above
  a.addEventListener('click', function (e) {
    var href = this.getAttribute('href');
    if (!href || href === '#') return;
    var target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ════════════════════════════════════
   4. SCROLL REVEAL
════════════════════════════════════ */
var revealObs = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.10 });
$$('.reveal').forEach(function (el) { revealObs.observe(el); });

/* ════════════════════════════════════
   5. PRODUCTS — thumb → story panel
════════════════════════════════════ */
var currentProductKey = 'onigiri';

function updateStoryPanel(key) {
  var d = PRODUCTS[key];
  if (!d) return;
  currentProductKey = key;

  // Update thumb active
  $$('.product-thumb').forEach(function (t) {
    var on = t.dataset.key === key;
    t.classList.toggle('active', on);
    t.setAttribute('aria-selected', on ? 'true' : 'false');
  });

  var panel = document.querySelector('.story-panel');
  if (panel) { panel.style.opacity = '.4'; panel.style.transition = 'opacity .13s ease'; }

  setTimeout(function () {
    var imgEl = $('storyImg');
    if (imgEl) { imgEl.src = d.img; imgEl.alt = d.name; }

    var catEl = $('storyCategory');   if (catEl) catEl.textContent = d.category;
    var moodEl = $('storyMoodTag');
    if (moodEl) { moodEl.textContent = d.mood; moodEl.style.background = d.moodColor; }
    var nameEl  = $('storyName');     if (nameEl)  nameEl.textContent  = d.name;
    var bodyEl  = $('storyBody');     if (bodyEl)  bodyEl.textContent  = d.body;
    var forEl   = $('storyFor');      if (forEl)   forEl.textContent   = d.forWho;
    var howEl   = $('storyHow');      if (howEl)   howEl.textContent   = d.how;
    var shareEl = $('storyShare');    if (shareEl) shareEl.textContent = d.share;

    if (panel) { panel.style.opacity = '1'; panel.style.transition = 'opacity .3s ease'; }

    // On mobile: scroll to story panel
    if (window.innerWidth <= 820 && panel) {
      setTimeout(function () {
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }, 130);
}

$$('.product-thumb').forEach(function (thumb) {
  thumb.addEventListener('click', function () {
    var key = this.dataset.key;
    this.classList.remove('product-bounce');
    void this.offsetWidth;
    this.classList.add('product-bounce');
    setTimeout(function () { thumb.classList.remove('product-bounce'); }, 600);
    updateStoryPanel(key);
  });
  thumb.addEventListener('touchstart', function () {
    this.classList.add('product-bounce');
    setTimeout(function () { thumb.classList.remove('product-bounce'); }, 600);
  }, { passive: true });
});

// Init
updateStoryPanel('onigiri');

/* Story CTAs */
var btnAddToList = $('btnAddToList');
if (btnAddToList) {
  btnAddToList.addEventListener('click', function () {
    showToast('已加入概念收藏清單 ♡');
  });
}

var btnCopyStory = $('btnCopyStory');
if (btnCopyStory) {
  btnCopyStory.addEventListener('click', function () {
    var shareEl = $('storyShare');
    var text = shareEl ? shareEl.textContent : '';
    if (text) copyText(text, btnCopyStory, '已複製！');
  });
}

/* ════════════════════════════════════
   6. JELLYCAT MATCH — mood → result card
════════════════════════════════════ */
var currentMoodKey = 'playful';

function updateMatchCard(moodKey) {
  var m = MOODS[moodKey];
  if (!m) return;
  currentMoodKey = moodKey;

  // Update mood buttons
  $$('.mood-btn').forEach(function (btn) {
    var on = btn.dataset.mood === moodKey;
    btn.classList.toggle('active', on);
    btn.setAttribute('aria-selected', on ? 'true' : 'false');
  });

  var card = $('matchResultCard');
  if (card) { card.style.opacity = '.4'; card.style.transition = 'opacity .13s ease'; }

  setTimeout(function () {
    var imgEl = $('matchImg');
    if (imgEl) { imgEl.src = m.img; imgEl.alt = m.name;
      imgEl.classList.remove('product-bounce');
      void imgEl.offsetWidth;
      imgEl.classList.add('product-bounce');
      setTimeout(function () { imgEl.classList.remove('product-bounce'); }, 600);
    }

    var tagEl  = $('matchMoodTag');  if (tagEl) { tagEl.textContent = m.tag; tagEl.style.background = m.color; }
    var nameEl = $('matchName');     if (nameEl) nameEl.textContent = m.name;
    var mainEl = $('matchMain');     if (mainEl) mainEl.textContent = m.main;
    var whyEl  = $('matchWhy');      if (whyEl)  whyEl.textContent  = m.why;
    var howEl  = $('matchHow');      if (howEl)  howEl.textContent  = m.how;
    var shareEl= $('matchShare');    if (shareEl) shareEl.textContent = m.share;

    if (card) { card.style.opacity = '1'; card.style.transition = 'opacity .3s ease'; }
  }, 130);
}

$$('.mood-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    updateMatchCard(this.dataset.mood);
  });
});

// Init
updateMatchCard('playful');

/* Match CTAs */
var btnCopyMatch = $('btnCopyMatch');
if (btnCopyMatch) {
  btnCopyMatch.addEventListener('click', function () {
    var shareEl = $('matchShare');
    var text = shareEl ? shareEl.textContent : '';
    if (text) copyText(text, btnCopyMatch, '已複製！');
  });
}

var btnExplore = $('btnExplore');
if (btnExplore) {
  btnExplore.addEventListener('click', function () {
    // Map current mood to product key
    var productKey = MOOD_TO_KEY[currentMoodKey] || 'onigiri';
    // Scroll to products
    var productsSection = document.getElementById('products');
    if (productsSection) productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Select corresponding thumb after scroll
    setTimeout(function () {
      updateStoryPanel(productKey);
    }, 600);
  });
}

/* ════════════════════════════════════
   7. PURCHASE CTAs — toast buttons
════════════════════════════════════ */
$$('.pc-cta[data-toast]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    showToast(this.dataset.toast);
  });
});

/* ════════════════════════════════════
   8. ACTIVE NAV highlight on scroll
════════════════════════════════════ */
var allSections   = $$('section[id]');
var desktopLinks  = $$('.nav-links a:not(.nav-cta)');

var sectionObs = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    var id = entry.target.id;
    desktopLinks.forEach(function (a) {
      var match = a.getAttribute('href') === '#' + id;
      a.style.color      = match ? '#00A05A' : '';
      a.style.background = match ? 'rgba(0,160,90,.09)' : '';
      a.style.fontWeight = match ? '700' : '';
    });
  });
}, { rootMargin: '-38% 0px -57% 0px' });

allSections.forEach(function (s) { sectionObs.observe(s); });

/* ════════════════════════════════════
   9. HERO parallax — desktop hover only
════════════════════════════════════ */
var heroSec = document.getElementById('hero');
var heroImg = heroSec && heroSec.querySelector('.hero-img-col img');
if (heroImg && window.matchMedia('(hover:hover) and (min-width:821px)').matches) {
  heroSec.addEventListener('mousemove', function (e) {
    var r  = heroImg.getBoundingClientRect();
    var cx = (e.clientX - r.left) / r.width  - 0.5;
    var cy = (e.clientY - r.top)  / r.height - 0.5;
    heroImg.style.transform = 'scale(1.04) translate(' + (cx * 7) + 'px,' + (cy * 5) + 'px)';
  }, { passive: true });
  heroSec.addEventListener('mouseleave', function () {
    heroImg.style.transform = '';
  });
}
