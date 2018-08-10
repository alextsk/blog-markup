import $ from "jquery"
import datepickerFactory from 'jquery-datepicker';

datepickerFactory($);

$(function() {
  let currentDate = null
  const head = $(".calendar__head")
  const footer = $(".calendar__footer")
  const today = $(".js-calendar-today")
  var calendar = $('.js-calendar').datepicker({
    prevText: '<svg  style="width:100%; height:100%" viewBox="0 0 30 30" transform="rotate(180.1)">' + $(".arrow-icon").html() + "</svg>",
    nextText: '<svg style="width:100%; height:100%" viewBox="0 0 30 30">' + $(".arrow-icon").html() + "</svg>",
    firstDay: 1,
    showOtherMonths: true,
    dayNamesMin: [ "sun", "mon", "tue", "wed", "thu", "fri", "sat" ],
    onSelect: setHeader
  });

  calendar.prepend(head)
  calendar.append(footer)
  setTodayDate()

  today.click(setTodayDate)

  function setTodayDate() {
    calendar.datepicker( "setDate", new Date() )
    let date = calendar.datepicker( "getDate" );
    head.html(date.getDate())
  }

  function setHeader(date) { // date === "mm/dd/yyyy"
    [ ,currentDate, ] = date.split('/')
    head.html(currentDate)
  }
});

