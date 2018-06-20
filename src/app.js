import $ from 'jquery'
import './components/button/button.js'
import './components/circlecharts'
import './components/slider'
import './components/stage'
import './components/dropdown'
import './components/location'
import './components/calendar'
import './components/video'


$(document).ready(()=>{
  let str = `window location is ${window.location}`;
  console.log(str);
});