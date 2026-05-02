const productData = {
  onigiri: {
    icon: "🍙",
    name: "Fami Reborn Onigiri",
    category: "再生飯糰盲盒",
    story: "像一枚藏在日常裡的柔軟幸運符，把便利商店裡最熟悉的小日常，變成手心裡可愛的收藏。",
    best: "適合喜歡小驚喜、喜歡盲盒、喜歡把日常變得有趣的人。",
    collect: "盲盒收藏、小吊飾、桌面小物。",
    share: "今天的我，是一顆藏著小驚喜的 Fami Reborn Onigiri。",
    mood: "playful"
  },
  coffee: {
    icon: "☕",
    name: "Mini Coffee Buddy",
    category: "環保杯套吊飾",
    story: "把早晨第一杯咖啡的溫度，變成一個可以掛在包包上的小小陪伴。",
    best: "適合每天需要一杯咖啡開機、喜歡通勤小配件的人。",
    collect: "包包吊飾、杯套小物、通勤陪伴。",
    share: "今天的我，是一杯剛剛好的 Mini Coffee Buddy。",
    mood: "charming"
  },
  bao: {
    icon: "🥟",
    name: "Soft Bao Friend",
    category: "再生布料包子角色",
    story: "柔軟、圓潤、帶一點慢生活的可愛感，像忙碌日子裡的一口暖呼呼安慰。",
    best: "適合喜歡療癒小物、需要放鬆感、喜歡柔軟觸感的人。",
    collect: "桌面擺飾、床邊小物、午休陪伴。",
    share: "今天的我，是一顆慢慢呼吸的 Soft Bao Friend。",
    mood: "humble"
  },
  potato: {
    icon: "🍠",
    name: "Sweet Potato Pal",
    category: "暖色系收藏吊飾",
    story: "像冬天便利商店門口飄出的烤地瓜香氣，溫暖、熟悉，也很適合陪你過日常。",
    best: "適合喜歡暖色系、喜歡季節感、喜歡溫柔可愛風格的人。",
    collect: "包包吊飾、秋冬小物、拍照分享。",
    share: "今天的我，是一顆暖暖的 Sweet Potato Pal。",
    mood: "sweet"
  }
};

const moodData = {
  playful: {
    mood: "Playful",
    icon: "🍙",
    product: "onigiri",
    name: "Fami Reborn Onigiri",
    main: "你喜歡小驚喜，也容易被日常裡可愛的細節點亮。",
    why: "你不是追求誇張的快樂，而是喜歡在平凡生活裡，找到一點讓人微笑的轉折。",
    collect: "盲盒收藏、桌面小物、朋友交換。",
    share: "今天的我，是一顆藏著小驚喜的 Fami Reborn Onigiri。#FamilyMartJellycat"
  },
  humble: {
    mood: "Humble",
    icon: "🥟",
    product: "bao",
    name: "Soft Bao Friend",
    main: "你喜歡安靜、柔軟、不用太用力的陪伴。",
    why: "你重視舒服的生活節奏，也懂得把自己照顧好。Soft Bao Friend 像一顆溫熱的小靠墊，提醒你慢一點也沒關係。",
    collect: "床邊小物、午休陪伴、桌面療癒擺飾。",
    share: "今天的我，是一顆慢慢呼吸的 Soft Bao Friend。#FamilyMartJellycat"
  },
  sweet: {
    mood: "Sweet",
    icon: "🍠",
    product: "potato",
    name: "Sweet Potato Pal",
    main: "你有溫暖的內在，也容易被有季節感的小事打動。",
    why: "Sweet Potato Pal 像冬天便利商店門口的烤地瓜香氣，溫柔、熟悉，也讓人安心。",
    collect: "包包吊飾、秋冬穿搭、生活照片小道具。",
    share: "今天的我，是一顆暖暖的 Sweet Potato Pal。#FamilyMartJellycat"
  },
  charming: {
    mood: "Charming",
    icon: "☕",
    product: "coffee",
    name: "Mini Coffee Buddy",
    main: "你喜歡俐落、有型，也希望日常小物能替生活加分。",
    why: "Mini Coffee Buddy 適合陪你通勤、工作與日常移動，像一杯剛剛好的咖啡，不吵，但很有存在感。",
    collect: "包包吊飾、杯套小物、通勤配件。",
    share: "今天的我，是一杯剛剛好的 Mini Coffee Buddy。#FamilyMartJellycat"
  }
};

let currentProduct = "onigiri";
let currentMood = "playful";
let toastTimer = null;

const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const toast = document.getElementById("toast");

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
}

function closeMenu() {
  if (!menuToggle || !mobileNav) return;
  menuToggle.classList.remove("is-open");
  mobileNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

function openMenu() {
  if (!menuToggle || !mobileNav) return;
  menuToggle.classList.add("is-open");
  mobileNav.classList.add("is-open");
  menuToggle.setAttribute("aria-expanded", "true");
  document.body.classList.add("menu-open");
}

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    if (mobileNav.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      mobileNav.classList.contains("is-open") &&
      !mobileNav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

function scrollToHash(hash) {
  const target = document.querySelector(hash);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;
    event.preventDefault();
    closeMenu();
    setTimeout(() => scrollToHash(href), 80);
  });
});

function flash(element) {
  if (!element) return;
  element.classList.remove("flash");
  void element.offsetWidth;
  element.classList.add("flash");
}

function updateProduct(productKey, shouldScroll = false) {
  const data = productData[productKey];
  if (!data) return;

  currentProduct = productKey;

  document.querySelectorAll(".product-card").forEach((card) => {
    card.classList.toggle("active", card.dataset.product === productKey);
  });

  document.getElementById("product-icon").textContent = data.icon;
  document.getElementById("product-name").textContent = data.name;
  document.getElementById("product-category").textContent = data.category;
  document.getElementById("product-story").textContent = data.story;
  document.getElementById("product-best").textContent = data.best;
  document.getElementById("product-collect").textContent = data.collect;

  const result = document.getElementById("product-result");
  flash(result);

  if (shouldScroll && window.innerWidth < 1160 && result) {
    setTimeout(() => {
      result.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }
}

document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("click", () => {
    updateProduct(card.dataset.product, true);
  });
});

function updateMood(moodKey) {
  const data = moodData[moodKey];
  if (!data) return;

  currentMood = moodKey;

  document.querySelectorAll(".mood-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.mood === moodKey);
  });

  document.getElementById("match-icon").textContent = data.icon;
  document.getElementById("match-mood").textContent = data.mood;
  document.getElementById("match-name").textContent = data.name;
  document.getElementById("match-main").textContent = data.main;
  document.getElementById("match-why").textContent = data.why;
  document.getElementById("match-collect").textContent = data.collect;
  document.getElementById("match-share").textContent = data.share;

  flash(document.getElementById("match-result"));
}

document.querySelectorAll(".mood-btn").forEach((button) => {
  button.addEventListener("click", () => updateMood(button.dataset.mood));
});

async function copyToClipboard(text, button, originalText) {
  try {
    await navigator.clipboard.writeText(text);
    if (button) {
      button.textContent = "已複製！";
      setTimeout(() => {
        button.textContent = originalText;
      }, 1300);
    }
    showToast("已複製，可以貼到限動或訊息裡 ♡");
  } catch (error) {
    showToast("目前瀏覽器不支援自動複製，請手動複製文字。");
  }
}

const copyProductBtn = document.getElementById("copyProductBtn");
if (copyProductBtn) {
  copyProductBtn.addEventListener("click", () => {
    copyToClipboard(productData[currentProduct].share, copyProductBtn, "複製分享文案");
  });
}

const wishlistBtn = document.getElementById("wishlistBtn");
if (wishlistBtn) {
  wishlistBtn.addEventListener("click", () => showToast("已加入概念收藏清單 ♡"));
}

const copyMatchBtn = document.getElementById("copyMatchBtn");
if (copyMatchBtn) {
  copyMatchBtn.addEventListener("click", () => {
    copyToClipboard(moodData[currentMood].share, copyMatchBtn, "複製分享文字");
  });
}

const exploreBtn = document.getElementById("exploreBtn");
if (exploreBtn) {
  exploreBtn.addEventListener("click", () => {
    const productKey = moodData[currentMood].product;
    updateProduct(productKey, false);
    scrollToHash("#products");
  });
}

document.querySelectorAll(".toast-trigger").forEach((button) => {
  button.addEventListener("click", () => {
    showToast(button.dataset.toast || "Concept demo");
  });
});

updateProduct(currentProduct);
updateMood(currentMood);
