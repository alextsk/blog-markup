/* eslint prefer-destructuring:0 */
import $ from 'jquery';
import datepickerFactory from 'jquery-datepicker';

class Calendar {
  constructor(element) {
    datepickerFactory($);
    this.currentDate = null;
    this.head = $(element).find('.js-calendar__head');
    this.today = $(element).find('.js-calendar__today');
    this.calendar = $(element).datepicker({
      prevText: `<svg  style="width:100%; height:100%" viewBox="0 0 30 30" transform="rotate(180.1)"> ${$('.arrow-icon').html()}</svg>`,
      nextText: `<svg style="width:100%; height:100%" viewBox="0 0 30 30"> ${$('.arrow-icon').html()}</svg>`,
      firstDay: 1,
      showOtherMonths: true,
      dayNamesMin: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
      onSelect: this.setHeader.bind(this),
    });
    this.calendar.prepend(this.head);
    this.calendar.append(this.today);
    this.setTodayDate();
    this.today.click(this.setTodayDate.bind(this));
  }

  setTodayDate() {
    this.calendar.datepicker('setDate', new Date());
    const date = this.calendar.datepicker('getDate');
    this.head.html(date.getDate());
  }

  setHeader(date) { // date === "mm/dd/yyyy"
    this.currentDate = date.split('/')[1];
    this.head.html(this.currentDate);
  }
}

$('.js-calendar').each((index, element) => new Calendar(element));

