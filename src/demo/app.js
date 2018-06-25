import $ from 'jquery'
import Glide from '@glidejs/glide'
import slick from 'slick-carousel'
import '../components/video'

 new Glide('.glide', {
  type: 'carousel',
  startAt: 0,
  perView: 5
}).mount()

 $('.js-carousel__list').slick({
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 5,
  centerMode: true,
  prevArrow:$(".carousel__controls .arrow-button--left"),
  nextArrow:$(".carousel__controls .arrow-button--right")
});