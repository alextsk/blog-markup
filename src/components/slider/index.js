import $ from 'jquery';
import noUiSlider from 'nouislider';

class Slider {
  constructor(element) {
    this.element = element;
    const maxValue = $(element).data('max-value');
    const parts = $(element).data('parts');
    noUiSlider.create(element, {
      range: {
        min: 0,
        max: maxValue,
      },
      tooltips: [ !parts ],
      start: [Math.floor(maxValue / 2)],
      step: parts ? Math.floor(maxValue / (parts - 1)) : 1,
      format: {
        to: value => Math.floor(value),
        from: value => Math.floor(value),
      },
      pips: parts > 2 ? { mode: 'count', values: parts } : undefined,
    });
    if (parts) {
      const pips = $(element).find('.noUi-value');
      pips.each((index, pip) => $(pip).click(event => this.clickOnPip(element, event)));
    }
  }

  clickOnPip(el, event) {
    const value = Number(event.currentTarget.getAttribute('data-value'));
    this.element.noUiSlider.set(value);
  }
}

$('.js-slider').each((i, element) => new Slider(element));
