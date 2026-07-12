# Cinderella × Uber AI — GitHub Pages 專案

一個以 6 張圖片和 1 段旁白組成的電影感互動故事。觀眾按下「開始故事」後，畫面依序播放，中文字幕在上、英文字幕在下，並以 MP3 時間軸同步。

## 使用方式

1. 將六張橫式圖片依序命名為 `scene-01.jpg` 至 `scene-06.jpg`，放入 `assets/images/`。
2. 將旁白命名為 `narration.mp3`，放入 `assets/audio/`。
3. 本次 MP3 實測約為 34.873 秒，`script.js` 已依六段旁白長度設定各幕時間；若日後更換旁白，再調整每一幕的 `start` 與 `end` 秒數。
4. 直接開啟 `index.html` 預覽，或把整個資料夾推送到 GitHub。
5. 在 GitHub repository 的 **Settings → Pages**，選擇 **Deploy from a branch**、`main`、`/ (root)` 後儲存。

素材尚未放入時，網站會顯示場景編號預留畫面，並用預設秒數自動播放，方便先檢查版面和動畫。

## 專案結構

```text
cinderella-uber-ai/
├── index.html                 # 網頁內容與播放器
├── style.css                  # 電影感視覺、字幕與動畫
├── script.js                  # 場景、雙語字幕與 MP3 同步
├── PROJECT-BRIEF.md           # 專案簡報與完整故事板
├── CLAUDE-CODEX-PROMPT.md     # 可交給 Claude / Codex 的需求文件
├── README.md                  # 安裝與 GitHub Pages 說明
└── assets/
    ├── images/
    │   └── README.md          # 六張圖的命名規則
    └── audio/
        └── README.md          # MP3 的命名規則
```

## 同步說明

`script.js` 內的時間皆為秒。`start` 是字幕與畫面出現時間，`end` 是下一幕切換時間。網站優先跟隨 MP3 的 `currentTime`；如果 MP3 尚未放入，則自動使用同一組時間作為無聲預覽。

## 版權與品牌提醒

本專案為概念作品。公開或商業使用前，請確認圖片、音訊、Cinderella 角色詮釋及 Uber 商標的使用授權；本專案不代表 Uber 官方合作或背書。
