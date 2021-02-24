/*mapbox://styles/miguel1morais/cklix7dyn0dju17ru89qzu4ef
pk.eyJ1IjoibWlndWVsMW1vcmFpcyIsImEiOiJja2xkMDFrazUxYWQ1MnZzODFtejEzZ2NkIn0.FeF6wxnuLddaxEzJBAqzdQ
https://api/styles/v1/miguel1morais/cklix7dyn0dju17ru89qzu4ef/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWlndWVsMW1vcmFpcyIsImEiOiJja2xkMDFrazUxYWQ1MnZzODFtejEzZ2NkIn0.FeF6wxnuLddaxEzJBAqzdQ
© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>*/

var ppmap = L.map('map').setView([38.736946, -9.142685], 12);
var pointersLayer = L.layerGroup();
var rotasLayer = L.layerGroup();
ppmap.addLayer(pointersLayer);


L.tileLayer('https://api/styles/v1/miguel1morais/cklix7dyn0dju17ru89qzu4ef/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWlndWVsMW1vcmFpcyIsImEiOiJja2xkMDFrazUxYWQ1MnZzODFtejEzZ2NkIn0.FeF6wxnuLddaxEzJBAqzdQ', {
    tileSize: 512,
    zoomOffset: -1,
    attribution: '© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(ppmap);

//Leaflet Geosearch
var geoProcura = L.esri.Geocoding.geosearch().addTo(ppmap);
var results = L.layerGroup().addTo(ppmap);

geoProcura.on('results', function (data) {
    results.clearLayers();
});

var ghRouting = new GraphHopper.Routing({ key: "97ae6028-3ed3-469c-9db3-4e41207ac6be", host: "https://graphhopper.com/api/1/", vehicle: "car", locale: "en" });;

var pointerRota;

function getDirections(lat, lon) {
    ppmap.on('click', function (e) {
        if (ghRouting.points.length > 1) { ghRouting.clearPoints(); rotasLayer.clearLayers(); ppmap.removeLayer(pointerRota); }
        ghRouting.addPoint(new GHInput(e.latlng.lat, e.latlng.lng));
        ghRouting.addPoint(new GHInput(lat, lon));
        pointerRota = L.marker([e.latlng.lat, e.latlng.lng]).addTo(ppmap);

        rotasLayer = L.geoJson().addTo(ppmap);
        rotasLayer.options = {
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
function monumentosPointers(lat, long, nome, monumento_id) {
    var marker = pointersLayer.addLayer(L.marker([lat, long]).bindPopup("<input type='button' class='markerInput' onclick='selecionarPointerParque(" + monumento_id + ")' value='" + nome + "'>").addTo(ppmap));
}

function monumentosPointersInfo(lat, long) {
    var marker = pointersLayer.addLayer(L.marker([lat, long]).addTo(ppmap));
}

function selecionarPointerMonumento(monumento_id) {
    sessionStorage.setItem("monumento_id", monumento_id);
    window.location = "map.html";
}

function getMonumentoNome(nomeMonumento) {
    sessionStorage.setItem("nomeMonumento", nomeMonumento);
    getRota();
}

function clearMarker() {
    pointersLayer.clearLayers();
}


