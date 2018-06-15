import $ from "jquery"


$(".dropdown").each((i,el) => {
  $(el)
  .find(".dropdown__button")
  .click(() => {
    $(el).toggleClass("dropdown--open")
  })
  $(el)
  .find(".dropdown__item")
  .click((e) => {
    var item = e.currentTarget

    $(el).removeClass("dropdown--open")
    $(el).find(".dropdown__actual").val($(item).text())
  })
})