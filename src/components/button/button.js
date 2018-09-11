import Ripple from './ripple';

const buttons = document.querySelectorAll('.js-ripple');
buttons.forEach(button => new Ripple(button));
