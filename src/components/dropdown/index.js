import $ from "jquery"

class Dropdown {
  constructor(element) {
    this.element = $(element);
    this.dropdownButton = this.element.find(".js-dropdown__button");
    this.dropdownItems = this.element.find(".js-dropdown__item");
    this.input = this.element.find(".dropdown__actual");
    this.dropdownButton.click(this.toggleDropdown.bind(this))
    this.dropdownItems.click(this.selectItem.bind(this))
  }
  
  toggleDropdown() {
    this.element.toggleClass("dropdown--open");
  }

  selectItem(event) {
    let item = event.currentTarget
    this.element.removeClass("dropdown--open")
    this.input.val($(item).text())
  }

}

$(".js-dropdown").each((i,el) => new Dropdown(el))
