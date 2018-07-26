import $ from "jquery"
import noUiSlider from "nouislider"

console.log(noUiSlider)

var sliders = $('.slider');

sliders.each((i, el) => { 
  const maxValue = $(el).data('max-value');
  const parts = $(el).data('parts');

  noUiSlider.create(el, {
      range: {
          min: 0,
          max: maxValue
      },
      tooltips: [ true ],
      start: [ Math.floor(maxValue / 2) ],
      step: parts ? Math.floor(maxValue / (parts - 1)) : undefined,
      pips: parts > 2 ? { mode: 'count', values: parts  } : undefined
  })

  if (parts) {
    var pips = el.querySelectorAll('.noUi-value');
    function clickOnPip ( ) {
      var value = Number(this.getAttribute('data-value'));
      el.noUiSlider.set(value);
    }

    for ( var i = 0; i < pips.length; i++ ) {
      pips[i].addEventListener('click', clickOnPip);
    }
  }
  
  }
)