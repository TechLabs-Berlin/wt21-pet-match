

var map = L.map('map').setView([52.575433, 13.5426443], 8);

L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'examples.map-i86knfo3'
}).addTo(map);



var circle = L.circle([52.575433, 13.5426443], 80, {
    color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.3
}).addTo(map)
    .bindPopup("Popup").openPopup();

L.marker([52.575433, 13.5426443]).addTo(map)
    .bindPopup("<b>Popup</b><br />Text");
L.marker([52.575433, 13.5426443]).addTo(map)
    .bindPopup("<b>Popup</b><br />Text");

document.getElementById('map-navigation').onclick = function(abc) {
    var pos = abc.target.getAttribute('data-position');
    var zoom = abc.target.getAttribute('data-zoom');
    if (pos && zoom) {
        var locat = pos.split(',');
        var zoo = parseInt(zoom);
        map.setView(locat, zoo, {animation: true});
        return false;
    }
}       

var popup = L.popup();




