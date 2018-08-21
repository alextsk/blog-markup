import Ripple from './ripple.js';

const buttons = document.querySelectorAll('.js-ripple');
buttons.forEach( button => new Ripple(button));