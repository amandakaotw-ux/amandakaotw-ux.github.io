const scenes = [
  {image:'assets/images/scene-01.jpg',start:0,end:7.7,motion:'ken-burns-in-slow',zh:'我是灰姑娘。你大概聽過許多關於我的傳聞，但老實說，我並不是故意把玻璃鞋掉在舞會上的。',en:"I am Cinderella. You’ve probably heard many rumors about me, but honestly, I didn't mean to lose my slipper at the ball on purpose."},
  {image:'assets/images/scene-02.jpg',start:7.7,end:14,motion:'pan-left',zh:'畢竟，在古老的故事裡，大家都相信晚上十一點五十九分的鐘聲，就是我維持優雅的最後期限。',en:'After all, in the old stories, everyone believed that the 11:59 PM chime was the hard deadline for my elegance.'},
  {image:'assets/images/scene-03.jpg',start:14,end:19,motion:'ken-burns-out-slow',zh:'但你不知道的是，一位聰明的現代女性，從來不需要和時間賽跑。',en:"But what you don't know is that a smart modern woman never races against the clock."},
  {image:'assets/images/scene-04.jpg',start:19,end:23.8,motion:'pan-right',zh:'是的，讓優雅永恆延續的秘密魔法，就藏在這個 Uber App 裡。',en:'Yes, the secret magic to keeping the elegance everlasting is right inside this Uber app.'},
  {image:'assets/images/scene-05.jpg',start:23.8,end:31.6,motion:'ken-burns-in-slow',zh:'無論何時，它都能為我召來一趟流暢、尊榮的旅程，讓童話裡的南瓜安心留在花園中，成為美麗的裝飾。',en:'It summons a seamless, premium journey for me at any moment, leaving the fairy-tale pumpkin as a beautiful ornament in the garden.'},
  {image:'assets/images/scene-06.jpg',start:31.6,end:34.873,motion:'pan-left-slow',zh:'午夜，只是一個數字。願你的每一次出發，都輕鬆而寧靜。',en:'Midnight is just a number. May your every departure be effortless and serene.'}
];

const $ = id => document.getElementById(id);
const audio=$('narration'), media=$('sceneMedia'), image=$('sceneImage');
let current=-1, fallbackTimer=null, silentTimer=null, silentStarted=0, muted=false, playbackStarted=false;

function showScene(index){
  if(index===current||index<0||index>=scenes.length)return;
  current=index; const scene=scenes[index];
  clearTimeout(fallbackTimer); image.classList.remove('loaded');
  media.className='scene-media'; void media.offsetWidth; media.classList.add(scene.motion);
  media.style.setProperty('--scene-duration',`${scene.end-scene.start}s`);
  $('fallback').hidden=false; $('fallbackNumber').textContent=String(index+1).padStart(2,'0');
  image.alt=`Cinderella × Uber AI scene ${index+1}`; image.src=scene.image;
  image.onload=()=>{image.classList.add('loaded');fallbackTimer=setTimeout(()=>$('fallback').hidden=true,350)};
  image.onerror=()=>{$('fallback').hidden=false};
  $('sceneNumber').textContent=String(index+1).padStart(2,'0');
  $('subtitleZh').textContent=scene.zh; $('subtitleEn').textContent=scene.en;
  const subs=document.querySelector('.subtitles');subs.style.animation='none';void subs.offsetWidth;subs.style.animation='';
}
function atTime(time){
  const index=scenes.findIndex(s=>time>=s.start&&time<s.end);
  if(index>=0)showScene(index);
  $('progressBar').style.width=`${Math.min(100,time/scenes.at(-1).end*100)}%`;
  if(time>=scenes.at(-1).end)showScene(scenes.length-1);
}
function tick(){
  if(audio.dataset.available==='true') atTime(audio.currentTime);
  else { const t=(performance.now()-silentStarted)/1000; atTime(t); if(t<scenes.at(-1).end)silentTimer=requestAnimationFrame(tick);else setTimeout(finish,1200); }
}
function startSilentPreview(){
  audio.dataset.available='false';silentStarted=performance.now();tick();
}
async function playAudio(){
  audio.volume=1;audio.muted=false;muted=false;$('soundButton').textContent='声音 ON';
  try{
    await audio.play();audio.dataset.available='true';$('audioRetry').hidden=true;tick();return true;
  }catch(error){
    audio.dataset.available='false';$('audioRetry').hidden=false;$('soundButton').textContent='声音需要开启';return false;
  }
}
async function start(){
  $('intro').hidden=true;$('ending').hidden=true;$('stage').hidden=false;current=-1;
  cancelAnimationFrame(silentTimer);audio.pause();audio.currentTime=0;audio.load();playbackStarted=true;
  showScene(0);$('progressBar').style.width='0%';
  /* Prime audio during the button click, then allow the first image to settle before narration. */
  try{audio.volume=0;await audio.play();audio.pause();audio.currentTime=0}catch{}
  await new Promise(resolve=>setTimeout(resolve,1100));
  await playAudio();
}
function finish(){cancelAnimationFrame(silentTimer);audio.pause();$('stage').hidden=true;$('ending').hidden=false}
audio.addEventListener('timeupdate',()=>{if(audio.dataset.available==='true')atTime(audio.currentTime)});
audio.addEventListener('ended',()=>{showScene(5);$('progressBar').style.width='100%';setTimeout(finish,1200)});
$('startButton').addEventListener('click',start);$('replayButton').addEventListener('click',start);$('skipButton').addEventListener('click',finish);
$('audioRetry').addEventListener('click',async()=>{if(!await playAudio())startSilentPreview()});
$('soundButton').addEventListener('click',()=>{muted=!muted;audio.muted=muted;$('soundButton').textContent=muted?'聲音 OFF':'聲音 ON'});
audio.addEventListener('error',()=>{if(playbackStarted){$('audioRetry').hidden=false;$('audioRetry').innerHTML='音讯无法读取，请重新整理页面<span>Audio could not load · Refresh page</span>'}});
