import $ from "jquery"
import maps from "google-maps"

class Location {
  constructor(element) {
    this.el = element
    this.lat = $(this.el).data("lat")
    this.lng = $(this.el).data("lng")
    maps.KEY = "AIzaSyDZZlCXwgC_cO0bD_3nsEFkyD_Gf3PbG5w"
    maps.LANGUAGE = "en" 
    maps.load(this.createMap.bind(this));

  }

  createMap(google) {
    var map = new google.maps.Map(this.el, { // eslint-disable-line no-new
        center: {lat: this.lat, lng: this.lng},
        zoom: 12,
        disableDefaultUI: true
      });

      var geocoder = new google.maps.Geocoder();
      var geolocate = new google.maps.LatLng(this.lat, this.lng)
      var marker = new google.maps.Marker({
        position: {lat: this.lat, lng: this.lng},
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
  }
}

$('.js-location').each((index, element) => new Location(element))

