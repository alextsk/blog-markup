import $ from 'jquery';

class Search {
  constructor(element) {
    this.element = $(element);
    this.searchButton = this.element.find('.js-search__button');
    this.searchMessage = this.element.find('.js-search__message');
    this.searchInput = this.element.find('.js-search__actual');
    this.searchButton.click(this.find.bind(this));
    this.searchMessage.click(this.hideSearchMessage.bind(this));
  }

  find() {
    this.element.addClass('search--failed');
  }
  
  hideSearchMessage() {
    this.element.removeClass("search--failed");
    this.searchInput.focus()
  }
}

$('.js-search').each((index, element) => new Search(element));
