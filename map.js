var mymap = L.map('map').setView([51.96, 7.63], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'k1gva.85a59b28',
    accessToken: 'pk.eyJ1IjoiazFndmEiLCJhIjoiWVhHMk5nOCJ9.hK5Z3lzyyhN4p5JwnFGVaQ'
}).addTo(mymap);


var ohneSpiel = 'gpx/06_14_1500.gpx';
new L.GPX(ohneSpiel, {async: true}).on('loaded', function(e) {
    map.fitBounds(e.target.getBounds());
}).addTo(mymap);

