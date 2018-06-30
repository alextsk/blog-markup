import $ from 'jquery'
import Glide from '@glidejs/glide'
import slick from 'slick-carousel'
import '../components/components.js'

if ($(".glide").length) {
  new Glide('.glide', {
  type: 'carousel',
  startAt: 0,
  perView: 5
  }).mount()
}

if ($('.js-carousel__list').length) {
  $('.js-carousel__list').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    centerMode: true,
    prevArrow: $(".carousel__controls .arrow-button--left"),
    nextArrow: $(".carousel__controls .arrow-button--right")
  });
}

const img = $(".js-big-image > img")
var prevTarget = null
var target = null

$(".photos__item")
.click( evt => {
  activate($(evt.currentTarget), prevTarget)
})

activate($($(".photos__item")[0]))

function activate(target) {
  img.attr('src', target.data("image"))
  if (prevTarget) prevTarget.removeClass("active") 
  target.addClass("active")
  prevTarget = target
}

$(".arrow-button--left")
.click(() => {
  activate(prevTarget.prev().length ? prevTarget.prev() : $(".photos__item").last())
})

$(".arrow-button--right")
.click(() => activate(prevTarget.next().length ? prevTarget.next() : $(".photos__item").first()))
