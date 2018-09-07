/* eslint comma-dangle:0 */
import $ from 'jquery'

class Video {
  constructor(element) {
    this.$mediaPlayer = $(element).find('.js-video__actual');
    this.mediaPlayer = this.$mediaPlayer[0];
    this.progressBar = $(element).find('.js-video__progress-bar');
    this.progressPosition = $(element).find('.js-video__progress-position');
    this.fullscreenButton = $(element).find('.js-video__fullscreen');
    this.playButton = $(element).find('.js-video__play-pause-button');
    this.icons = $(element).find('.js-video__pp-icon');
    this.mediaPlayer.controls = false;

    this.$mediaPlayer.on('timeupdate', this.updateProgressBar.bind(this));
    this.playButton.click(this.togglePlayPause.bind(this));
    this.progressBar.click(
      this.setVideoTime.bind(this)
    );
    this.fullscreenButton.click(this.setFullscreen.bind(this));
  }

  updateProgressBar() {
    const percentage = Math.floor(
      (100 / this.mediaPlayer.duration) * this.mediaPlayer.currentTime
    );
    this.progressPosition.css({ width: `${percentage}%` });
  }

  setVideoTime(evt) {
    const ratio = evt.offsetX / this.progressBar.width();
    this.mediaPlayer.currentTime = ratio * this.mediaPlayer.duration;
    this.updateProgressBar.bind(this);
  }

  togglePlayPause() {
    if (this.mediaPlayer.paused || this.mediaPlayer.ended) {
      this.mediaPlayer
        .play()
        .then(() => this.icons.toggleClass('video__pause-icon--hidden '));
    } else {
      this.mediaPlayer.pause();
      this.icons.toggleClass('video__pause-icon--hidden ');
    }
  }

  setFullscreen() {
    const elem = this.mediaPlayer;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }
}

$('.js-video').each((ind, element) => new Video(element));
