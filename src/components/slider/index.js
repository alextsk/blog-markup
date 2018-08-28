import $ from "jquery"
import noUiSlider from "nouislider"


class Slider {
  constructor(element) {
    const maxValue = $(element).data('max-value');
    const parts = $(element).data('parts');

    noUiSlider.create(element, {
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
      var pips = $(element).find('.noUi-value');
      pips.each((index, pip) => $(pip).click((event) => this.clickOnPip(element, event)))
    }
  }

  clickOnPip (el, event) {
    var value = Number(event.currentTarget.getAttribute('data-value'));
    el.noUiSlider.set(value);
  }
}


 $('.js-slider').each((i, element) => new Slider(element));
