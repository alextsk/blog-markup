import $ from "jquery";
import createSVGDoughnut from './vendor/create-svg-doughnut/src/createSVGDoughnut';

function createSvgNode(n, v) {
  let node = document.createElementNS("http://www.w3.org/2000/svg", n);
  Object.keys(v).forEach((p) => node.setAttributeNS(null, p, v[p]))
  return node
}

function createChart(el) {
  const segments = $(el).data('chart-segments');
  const innerRadius = +$(el).data('chart-inner-radius');
  const outerRadius = +$(el).data('chart-outer-radius');
  const chartText = $(el).data('chart-text') !== undefined ? $(el).data('chart-text').toString() : '';
  const vals = segments.map( seg => +seg[0] )
  const pals = segments.map( seg => seg[1] )
  const doughnut = createSVGDoughnut(vals, outerRadius, innerRadius, pals);
  const svgText = createSvgNode('text', { x: 47, y: 60, class: "text-in-circle", 'text-anchor':"middle" });
  const textNode = document.createTextNode(chartText);
  
  svgText.appendChild(textNode);
  doughnut.appendChild(svgText);
  el.appendChild(doughnut)
}

$(document).ready(() => {
  $(".percentage").each((i, element) => createChart(element));
  $(".donut").each((i, element) => createChart(element));
})


