const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

const drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems
    },
    draw: {
        polygon: true,
        polyline: false,
        circle: false,
        marker: false,
        circlemarker: false,
        rectangle: true
    }
});
map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, function (event) {
    const layer = event.layer;
    drawnItems.addLayer(layer);

    let coordinates;
    if (layer instanceof L.Rectangle || layer instanceof L.Polygon) {
        const latLngs = layer.getLatLngs()[0];
        coordinates = latLngs.map(latLng => ({
            lat: latLng.lat,
            lng: latLng.lng
        }));
    }

    if (coordinates) {
        document.getElementById('coordinates').textContent = JSON.stringify(coordinates, null, 2);
    }
});