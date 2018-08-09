import $ from "jquery"
import datepickerFactory from 'jquery-datepicker';

datepickerFactory($);

$(function() {
  let currentDate = null
  const head = $(".calendar__head")
  const footer = $(".calendar__footer")
  const today = $(".js-calendar-today")
  var calendar = $('.datepicker').datepicker({
    prevText: '<svg width=16 height=25 transform="rotate(180.1)">' + $(".arrow-icon").html() + "</svg>",
    nextText: '<svg width=16 height=25>' + $(".arrow-icon").html() + "</svg>",
    firstDay: 1,
    showOtherMonths: true,
    onSelect: function(date) { // date === "mm/dd/yyyy"
      [ ,currentDate, ] = date.split('/')
      head.html(currentDate)
    }
  });
  calendar.prepend(head)
  calendar.append(footer)
  currentDate = calendar.datepicker( "getDate" );
  today.click(() => console.log(calendar.datepicker( "setDate", "10/12/2018" )))

});

