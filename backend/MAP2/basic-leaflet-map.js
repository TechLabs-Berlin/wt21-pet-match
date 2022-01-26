var mylat = '52.52000659999999';
var mylong = '13.404954';
var myzoom = '10';
var map = L.map('map').setView([mylat, mylong], myzoom);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
 
L.marker([mylat, mylong]).addTo(map).bindPopup("<b>Berlin</b>").openPopup();
L.circle([mylat, mylong], 500, {
    color: 'red',
    fillColor: '#f2d5df',
    fillOpacity: 0.2
}).addTo(map).bindPopup("");
 
markers = [{
    "name": "Tierschutzverein für Berlin",
    "url": "https://tierschutz-berlin.de/",
    "lat": 52.575433,
    "lng": 13.5426443
}, {
    "name": "Tierheim Falkensee und Umgebung e.V.",
    "url": "https://tierheim-falkensee.de/",
    "lat": 52.5471139,
    "lng": 13.0978984
}, {
    "name": "Tierheim Verlorenwasser",
    "url": "https://www.tierheim-verlorenwasser.de/",
    "lat": 52.196690,
    "lng": 12.476970
}];
for (var i = 0; i < markers.length; ++i) {
    L.marker([markers[i].lat, markers[i].lng], {
        icon: new L.DivIcon({
            className: 'my-div-icon',
            html: '<span class="my-map-label">' + markers[i].name + '</span>'
        })
    }).addTo(map);
 
    L.marker([markers[i].lat, markers[i].lng]).addTo(map).bindPopup(markers[i].name);
}