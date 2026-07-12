# Ready-to-use Prompt for Claude / Codex

```text
Create or refine a complete, production-ready GitHub Pages project titled “Midnight, Reimagined — Cinderella × Uber AI.”

GOAL
Build a cinematic six-scene web story from six supplied images and one MP3 narration. It must feel elegant, premium, modern, and fairy-tale inspired. This is an interactive webpage, not a rendered video.

TECHNICAL CONSTRAINTS
- Use only HTML, CSS, and vanilla JavaScript.
- No backend, build step, framework, or external dependency.
- It must work when hosted from a GitHub Pages project subdirectory.
- All asset paths must be relative.
- Responsive on desktop, tablet, and mobile.
- Playback starts only after the user presses a Start button, so browser audio policies are respected.
- Include mute/unmute, skip, and replay controls.
- Respect prefers-reduced-motion.

ASSETS
- assets/images/scene-01.jpg through scene-06.jpg
- assets/audio/narration.mp3
- If an image or MP3 is missing, show an elegant numbered fallback and allow a silent timed preview instead of breaking.

PLAYBACK
- Use the MP3 currentTime as the master clock.
- Store each scene’s start time, end time, image, Chinese subtitle, English subtitle, and motion class in a JavaScript data array.
- Current MP3 duration is approximately 34.873 seconds. Current timing: 0–7.4, 7.4–13.3, 13.3–18.3, 18.3–23.6, 23.6–31.1, 31.1–34.873 seconds.
- Make these values easy to edit after the final MP3 timing is measured.
- Fade to the ending card after the final scene or audio end.

SUBTITLES
Show Traditional Chinese above and English below. Keep both centered near the bottom and readable over all images.

1. 中文：我是灰姑娘。你一定聽過許多關於我的故事，但其實，我從來不是故意把玻璃鞋留在舞會裡。
   English: I am Cinderella. You've probably heard many stories about me, but honestly, I never meant to leave my glass slipper behind.

2. 中文：在童話裡，大家都相信，午夜十二點，就是優雅的終點。
   English: After all, in the old fairy tales, everyone believed midnight was the deadline for elegance.

3. 中文：但你不知道的是，真正懂得生活的現代女性，從來不需要和時間賽跑。
   English: But what you don't know is, a smart modern woman never races against the clock.

4. 中文：讓優雅不因時間而停止的魔法，其實，就藏在 Uber App 裡。
   English: The real magic that keeps elegance everlasting is right inside the Uber app.

5. 中文：只要輕輕一按，它就能為我安排一趟從容、舒適又尊榮的旅程。至於南瓜馬車，現在就安心待在花園裡，成為最美的裝飾。
   English: With one tap, it summons a seamless premium ride for me. The fairy-tale pumpkin carriage can now remain a beautiful ornament in the garden.

6. 中文：午夜，只是一個時間。真正重要的是，每一次出發，都能優雅從容。
   English: Midnight is just a number. May every journey begin effortlessly and gracefully.

SCENE MOTION
- Scene 1: slow Ken Burns zoom in, fade in, floating dust, soft side light.
- Scene 2: slow camera pan left, subtle vignette, clock-focused tension.
- Scene 3: Ken Burns zoom out, cool-to-warm lighting shift, fine particles.
- Scene 4: camera pan right, app glow, digital particles, route-like moving light.
- Scene 5: slow zoom in, car headlight bloom, gold glow, premium crossfade.
- Scene 6: slow pan left, moving window lights, particles fade, fade to black.
- Transitions must be smooth and restrained; avoid flashy effects.

ENDING
Display:
“午夜，只是一個時間。”
“Midnight is just a number.”
“True elegance never needs to rush.”
Then show a Replay button.

DELIVERABLES
- index.html
- style.css
- script.js
- README.md with asset replacement, timing-edit, and GitHub Pages instructions
- PROJECT-BRIEF.md with the six-scene storyboard
- Keep the project ready to upload directly to GitHub Pages.

Before finishing, verify that all controls work, missing assets fail gracefully, the six scenes advance in order, bilingual subtitles match each scene, and no absolute/local filesystem paths remain.
```
