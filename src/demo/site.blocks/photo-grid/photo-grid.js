import $ from 'jquery'

const img = $(".js-photo-grid__image-actual")
let prevTarget = null

function activate(target) {
  img.attr('src', target.data("image"))
  if (prevTarget) prevTarget.removeClass("active") 
  target.addClass("active")
  prevTarget = target
}

var imageList = $(".js-photo-grid__list > .photo-grid__item")
imageList.click( evt => {
  activate($(evt.currentTarget), prevTarget)
})

$(".arrow-button--left")
.click(() => {
  activate(prevTarget.prev().length ? prevTarget.prev() : imageList.last())
})

$(".arrow-button--right")
.click(() => activate(prevTarget.next().length ? prevTarget.next() : imageList.first()))

activate($(imageList[0]))
