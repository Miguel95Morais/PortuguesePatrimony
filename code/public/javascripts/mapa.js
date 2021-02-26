var ppmap = L.map('map').setView([38.736946, -9.142685], 12);
var markersLayer = L.layerGroup();
var routingLayer = L.layerGroup();
ppmap.addLayer(markersLayer);


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 17,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWlndWVsMW1vcmFpcyIsImEiOiJja2xjcGM1ZWgwOWZwMnZuMTN3MHlyMjk0In0.luEp_3TMRckUq2ehls9Aew'
}).addTo(ppmap);

//Leaflet Geosearch
var geoProcura = L.esri.Geocoding.geosearch().addTo(ppmap);
var results = L.layerGroup().addTo(ppmap);

geoProcura.on('results', function (data) {
    results.clearLayers();
});

var ghRouting = new GraphHopper.Routing({ key: "97ae6028-3ed3-469c-9db3-4e41207ac6be", host: "https://graphhopper.com/api/1/", vehicle: "car", elevation: "false" });;

var markerRota;

function getDirections(lat, lon) {
    ppmap.on('click', function (e) {
        if (ghRouting.points.length > 1) { ghRouting.clearPoints(); routingLayer.clearLayers(); ppmap.removeLayer(markerRota); }
        ghRouting.addPoint(new GHInput(e.latlng.lat, e.latlng.lng));
        ghRouting.addPoint(new GHInput(lat, lon));
        markerRota = L.marker([e.latlng.lat, e.latlng.lng]).addTo(ppmap);

        routingLayer = L.geoJson().addTo(ppmap);
        routingLayer.options = {
            style: { color: "#00cc33", "weight": 5, "opacity": 0.7 }
        };
        ghRouting.doRequest()
            .then(function (json) {
                var path = json.paths[0];
                routingLayer.addData({
                    "type": "Feature",
                    "geometry": path.points
                });
                console.log(json);
            })
            .catch(function (err) {
                var str = "An error occured: " + err.message;
                $("#routing-response").text(str);
            });

    });
}
//Functionalities
function monumentosMarkers(lat, long, nomemonumento, monumento_id) {
    var marker = markersLayer.addLayer(L.marker([lat, long]).bindPopup("<input type='button' class='markerInput' onclick='selecionarMarkerMonumento(" + monumento_id + ")' value='" + nomemonumento + "'>").addTo(ppmap));
}

function monumentosMarkersInfo(lat, long) {
    var marker = markersLayer.addLayer(L.marker([lat, long]).addTo(ppmap));
}

function selecionarMarkerMonumento(monumento_id) {
    sessionStorage.setItem("monumento_id", monumento_id);
    window.location = "map.html";
}

function getMonumentoNome(nomemonumento) {
    sessionStorage.setItem("nomemonumento", nomemonumento);
    getRota();
}

function clearMarker() {
    markersLayer.clearLayers();
}


