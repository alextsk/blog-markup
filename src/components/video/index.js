import $ from 'jquery'


$(() => {
  const $mediaPlayer = $('.video__actual');
  const mediaPlayer = $mediaPlayer[0]
  $mediaPlayer.on('timeupdate', updateProgressBar)
  var progressBar = $('.js-video__progress-bar');
  var progressPosition = $('.js-video__progress-position');
  var fullscreenButton = $('.js-video__fullscreen');
  var playButton = $("#play-pause-button")
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
    if (mediaPlayer.paused || mediaPlayer.ended) {
      playButton.html('||');
      mediaPlayer.play();
    }
    else {
      playButton.html('>');
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

