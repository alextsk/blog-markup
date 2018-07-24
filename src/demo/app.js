import $ from 'jquery'
import '../components/components.js'

const img = $(".js-big-image__actual")
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
