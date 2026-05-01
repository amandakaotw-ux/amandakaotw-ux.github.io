// ===== FINAL QUICK FIX SCRIPT =====

const productData = {
  onigiri: {
    img: 'images/02_card_onigiri.jpg',
    title: '再生飯糰盲盒',
    tag: 'PLAYFUL',
    text: '它像一枚藏在日常裡的柔軟幸運符。把熟悉的便利商店記憶變成可收藏的小夥伴，陪你一起把普通的一天變得可愛一點。',
    share: '今天，我的 Jellycat Match 是再生飯糰盲盒。把日常變可愛，也把溫柔留給世界。'
  },
  latte: {
    img: 'images/03_card_latte.jpg',
    title: '環保杯套吊飾',
    tag: 'CALM',
    text: '靈感來自每天都會遇見的一杯咖啡。它輕巧、日常，也提醒我們：友善環境的選擇，可以從一個很小的習慣開始。',
    share: '今天，我的 Jellycat Match 是環保杯套吊飾。讓每一杯日常，都多一點柔軟陪伴。'
  },
  oden: {
    img: 'images/04_card_oden.jpg',
    title: '再生關東煮小隊',
    tag: 'COZY',
    text: '熱呼呼的關東煮，是便利商店最熟悉的溫度。這一款把那份暖意變成小隊陪伴，適合所有需要一點安慰的時刻。',
    share: '今天，我的 Jellycat Match 是再生關東煮小隊。暖暖地，把喜歡帶回家。'
  },
  potato: {
    img: 'images/05_card_potato.jpg',
    title: '地瓜綠色夥伴',
    tag: 'SWEET',
    text: '甜甜暖暖的地瓜，是簡單生活裡最溫柔的存在。它像一個安靜卻可靠的小夥伴，提醒你慢一點，也好好照顧自己。',
    share: '今天，我的 Jellycat Match 是地瓜綠色夥伴。甜甜地生活，也輕輕地善待地球。'
  }
};

let currentShare = productData.potato.share;

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
  }

  // Smooth scroll for all internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.offsetTop - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));

  // Product card opens simple alert/story for now
  document.querySelectorAll('[data-product]').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.product;
      const item = productData[key];
      if (!item) return;
      updateMatch(key);
      document.querySelector('#match').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Match buttons
  document.querySelectorAll('[data-match]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-match]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateMatch(btn.dataset.match);
    });
  });

  const copyBtn = document.getElementById('copyMatch');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(currentShare);
        alert('分享文字已複製');
      } catch (err) {
        alert(currentShare);
      }
    });
  }

  // Default active match
  const defaultBtn = document.querySelector('[data-match="potato"]');
  if (defaultBtn) defaultBtn.classList.add('active');
});

function updateMatch(key) {
  const item = productData[key];
  if (!item) return;

  const img = document.getElementById('matchImage');
  const title = document.getElementById('matchTitle');
  const text = document.getElementById('matchText');

  if (img) img.src = item.img;
  if (title) title.textContent = item.title;
  if (text) text.textContent = item.text;

  currentShare = item.share;
}
