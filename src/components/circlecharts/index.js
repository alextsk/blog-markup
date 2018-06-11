import $ from "jquery";
import CircleChart from "circle-chart"
import createSVGDoughnut from './vendor/create-svg-doughnut/src/createSVGDoughnut';



function createSvgNode(n, v) {
  n = document.createElementNS("http://www.w3.org/2000/svg", n);
  for (var p in v)
    n.setAttributeNS(null, p, v[p]);
  return n
}

function createChart(el) {
    const max = $(el).data('chart-max');
    const segments = $(el).data('chart-segments');
    const innerRadius = +$(el).data('chart-inner-radius');
    const outerRadius = +$(el).data('chart-outer-radius');
    const chartText = $(el).data('chart-text') !== undefined ? $(el).data('chart-text').toString() : '';
    const vals = segments.map( seg => +seg[0] )
    const pals = segments.map( seg => seg[1] )
    const doughnut = createSVGDoughnut(vals, outerRadius, innerRadius, pals);
    const svgText = createSvgNode('text', { x: 50, y: 60, class: "big", 'text-anchor':"middle" });
    const textNode = document.createTextNode(chartText);
    
    svgText.appendChild(textNode);
    doughnut.appendChild(svgText);
    el.appendChild(doughnut)
}


$(document).ready(() => {
    $(".percentage").each((i, element) => createChart(element));
    $(".donut").each((i, element) => createChart(element));
})


