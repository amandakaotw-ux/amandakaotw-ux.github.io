# Cinderella × Uber AI

🌙 **The Impossible Mission Reimagined** — 一個現代灰姑娘的故事，科技讓午夜不再是截止時間。

![Cinderella × Uber AI](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-Creative%20Commons-blue)

---

## 🎯 項目概述

這是一個完整的品牌敘事項目，用互動式網頁重新詮釋灰姑娘的故事。

### ✨ 核心概念
- **故事**: 在 AI 時代，午夜不再是魔法失效的時刻
- **品牌**: Uber AI 讓女性從時間焦慮中解放
- **格式**: GitHub Pages 靜態網站 + 互動體驗
- **語言**: 中文 + English (雙語)

---

## 🚀 快速開始

### 選項 1: 直接預覽 (本地)

```bash
# 克隆此倉庫
git clone https://github.com/YOUR-USERNAME/Cinderella-Uber-AI.git
cd Cinderella-Uber-AI

# 用瀏覽器打開
open index.html
# 或在 Windows
start index.html
# 或在 Linux
xdg-open index.html
```

### 選項 2: 部署到 GitHub Pages

1. **建立 GitHub 倉庫**
   - 登入 GitHub
   - 新建倉庫，名稱: `Cinderella-Uber-AI`
   - 設為 **Public**

2. **推送代碼**
   ```bash
   git add .
   git commit -m "Initial commit: Cinderella × Uber AI website"
   git push -u origin main
   ```

3. **啟用 GitHub Pages**
   - 進入 Repository → Settings → Pages
   - Source: `Deploy from a branch`
   - Branch: `main` / `/ (root)`
   - 保存

4. **訪問你的網站**
   ```
   https://YOUR-USERNAME.github.io/Cinderella-Uber-AI
   ```

---

## 📁 項目結構

```
Cinderella-Uber-AI/
├── index.html              # 主頁面
├── style.css               # 全局樣式
├── script.js               # 交互邏輯
├── README.md               # 本文件
├── .gitignore              # Git 配置
│
├── assets/
│   ├── images/             # 場景圖片位置
│   │   ├── README.md
│   │   └── [待上傳圖片]
│   │
│   └── audio/              # 音頻文件位置
│       ├── README.md
│       └── [待上傳音頻]
│
└── docs/
    ├── SCRIPT-ENGLISH.md   # 英文腳本
    ├── SCRIPT-CHINESE.md   # 中文腳本
    ├── STORYBOARD.md       # 故事板
    └── THEME-CHANT.md      # 主題 Chant
```

---

## 📝 內容

### 故事概述

一個 6 幕的互動式故事，重新講述灰姑娘如何透過 Uber AI 從時間焦慮中解放。

### 核心訊息

🎭 **場景 1**: 灰姑娘的自我介紹  
⏰ **場景 2**: 午夜 11:59 的焦慮  
👩 **場景 3**: 現代女性不需要趕時間  
✨ **場景 4**: Uber AI 成為新魔法  
🚗 **場景 5**: 優雅的旅程  
🌙 **場景 6**: 午夜只是一個數字  

### 主題 Chant

```
No more midnight madness.
No more rushing back.
No more pumpkin anxiety.
Uber AI's got your track.
```

---

## 🎨 技術堆棧

### 前端
- **HTML5** - 語義化結構
- **CSS3** - 響應式設計、動畫、過渡
- **Vanilla JavaScript** - 無依賴、輕量級交互
- **Responsive Design** - 支持手機、平板、桌面

### 部署
- **GitHub Pages** - 免費靜態托管
- **CDN** - 自動邊緣緩存
- **SSL** - 自動 HTTPS

---

## 📋 檔案說明

### 核心文件

#### `index.html`
主頁面，包含:
- 英雄部分 (標題、標語、CTA)
- 互動體驗容器
- 故事內容區域
- 特點卡片

#### `style.css`
全局樣式:
- 深色主題 (#020711, #06162d)
- 金色強調 (#D4AF37)
- 響應式網格布局
- 動畫關鍵幀
- 字幕樣式

#### `script.js`
交互邏輯:
- 故事播放控制
- 字幕同步
- 語言切換 (中/英)
- 音頻管理
- 事件監聽

### 文檔文件

#### `/docs/SCRIPT-ENGLISH.md`
- 完整英文配音腳本
- 312 詞，約 90 秒
- 詳細的表演指引
- 音樂和音效方向

#### `/docs/SCRIPT-CHINESE.md`
- 完整中文配音腳本
- 306 詞，約 90 秒
- 繁體中文，優雅表述
- 與英文配音的情感匹配

#### `/docs/STORYBOARD.md`
- 9 場景視覺指南
- 攝影技術說明
- 動畫描述
- 情感弧線

#### `/docs/THEME-CHANT.md`
- 可記憶的主題歌詞
- 音樂方向
- 雙語版本

---

## 🎬 使用你自己的資源

### 添加場景圖片

1. 準備 6 張橫幅圖片 (16:9 比例)
2. 放入 `assets/images/`
3. 命名為:
   ```
   scene-01.jpg
   scene-02.jpg
   scene-03.jpg
   scene-04.jpg
   scene-05.jpg
   scene-06.jpg
   ```

### 添加配音音頻

1. 準備 MP3 音頻文件 (mono 或 stereo)
2. 放入 `assets/audio/`
3. 命名為:
   ```
   narration.mp3
   ```
4. 在 `script.js` 中更新時間軸

### 時間軸配置

在 `script.js` 中找到 `const scenes` 數組，調整每場景的 `start` 和 `end` 時間:

```javascript
const scenes = [
  {
    scene: 1,
    start: 0,
    end: 7.5,
    title: "The Girl Behind the Story",
    zh: "我是灰姑娘。...",
    en: "I am Cinderella. ..."
  },
  // ... 更多場景
];
```

---

## 🌐 社交媒體

### 分享卡片

網頁包含 Open Graph 元數據用於社交分享:

```html
<meta property="og:title" content="Cinderella × Uber AI">
<meta property="og:description" content="Midnight is just a number.">
<meta property="og:image" content="[hero-image-url]">
```

### 推薦分享文案

```
🌙 Midnight is just a number.
真正懂得生活的現代女性，從來不需要和時間賽跑。

用 Uber AI，午夜只是一個時刻。

#灰姑娘 #UberAI #現代女性 #MidnightReimagined
```

---

## 🔧 自定義選項

### 改變配色

編輯 `style.css` 中的 CSS 變量:

```css
:root {
  --color-dark: #020711;      /* 背景色 */
  --color-primary: #06162d;   /* 主色 */
  --color-accent: #D4AF37;    /* 強調色 */
  --color-cyan: #00D4FF;      /* AI 色 */
}
```

### 改變字體

編輯 `style.css`:

```css
body {
  font-family: 'Your Font', -apple-system, sans-serif;
}
```

### 改變文案

編輯 `index.html` 和 `script.js` 中的文字内容。

---

## ✅ 檢查清單

在發布前確認:

- [ ] 所有 6 張場景圖片已上傳到 `assets/images/`
- [ ] 音頻文件已上傳到 `assets/audio/`
- [ ] `script.js` 中的時間軸已調整
- [ ] 使用自己的品牌文案替換了預設文本
- [ ] 測試了所有交互功能 (播放、暫停、語言切換)
- [ ] 在手機上測試了響應式設計
- [ ] 檢查了所有連結和資源路徑
- [ ] 提交了代碼到 GitHub
- [ ] 啟用了 GitHub Pages
- [ ] 測試了線上網址

---

## 📊 瀏覽器支持

✅ Chrome (最新版)  
✅ Safari (最新版)  
✅ Firefox (最新版)  
✅ Edge (最新版)  
✅ 移動瀏覽器 (iOS Safari, Chrome Mobile)

---

## 📄 許可證

此項目為創意品牌資產。使用前請確認:

- [ ] 您對內容享有完整的智慧財產權
- [ ] 您已獲得所有圖片和音頻的使用授權
- [ ] 商業使用符合相關法律規定

---

## 🤝 貢獻

歡迎提交問題和改進建議！

### 如何貢獻

1. Fork 此倉庫
2. 建立功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

---

## 📞 支持

遇到問題？

1. **檢查 GitHub Issues** - 可能已有解決方案
2. **查看文檔** - `/docs` 文件夾有詳細說明
3. **測試本地版本** - 確認是 GitHub Pages 問題還是本地問題
4. **檢查瀏覽器控制台** - 查看是否有 JavaScript 錯誤

---

## 🎯 下一步

### 短期
- [ ] 上傳場景圖片和音頻
- [ ] 自定義文案和配色
- [ ] 部署到 GitHub Pages
- [ ] 測試和優化

### 中期
- [ ] 添加社交媒體卡片
- [ ] 創建社交媒體版本 (15s, 30s, 60s 剪輯)
- [ ] 添加分析追踪 (Google Analytics)
- [ ] 多語言支持

### 長期
- [ ] 視頻版本
- [ ] 互動遊戲版本
- [ ] AR 體驗
- [ ] 品牌活動擴展

---

## 📈 統計

- ⏱️ 故事長度: ~90 秒
- 🌐 語言: 中文 + English
- 📱 響應式: 是
- ♿ 無障礙: 是
- 🚀 性能: 優化

---

## 🙏 致謝

感謝所有為此項目做出貢獻的人。

---

## 💡 靈感來源

- 經典童話的現代詮釋
- 品牌故事敘述
- 互動網頁體驗
- AI 賦能女性的理念

---

**「不可能的任務？在今天，已經成為可能。」** ✨

---

**最後更新**: 2026 年 7 月  
**版本**: 1.0 Production Ready  
**作者**: Kao Amanda & Claude  

