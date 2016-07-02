var mymap = L.map('map').setView([51.96, 7.63], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'k1gva.85a59b28',
    accessToken: 'pk.eyJ1IjoiazFndmEiLCJhIjoiWVhHMk5nOCJ9.hK5Z3lzyyhN4p5JwnFGVaQ'
}).addTo(mymap);

var layerOhne = L.geoJson().addTo(mymap);
var layerEngWal = L.geoJson().addTo(mymap);

// geojson Daten ohne Spiel
var ohneSpiel = $.getJSON('geojson/06_14_1500.gpx.json', function(data) {
    L.geoJson(data).addTo(layerOhne);
});

// geojson Daten Eng - Wal
var engWal = $.getJSON('geojson/06_16_1500.gpx.json', function(data) {
    L.geoJson(data).addTo(layerEngWal);
});

var baseMap = {
    "Grundkarte": mymap
};

var overlayMaps = {
    "Ohne Spiel": layerOhne,
    "England - Wales": layerEngWal
}

L.control.layers(null, overlayMaps).addTo(mymap);
