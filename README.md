# Leaflet Drawing App

This is a simple web application that demonstrates several features of the Leaflet.js mapping library.

## Features

- **Interactive Map:** Powered by Leaflet.js.
- **Basemap Switcher:** Switch between a street map and a satellite imagery layer.
- **Full Drawing Tools:** Draw Polygons, Polylines, Rectangles, Circles, and place Markers.
- **Shape Properties Display:** Shows the properties of drawn shapes (coordinates, center, radius, etc.).
- **Mouse Coordinate Inspector:** Displays the real-time geographic coordinates of the mouse pointer.
- **Lightweight:** Uses CDNs for libraries, so no installation is needed.

## How to Use

1.  Simply open the `index.html` file in your web browser.
2.  Use the layer control in the top-right to switch basemaps.
3.  Use the drawing tools on the top-left to draw a shape.
4.  The properties of the drawn shape will be displayed in the bottom-left corner.
5.  The current mouse coordinates are shown in the top-right corner.

## File Structure

-   `index.html`: The main HTML file containing the structure of the page.
-   `style.css`: The stylesheet for the application.
-   `script.js`: The JavaScript file containing the logic for the map and drawing functionality.

## JavaScript Code (`script.js`) Explanation

The `script.js` file contains all the logic for interacting with the Leaflet library.

### 1. Map and Basemap Initialization

```javascript
const map = L.map('map').setView([51.505, -0.09], 13);

const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { ... });

const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { ... });

osm.addTo(map);

const baseMaps = {
    "Street Map": osm,
    "Satellite": satellite
};
```

-   The map is initialized as before.
-   Two separate `L.tileLayer` instances are created: `osm` for the street map and `satellite` for the imagery layer.
-   The `osm` layer is added to the map by default.
-   A `baseMaps` object is created to hold the different basemap layers with user-friendly names.

### 2. Layer Control

```javascript
const drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

const overlayMaps = {
    "Drawn Shapes": drawnItems
};

L.control.layers(baseMaps, overlayMaps).addTo(map);
```

-   `L.FeatureGroup()` creates a layer to hold all the user-drawn shapes.
-   This group is then put into an `overlayMaps` object. Overlays are layers that can be toggled on and off over the basemap.
-   `L.control.layers(baseMaps, overlayMaps)` creates the layer switcher control. It takes the `baseMaps` (which are radio buttons) and `overlayMaps` (which are checkboxes) and adds the control to the map.

### 3. Drawing Controls

This section adds the `leaflet-draw` toolbar and configures it to show all drawing tools.

### 4. Handling Drawing Events

This section listens for the `draw:created` event and extracts the relevant properties (coordinates, radius, etc.) from the newly drawn shape to display them.

### 5. Mouse Position Inspector

```javascript
const mousePositionContainer = document.getElementById('mouse-position-container');

map.on('mousemove', function(e) {
    const lat = e.latlng.lat.toFixed(5);
    const lng = e.latlng.lng.toFixed(5);
    mousePositionContainer.textContent = `Lat: ${lat}, Lng: ${lng}`;
});
```

-   This code listens for the `mousemove` event on the map.
-   Whenever the mouse moves, it gets the geographic coordinates from the event object.
-   The latitude and longitude are formatted and displayed in the `mouse-position-container` div.