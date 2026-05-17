let gongInstance = null;

function getGong() {
  if (!gongInstance) {
    gongInstance = new Audio('/gong.mp3');
    gongInstance.preload = 'auto';
    gongInstance.volume  = 0.8;
  }
  return gongInstance;
}

export function unlockGongAudio() {
  const gong = getGong();
  gong.muted  = true;
  gong.volume = 0;
  gong.play()
    .then(() => {
      gong.pause();
      gong.currentTime = 0;
      gong.muted       = false;
      gong.volume      = 0.8;
    })
    .catch(e => console.warn('Gong unlock failed', e));
}

export function playGong() {
  const gong = getGong();
  gong.currentTime = 0;
  gong.muted       = false;
  gong.volume      = 0.8;
  gong.play()
    .catch(e => console.warn('Gong playback failed', e));
}
