"use strict";
import createSVGPie from 'create-svg-pie';


function createSVGDoughnut(data, outerRadius, innerRadius = outerRadius*0.8, palette) {
    const pie = createSVGPie(data, outerRadius, palette);

    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const mask = document.createElementNS("http://www.w3.org/2000/svg", "mask");
    mask.id = "hole" + Math.floor(Math.random()* 10000);// fix, was simply hole

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", outerRadius);
    circle.setAttribute("cy", outerRadius);
    circle.setAttribute("r", innerRadius);

    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("width", '100%');
    rect.setAttribute("height", '100%');
    rect.setAttribute("fill", "white");

    defs.appendChild(mask);
    mask.appendChild(rect);
    mask.appendChild(circle);

    const childElementCount = pie.childElementCount;
    for (var i = 0; i < childElementCount; i++) {
        if (pie.childNodes[i].setAttribute) {
            pie.childNodes[i].setAttribute('mask', `url(#${mask.id})`);// fix, was simply #hole
        }
    }

    pie.appendChild(defs);
    return pie;
}

export default createSVGDoughnut;
