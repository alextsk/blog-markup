import $ from 'jquery'

class Video {
  constructor(element) {
    this.$mediaPlayer = $(element).find('.js-video__actual');
    this.mediaPlayer = this.$mediaPlayer[0]
    this.progressBar = $(element).find('.js-video__progress-bar');
    this.progressPosition = $(element).find('.js-video__progress-position');
    this.fullscreenButton = $(element).find('.js-video__fullscreen');
    this.playButton = $(element).find(".js-video__play-pause-button")
    this.icons = $(element).find(".js-video__pp-icon")
    this.mediaPlayer.controls = false;
    
    this.$mediaPlayer.on('timeupdate', this.updateProgressBar(this.mediaPlayer, this.progressPosition).bind(this))
    this.playButton.click(this.togglePlayPause(this.icons, this.mediaPlayer).bind(this))
    this.progressBar.click(this.setVideoTime(this.mediaPlayer, this.progressBar, this.progressPosition).bind(this))
    this.fullscreenButton.click(() => this.setFullscreen(this.mediaPlayer).bind(this))
  }

  updateProgressBar(mediaPlayer, progressPosition) {
    return function handler() {
      const percentage = Math.floor((100 / mediaPlayer.duration) * mediaPlayer.currentTime);
      progressPosition.css({width: percentage + '%'});
    }
  }

  setVideoTime(mediaPlayer, progressBar, progressPosition) {
    return function handler(evt) {
      const ratio = evt.offsetX / progressBar.width()
      const mPlayer = mediaPlayer;
      mPlayer.currentTime = ratio * mediaPlayer.duration
      this.updateProgressBar(mediaPlayer, progressPosition)()
    }
  }
  
  togglePlayPause(icons, mediaPlayer) {
    return function handler() {
      if (mediaPlayer.paused || mediaPlayer.ended) {
        mediaPlayer
        .play()
        .then(() => icons.toggleClass('video__pause-icon--hidden '));
      } else {
        mediaPlayer.pause()
        icons.toggleClass('video__pause-icon--hidden ');
      }
    }
  }

  setFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }
}

$('.js-video').each( (ind, element) => new Video(element) )
