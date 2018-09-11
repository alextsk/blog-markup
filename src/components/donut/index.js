import $ from 'jquery';
import createSVGDoughnut from 'create-svg-doughnut';

class Donut {
  constructor(element) {
    this.node = document.createElementNS("http://www.w3.org/2000/svg", 'text');
    const segments = $(element).data('chart-segments');
    const innerRadius = +$(element).data('chart-inner-radius');
    const outerRadius = +$(element).data('chart-outer-radius');
    const vals = segments.map(seg => +seg[0]);
    const pals = segments.map(seg => seg[1]);
    const doughnut = createSVGDoughnut(vals, outerRadius, innerRadius, pals);
    element.appendChild(doughnut);
  }

  createSvgNode(nodeAttributes) {
    Object.keys(nodeAttributes)
      .forEach(attribute => this.node.setAttributeNS(null, attribute, nodeAttributes[attribute]));
    return this.node;
  }
}

$(document).ready(() => {
  $('.donut').each((i, element) => new Donut(element));
});


