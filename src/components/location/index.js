import $ from "jquery"
import maps from "google-maps"


const el = $(".js-location")[0]
const lat = $(el).data("lat")
const lng = $(el).data("lng")
maps.KEY = "AIzaSyDZZlCXwgC_cO0bD_3nsEFkyD_Gf3PbG5w"
maps.LANGUAGE = "en" 
maps.load(function(google) {
  var map = new google.maps.Map(el, { // eslint-disable-line no-new
    center: {lat: lat, lng: lng},
    zoom: 12,
    disableDefaultUI: true
  });

  var geocoder = new google.maps.Geocoder();
  var geolocate = new google.maps.LatLng(lat, lng)
  var marker = new google.maps.Marker({
    position: {lat, lng},
    map: map,
    icon: '/images/Marker.png',
    scale: .2,
    title: 'Hello World!'
  });
  geocoder.geocode({'latLng': geolocate}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      var result;
      var [res1, res2] = results; 
      if (results.length > 1) {
       result = res1;
      } else {
       result = res2;
      }
      $(".js-location__address1").html(result.address_components[0].long_name + ", ")
      $(".js-location__address2").html(result.address_components[1].long_name + ' ')
      $(".js-location__address3").html(result.address_components[2].long_name + ', ')
      $(".js-location__address4").html(result.address_components[3].short_name + ' ')
     }  
  });    
});
