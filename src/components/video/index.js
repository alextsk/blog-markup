import $ from 'jquery'


$(() => {
  const $mediaPlayer = $('.video__actual');
  const mediaPlayer = $mediaPlayer[0]
  $mediaPlayer.on('timeupdate', updateProgressBar)
  var progressBar = $('.js-video__progress-bar');
  var progressPosition = $('.js-video__progress-position');
  var fullscreenButton = $('.js-video__fullscreen');
  var playButton = $(".js-video__play-pause-button")
  var icons = $(".js-video__pp-icon")
  mediaPlayer.controls = false;
  playButton.click(togglePlayPause)
  progressBar.click(setVideoTime)
  fullscreenButton.click(() => setFullscreen(mediaPlayer))

  function setVideoTime(evt) {
    const ratio = evt.offsetX / progressBar.width()
    mediaPlayer.currentTime = ratio * mediaPlayer.duration
    updateProgressBar()
  }

  function updateProgressBar() {
    var percentage = Math.floor((100 / mediaPlayer.duration) *
    mediaPlayer.currentTime);
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

