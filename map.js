var mymap = L.map('map').setView([51.96, 7.63], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'k1gva.85a59b28',
    accessToken: 'pk.eyJ1IjoiazFndmEiLCJhIjoiWVhHMk5nOCJ9.hK5Z3lzyyhN4p5JwnFGVaQ'
}).addTo(mymap);

var layers = [];
var overlayMaps = {};

var baseMap = {
    "Grundkarte": mymap
};

// Add new files here
addJsonToMap('06_14_1500.gpx.json', 'Kein Spiel');
addJsonToMap('06_16_1500.gpx.json', 'ENG - WAL');

function addJsonToMap(filename, title) {
  var newLayer = L.geoJson().addTo(mymap);
  $.getJSON('geojson/' + filename, function(data) {
    L.geoJson(data).addTo(newLayer);
  });
  layers.push({layer: newLayer, title});
}

// add Layers to Layercontrol
for(var i = 0; i < layers.length; i++) {
  overlayMaps[layers[i].title] = layers[i].layer;
}

L.control.layers(null, overlayMaps).addTo(mymap);
