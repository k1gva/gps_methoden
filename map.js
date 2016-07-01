var mymap = L.map('map').setView([51.96, 7.63], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'k1gva.85a59b28',
    accessToken: 'pk.eyJ1IjoiazFndmEiLCJhIjoiWVhHMk5nOCJ9.hK5Z3lzyyhN4p5JwnFGVaQ'
}).addTo(mymap);

// Vergleichswert, kein Spiel 14.06. 15 Uhr
var ohneSpiel = 'gpx/06_14_1500.gpx';
new L.GPX(ohneSpiel, {async: true, polyline_options: {color: '#0000FF'}}).on('loaded', function(e) {
    mymap.fitBounds(e.target.getBounds());
}).addTo(mymap);


// Spiel Oesterreich - Ungarn 14.06. 18 Uhr
var oestUng = new L.GPX(
        'gpx/06_14_1800.gpx',
       {async: true,
        polyline_options: {
            color: '#FF0000'}}).on('loaded', function(e){
                mymap.fitbounds(e.target.getBounds());
}).addTo(mymap);

oestUng.on('loaded', function(e) {
    var gpx = e.target,
    distM = gpx.getdistance()
});
console.log(oestUng);

// Spiel England - Wales, 16.06. 15 Uhr
var engWal = 'gpx/06_16_1500.gpx';
new L.GPX(engWal, {async: true, polyline_options: {color: '#FF0000'}}).on('loaded', function(e) {
    mymap.fitbounds(e.target.getBounds());
}).addTo(mymap);

// Spiel Ukraine - Nordirland, 16.06. 18 Uhr
var ukaNor = 'gpx/06_16_1800.gpx';
new L.GPX(ukaNor, {async: true, polyline_options: {color: '#FFBF00'}}).on('loaded', function(e) {
    mymap.fitbounds(e.target.getBounds());
}).addTo(mymap);

// Spiel Nordirland - Deutschland, 21.06. 18 Uhr
var norDeu = 'gpx/06_21_1800.gpx';
new L.GPX(norDeu, {async: true, polyline_options: {color: '#FFFF00'}}).on('loaded', function(e) {
    mymap.fitbounds(e.target.getBounds());
}).addTo(mymap);
