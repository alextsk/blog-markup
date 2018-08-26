import $ from "jquery";
import createSVGDoughnut from './vendor/create-svg-doughnut/src/createSVGDoughnut';


class Chart {
  constructor(element) {
    const segments = $(element).data('chart-segments');
    const innerRadius = +$(element).data('chart-inner-radius');
    const outerRadius = +$(element).data('chart-outer-radius');
    const chartText = $(element).data('chart-text') !== undefined ? $(element).data('chart-text').toString() : '';
    const vals = segments.map( seg => +seg[0] )
    const pals = segments.map( seg => seg[1] )
    const doughnut = createSVGDoughnut(vals, outerRadius, innerRadius, pals);
    const svgText = this.createSvgNode('text', { x: 47, y: 60, class: "text-in-circle", 'text-anchor':"middle" });
    const textNode = document.createTextNode(chartText);
    
    svgText.appendChild(textNode);
    doughnut.appendChild(svgText);
    element.appendChild(doughnut)
  }

  createSvgNode(nodeName, nodeAttributes) {
    let node = document.createElementNS("http://www.w3.org/2000/svg", nodeName);
    Object.keys(nodeAttributes).forEach(attribute => node.setAttributeNS(null, attribute, nodeAttributes[attribute]));
    return node;
  }
}



$(document).ready(() => {
  $(".percentage").each((i, element) => new Chart(element));
  $(".donut").each((i, element) => new Chart(element));
})


