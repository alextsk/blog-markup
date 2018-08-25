import $ from "jquery"
import noUiSlider from "nouislider"

var sliders = $('.slider');

function clickOnPip (el) {
  var value = Number(this.getAttribute('data-value'));
  el.noUiSlider.set(value);
}

sliders.each((i, el) => { 
  const maxValue = $(el).data('max-value');
  const parts = $(el).data('parts');

  noUiSlider.create(el, {
      range: {
          min: 0,
          max: maxValue
      },
      tooltips: [ !parts ],
      start: [ Math.floor(maxValue / 2) ],
      step: parts ? Math.floor(maxValue / (parts - 1)) : 1,
      format: {
        to: value => value | 0,
        from: value => value | 0
      },
      pips: parts > 2 ? { mode: 'count', values: parts  } : undefined
  })

  if (parts) {
    var pips = el.querySelectorAll('.noUi-value');
    for ( var j = 0; j < pips.length; j += 1 ) {
      pips[i].addEventListener('click', () => clickOnPip(el));
    }
  }
  
  }
)