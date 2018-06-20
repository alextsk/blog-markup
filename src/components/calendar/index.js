import $ from "jquery"
import datepickerFactory from 'jquery-datepicker';

datepickerFactory($);

$(function() {
  const head = $(".calendar__head")
  const footer = $(".calendar__footer")
  var calendar = $('.datepicker').datepicker({
    prevText: '<svg width=16 height=25 transform="rotate(180.1)">' + $(".arrow-icon").html() + "</svg>",
    nextText: '<svg width=16 height=25>' + $(".arrow-icon").html() + "</svg>",
    firstDay: 1,
    showOtherMonths: true,
    onSelect: function(date) { // date === "mm/dd/yyyy"
      //var currentDate = calendar.datepicker( "getDate" ).getDate();
      var currentDate = date.split('/')[1]
      head.html(currentDate)
    }
  });
  calendar.prepend(head)
  calendar.append(footer)
  var currentDate = calendar.datepicker( "getDate" );
});

