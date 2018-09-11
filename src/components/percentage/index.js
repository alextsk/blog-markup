import $ from 'jquery';
import createSVGDoughnut from 'create-svg-doughnut';

class Percentage {
  constructor(element) {
    this.element = element;
    this.node = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    const segments = $(element).data('chart-segments');
    const innerRadius = +$(element).data('chart-inner-radius');
    const outerRadius = +$(element).data('chart-outer-radius');
    const vals = segments.map(seg => +seg[0]);
    const pals = segments.map(seg => seg[1]);
    this.doughnut = createSVGDoughnut(vals, outerRadius, innerRadius, pals);
    this.addText();
    element.appendChild(this.doughnut);
  }

  addText() {
    const chartText = $(this.element).data('chart-text').toString() || '';
    const svgText = this.createSvgNode({
      x: 47, y: 60, class: 'percentage__text-in-circle', 'text-anchor': 'middle',
    });
    const textNode = document.createTextNode(chartText);
    svgText.appendChild(textNode);
    this.doughnut.appendChild(svgText);
  }

  createSvgNode(nodeAttributes) {
    Object.keys(nodeAttributes)
      .forEach(attribute => this.node.setAttributeNS(null, attribute, nodeAttributes[attribute]));
    return this.node;
  }
}

$(document).ready(() => {
  $('.percentage').each((i, element) => new Percentage(element));
});
