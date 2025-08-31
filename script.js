const map = L.map('map').setView([51.505, -0.09], 13);

const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

osm.addTo(map);

const baseMaps = {
    "Street Map": osm,
    "Satellite": satellite
};

const drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

const overlayMaps = {
    "Drawn Shapes": drawnItems
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

const drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems
    },
    draw: {
        polygon: true,
        polyline: true,
        circle: true,
        marker: true,
        circlemarker: true,
        rectangle: true
    }
});
map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, function (event) {
    const layer = event.layer;
    const type = event.layerType;
    drawnItems.addLayer(layer);

    let output = { type: type };

    if (type === 'rectangle' || type === 'polygon') {
        const latLngs = layer.getLatLngs()[0];
        output.coordinates = latLngs.map(latLng => ({
            lat: latLng.lat,
            lng: latLng.lng
        }));
    } else if (type === 'polyline') {
        const latLngs = layer.getLatLngs();
        output.coordinates = latLngs.map(latLng => ({
            lat: latLng.lat,
            lng: latLng.lng
        }));
    } else if (type === 'circle') {
        const latLng = layer.getLatLng();
        output.center = { lat: latLng.lat, lng: latLng.lng };
        output.radius = layer.getRadius();
    } else if (type === 'marker' || type === 'circlemarker') {
        const latLng = layer.getLatLng();
        output.coordinates = { lat: latLng.lat, lng: latLng.lng };
    }

    document.getElementById('coordinates').textContent = JSON.stringify(output, null, 2);
});

const mousePositionContainer = document.getElementById('mouse-position-container');

map.on('mousemove', function(e) {
    const lat = e.latlng.lat.toFixed(5);
    const lng = e.latlng.lng.toFixed(5);
    mousePositionContainer.textContent = `Lat: ${lat}, Lng: ${lng}`;
});
