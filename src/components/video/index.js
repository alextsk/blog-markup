import $ from 'jquery'


$(() => {
  const uniq = () => Math.floor(Math.random() * 10000)
  const videos = $('.video')
  videos.each((ind, video) => {
    console.log(video);
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


  function setVideoTime(mediaPlayer, progressBar, progressPosition) {
    return function (evt) {
      const ratio = evt.offsetX / progressBar.width()
      mediaPlayer.currentTime = ratio * mediaPlayer.duration
      updateProgressBar(mediaPlayer, progressPosition)()
    }
  }

  function updateProgressBar(mediaPlayer, progressPosition) {
    return function(){
      const percentage = Math.floor((100 / mediaPlayer.duration) * mediaPlayer.currentTime);
      progressPosition.css({width: percentage + '%'});
    }
  }
  
  function togglePlayPause(icons, mediaPlayer) {
    return function() {

      if (mediaPlayer.paused || mediaPlayer.ended) {
        var playPromise = mediaPlayer.play().then(() => icons.toggleClass('hidden'));
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
   
})

