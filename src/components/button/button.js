import {MDCRipple} from '@material/ripple';

const buttons = document.querySelectorAll('.button')
buttons.forEach(button => MDCRipple.attachTo(button))