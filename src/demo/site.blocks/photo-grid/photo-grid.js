import $ from 'jquery'

class PhotoGrid {
  constructor(element) {
    this.prevTarget = null
    this.imageList = $(element).find(".js-photo-grid__item")
    this.bigImage =$(element).find(".js-photo-grid__image-actual")  
    this.leftControl = $(".js-photo-grid__control--left")
    this.rightControl = $(".js-photo-grid__control--right")

    this.imageList.click(this.loadImage.bind(this))
    this.leftControl.click(this.stepLeft.bind(this))
    this.rightControl.click(this.stepRight.bind(this))

    this.activate( $(this.imageList[0]) )
  }

  loadImage(evt) {
    this.activate($(evt.currentTarget))
  }

  stepRight(evt) {
    this.activate( this.prevTarget.next().length ? this.prevTarget.next() : this.imageList.first() )
  }

  stepLeft(evt) {
    this.activate( this.prevTarget.prev().length ? this.prevTarget.prev() : this.imageList.last() )
  }

  activate(target) {
    this.bigImage.attr('src', target.data("image"))
    if (this.prevTarget) this.prevTarget.removeClass("active") 
    target.addClass("active")
    this.prevTarget = target
  } 
}

$('.js-photo-grid').each((index, element) => new PhotoGrid(element))



