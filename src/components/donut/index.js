import $ from "jquery";
import createSVGDoughnut from 'create-svg-doughnut';


class Donut {
  constructor(element) {
    const segments = $(element).data('chart-segments');
    const innerRadius = +$(element).data('chart-inner-radius');
    const outerRadius = +$(element).data('chart-outer-radius');
    const vals = segments.map( seg => +seg[0] )
    const pals = segments.map( seg => seg[1] )
    const doughnut = createSVGDoughnut(vals, outerRadius, innerRadius, pals);
    element.appendChild(doughnut)
  }

  createSvgNode(nodeName, nodeAttributes) {
    let node = document.createElementNS("http://www.w3.org/2000/svg", nodeName);
    Object.keys(nodeAttributes).forEach(attribute => node.setAttributeNS(null, attribute, nodeAttributes[attribute]));
    return node;
  }
}


$(document).ready(() => {
  $(".donut").each((i, element) => new Donut(element));
})


