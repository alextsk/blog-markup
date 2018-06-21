import $ from 'jquery'


$(() => {
  const $mediaPlayer = $('.video__actual');
  const mediaPlayer = $mediaPlayer[0]
  const progressBar = $('.js-video__progress-bar');
  const progressPosition = $('.js-video__progress-position');
  const fullscreenButton = $('.js-video__fullscreen');
  const playButton = $(".js-video__play-pause-button")
  const icons = $(".js-video__pp-icon")
  mediaPlayer.controls = false;
  
  $mediaPlayer.on('timeupdate', updateProgressBar)
  playButton.click(togglePlayPause)
  progressBar.click(setVideoTime)
  fullscreenButton.click(() => setFullscreen(mediaPlayer))

  function setVideoTime(evt) {
    const ratio = evt.offsetX / progressBar.width()
    mediaPlayer.currentTime = ratio * mediaPlayer.duration
    updateProgressBar()
  }

  function updateProgressBar() {
    const percentage = Math.floor((100 / mediaPlayer.duration) * mediaPlayer.currentTime);
    progressPosition.css({width: percentage + '%'});
  }
  
  function togglePlayPause() {
    icons.toggleClass('hidden');
    if (mediaPlayer.paused || mediaPlayer.ended) {
      mediaPlayer.play();
    }
    else {
      mediaPlayer.pause();
    }
  }

  function setFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }
   
})

