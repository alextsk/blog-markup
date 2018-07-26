import $ from 'jquery'


$(() => {
  const videos = $('.video')

  function updateProgressBar(mediaPlayer, progressPosition) {
    return function handler() {
      const percentage = Math.floor((100 / mediaPlayer.duration) * mediaPlayer.currentTime);
      progressPosition.css({width: percentage + '%'});
    }
  }

  function setVideoTime(mediaPlayer, progressBar, progressPosition) {
    return function handler(evt) {
      const ratio = evt.offsetX / progressBar.width()
      const mPlayer = mediaPlayer;
      mPlayer.currentTime = ratio * mediaPlayer.duration
      updateProgressBar(mediaPlayer, progressPosition)()
    }
  }
  
  function togglePlayPause(icons, mediaPlayer) {
    return function handler() {

      if (mediaPlayer.paused || mediaPlayer.ended) {
        mediaPlayer.play()
        .then(() => icons.toggleClass('hidden'));
      }
      else {
        mediaPlayer.pause()
        icons.toggleClass('hidden');
      }
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

  videos.each((ind, video) => {
    const $mediaPlayer = $(video).find('.video__actual');
    const mediaPlayer = $mediaPlayer[0]
    const progressBar = $(video).find('.js-video__progress-bar');
    const progressPosition = $(video).find('.js-video__progress-position');
    const fullscreenButton = $(video).find('.js-video__fullscreen');
    const playButton = $(video).find(".js-video__play-pause-button")
    const icons = $(video).find(".js-video__pp-icon")
    mediaPlayer.controls = false;
    
    $mediaPlayer.on('timeupdate', updateProgressBar(mediaPlayer, progressPosition))
    playButton.click(togglePlayPause(icons, mediaPlayer))
    progressBar.click(setVideoTime(mediaPlayer,progressBar, progressPosition))
    fullscreenButton.click(() => setFullscreen(mediaPlayer))
  })
})

