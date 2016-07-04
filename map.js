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
addJsonToMap('06_16_1800.gpx-lines.json', 'UKR - NIR');
addJsonToMap('06_21_1800.gpx-lines.json', 'NIR - GER');

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

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 *
 * taken from https://stackoverflow.com/a/36722579
 */
function hslToRgb(h, s, l){
  var r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    var hue2rgb = function hue2rgb(p, q, t){
      if(t < 0) t += 1;
      if(t > 1) t -= 1;
      if(t < 1/6) return p + (q - p) * 6 * t;
      if(t < 1/2) return q;
      if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function decToHex(i) {
  // return a integer in hexadecimal string representation with at least two chars
  i = i.toString(16);
  if (i.length === 1) i = '0' + i;
  return i;
}
function speedColor(feature) {
  //calculate rgb color between red and green by speed
  if (feature.properties) {
    var speed = feature.properties.speed;
    //maximum speed should be 20m/s, in the hue range 0-0.5 (red to green), so divide by 40
    speed = speed / 36;
    var rgb = hslToRgb(0.5-speed, 1, 0.5);
    var hex = '#'  + decToHex(rgb[0]) + decToHex(rgb[1]) + decToHex(rgb[2]);
    console.log(hex, speed);
    return {color: hex, opacity: 1};
  } else {
    return {color: '#00000', opacity: 0}; //filter out line segments that have no speed data
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
