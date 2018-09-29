import Ripple from './Ripple';

const buttons = document.querySelectorAll('.js-ripple');
buttons.forEach(button => new Ripple(button));
