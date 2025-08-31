# Leaflet Drawing App

This is a simple web application that allows users to draw rectangles and polygons on a map and view the coordinates of the drawn shapes.

## Features

- Interactive map powered by Leaflet.js and OpenStreetMap.
- Draw rectangles and polygons on the map.
- Displays the geographical coordinates (latitude and longitude) of the vertices of the drawn shapes.
- Lightweight and uses CDNs for libraries, so no installation is needed.

## How to Use

1.  Simply open the `index.html` file in your web browser.
2.  Use the drawing tools on the top-left side of the map to draw a rectangle or a polygon.
3.  The coordinates of the shape will be displayed in the bottom-left corner of the page.

## File Structure

-   `index.html`: The main HTML file containing the structure of the page.
-   `style.css`: The stylesheet for the application.
-   `script.js`: The JavaScript file containing the logic for the map and drawing functionality.

## JavaScript Code (`script.js`) Explanation

The `script.js` file contains all the logic for interacting with the Leaflet library to create the map and handle drawing functionality.

### 1. Map Initialization

```javascript
const map = L.map('map').setView([51.505, -0.09], 13);
```

-   `L.map('map')`: This creates a map object and attaches it to the `div` element with the `id="map"` in `index.html`.
-   `.setView([51.505, -0.09], 13)`: This sets the initial geographical center of the map (latitude 51.505, longitude -0.09) and the initial zoom level (13).

### 2. Tile Layer

```javascript
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
```

-   This adds the visual map tiles to our map. We are using the free tiles from [OpenStreetMap](https://www.openstreetmap.org/).
-   The `attribution` option adds the necessary credit to OpenStreetMap in the bottom-right corner of the map.

### 3. Feature Group for Drawn Items

```javascript
const drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
```

-   `L.FeatureGroup()`: This creates a layer group to which we will add the shapes (rectangles and polygons) that users draw.
-   `map.addLayer(drawnItems)`: This adds the feature group to the map, making it ready to hold the drawn layers.

### 4. Drawing Controls

```javascript
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
```

-   This code adds the `leaflet-draw` toolbar to the map.
-   `edit: { featureGroup: drawnItems }`: This tells the draw control that any shapes in the `drawnItems` layer group should be editable.
-   `draw: { ... }`: This configuration object specifies which drawing tools to show in the toolbar. We have enabled `polygon` and `rectangle` and disabled the others.

### 5. Handling the 'draw:created' Event

```javascript
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
```

-   `map.on(L.Draw.Event.CREATED, ...)`: This sets up an event listener that fires whenever a new shape is created using the draw toolbar.
-   `const layer = event.layer;`: The created shape is passed as a `layer` in the event object.
-   `drawnItems.addLayer(layer);`: The new shape is added to our `drawnItems` feature group.
-   The code then checks if the created layer is a `Rectangle` or a `Polygon`.
-   `layer.getLatLngs()[0]`: This method retrieves the geographical coordinates of the vertices of the shape.
-   The coordinates are then formatted into an array of objects.
-   Finally, `document.getElementById('coordinates').textContent = ...`: The formatted coordinates are converted to a JSON string and displayed in the `<pre>` element on the page.