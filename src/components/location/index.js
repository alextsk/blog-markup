import $ from "jquery"
import maps from "google-maps"


const el = document.querySelector(".js-map")
const lat = $(el).data("lat")
const lng = $(el).data("lng")
maps.KEY = "AIzaSyDZZlCXwgC_cO0bD_3nsEFkyD_Gf3PbG5w"
maps.LANGUAGE = "en" 
maps.load(function(google) {
  var place =  new google.maps.Map(el, {
    center: {lat: lat, lng: lng},
    zoom: 12,
    disableDefaultUI: true
  });
  
  var geocoder = new google.maps.Geocoder();
  var geolocate = new google.maps.LatLng(56.49771, 84.97437)
  geocoder.geocode({'latLng': geolocate}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var result;
      if (results.length > 1) {
       result = results[1];
      } else {
       result = results[0];
      }
      $(".js-address1").html(result.address_components[0].long_name + ", ")
      $(".js-address2").html(result.address_components[1].long_name + ' ')
      $(".js-address3").html(result.address_components[2].long_name + ', ')
      $(".js-address4").html(result.address_components[3].short_name + ' ')
     }  
  });    
   console.log("place", place)
});

maps.onLoad(function(google) {
  console.log('I just loaded google maps api');
});
