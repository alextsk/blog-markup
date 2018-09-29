class Ripple {
  constructor(element, { baseBlock = 'ripple' }={}) {
    this.element = element instanceof HTMLElement ? element : document.querySelector(element);
    if (!this.element) throw new Error(`There is no node corresponding to ${element} in this document`);
    this.baseBlock = baseBlock;
    this.rippleContainer = this.createElement("div", `${this.baseBlock}__container`);
    this.element.appendChild(this.rippleContainer);
    this.element.addEventListener('click', this.addRipple.bind(this));
  }

  addRipple (event) {
    const container = this.rippleContainer;
    const rippler = this.createElement('span', `${this.baseBlock}__rippler`);
    const size = container.offsetWidth;
    const pos = container.getBoundingClientRect();
    const x = event.pageX - pos.left - (size / 2) - window.pageXOffset;
    const y = event.pageY - pos.top - (size / 2) - window.pageYOffset;
    const style = `top:${y}px;
                 left:${x}px; 
                 height:${size}px; 
                 width: ${size}px;
                 `;
    rippler.style = style;
    this.rippleContainer.appendChild(rippler);
    window.setTimeout(() => rippler.remove(), 2000);
  }

  createElement(tag, className) {
    const el = document.createElement(tag);
    el.classList.add(className);
    return el;
  }
}

export default Ripple;
