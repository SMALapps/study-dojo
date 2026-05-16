let gongInstance = null;

function getGong() {
  if (!gongInstance) {
    gongInstance = new Audio('/gong.mp3');
    gongInstance.preload = 'auto';
    gongInstance.volume  = 0.8;
    console.log('Gong audio created');
  }
  return gongInstance;
}

export function unlockGongAudio() {
  console.log('Unlocking gong audio');
  const gong = getGong();
  gong.muted  = true;
  gong.volume = 0;
  gong.play()
    .then(() => {
      gong.pause();
      gong.currentTime = 0;
      gong.muted       = false;
      gong.volume      = 0.8;
      console.log('Gong audio unlocked');
    })
    .catch(e => console.warn('Gong unlock failed', e));
}

export function playGong() {
  console.log('Attempting gong playback');
  const gong = getGong();
  gong.currentTime = 0;
  gong.muted       = false;
  gong.volume      = 0.8;
  gong.play()
    .then(() => console.log('Gong playback started'))
    .catch(e => console.warn('Gong playback failed', e));
}
