/* eslint no-new: "off" */
import $ from 'jquery';
import maps from 'google-maps';

class Location {
  constructor(element) {
    this.el = element;
    this.lat = $(this.el).data('lat');
    this.lng = $(this.el).data('lng');
    maps.KEY = 'AIzaSyDZZlCXwgC_cO0bD_3nsEFkyD_Gf3PbG5w';
    maps.LANGUAGE = 'en';
    maps.load(this.createMap.bind(this));
  }

  createMap(google) {
    const map = new google.maps.Map(this.el, {
      center: { lat: this.lat, lng: this.lng },
      zoom: 12,
      disableDefaultUI: true,
    });
    const geocoder = new google.maps.Geocoder();
    const geolocate = new google.maps.LatLng(this.lat, this.lng);
    new google.maps.Marker({
      position: { lat: this.lat, lng: this.lng },
      map,
      icon: '../images/Marker.png',
      scale: 0.2,
      title: 'Hello World!',
    });

    geocoder.geocode({ latLng: geolocate }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const [res1, res2] = results;
        const result = (results.length > 1) ? res1 : res2;
        $('.js-location__address').html(result.formatted_address);
      }
    });
  }
}

$('.js-location').each((index, element) => new Location(element));


