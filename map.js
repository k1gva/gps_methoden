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
addJsonToMap('06_14_1500.gpx-lines.json', 'Kein Spiel');
addJsonToMap('06_16_1500.gpx-lines.json', 'ENG - WAL');
addJsonToMap('06_16_1800.gpx-lines.json', '1');
addJsonToMap('06_21_1800.gpx-lines.json', '2');

function onEachFeature(feature, layer) {
  if (feature.properties && feature.properties.speed) {
    var date = new Date(null);
    date.setSeconds(feature.properties.time);
    layer.bindPopup(
        '<b>' + Math.floor(feature.properties.speed * 3.6) + ' km/h</b> at<br />' +
        '<b>' + Math.floor(feature.properties.distance) + 'm</b> from start<br />' +
        'after <b>' + date.getUTCMinutes() + ' minutes and ' +
        date.getUTCSeconds() + ' seconds</b>');
  }
}

function speedColor(feature) {
  // return a color in the range of #[00-ff][00-ff]00, i.e. green to red,
  // depending on the 'speed' property of the feature. lower speeds are more
  // green, higher speeds more red. maximum speed should be 20 m/s (~70km/h).
  //
  // so, we need to multiply by (255/20) = 12.75 and then convert to
  // hexadecimal characters.

  if (feature.properties) {
    var speed = feature.properties.speed;
    //normalize
    speed *= 12.75;
    var green = Math.max(0, Math.floor(255 - speed)); //the higher the speed, the less green it should be.
    var red = Math.min(255, Math.floor(speed)); // vice versa, math.floor to round numbers
    // convert to hex
    green = green.toString(16);
    red = red.toString(16);
    // add leading zeros
    if (red.length === 1) red = '0' + red;
    if (green.length === 1) green = '0' + green;
    // build hex color string
    var color = '#' + red + green + '00';
    console.log(speed, color);
    return {color: color, opacity: 1};
  } else {
    return {color: '#00000', opacity: 0};
  }
}

function addJsonToMap(filename, title) {
  var newLayer = L.geoJson().addTo(mymap);
  $.getJSON('geojson/' + filename, function(data) {
    L.geoJson(data, {
      style: speedColor,
      onEachFeature: onEachFeature
    }).addTo(newLayer);
  });
  layers.push({layer: newLayer, title: title});
}

// add Layers to Layercontrol
for(var i = 0; i < layers.length; i++) {
  overlayMaps[layers[i].title] = layers[i].layer;
}

L.control.layers(null, overlayMaps).addTo(mymap);
