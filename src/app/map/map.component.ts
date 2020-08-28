import { Component, OnInit } from "@angular/core";
import * as L from "leaflet";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  map: L.Map;
  markersLayer: L.LayerGroup;

  constructor() {

    this.markersLayer = new L.LayerGroup();
  }

  ngOnInit() {
    // Initialize the map to display Europe
    this.map = L.map('map', {
      center: [49.8282, 8.5795],
      zoom: 4,
      minZoom: 1,
      maxZoom: 10
    }) // Create a callback for when the user changes the zoom
    .addEventListener("zoomlevelschange", this.onZoomChange, this)
     // Create a callback for when the map is moved
    .addEventListener("moveend", this.onCenterChange, this);

    // Define where we are going to get the actual map
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    this.markersLayer.addTo(this.map);
    tiles.addTo(this.map);
  }

/**
 * Event callback for when the center of the map changes
 */
  onCenterChange(event: any) {
    console.debug(`MapComponent:onCenterChange: Starting`);
    // Retrieve the new map boundaries 
    let mapBoundary: L.LatLngBounds = this.map.getBounds();
    console.debug(`MapComponent:onCenterChange: Boundary: ${JSON.stringify(mapBoundary)}`);
    // Retrieve the new center coordinates
    let latLng: L.LatLng = event.sourceTarget.getCenter();
    console.debug(`MapComponent:onCenterChange: Lat: ${latLng.lat}, Lng: ${latLng.lng}`);
  }

/**
 * Event callback for when the zoom level changes
 */
  onZoomChange(event: any) {
    console.debug(`MapComponent:onZoomChange: Starting`);
    // Retrieve the new map boundaries 
    let mapBoundary: L.LatLngBounds = this.map.getBounds();
    console.debug(`MapComponent:onZoomChange: Boundary: ${JSON.stringify(mapBoundary)}`);
  }

/**
 * Center the map on the set Latitude and Longitude
 */
  centerMap(lat: number, lng: number): void {
    this.map.panTo([lat, lng]);
    // Generate a circle marker for this location
    let currentLocation: L.CircleMarker = L.circleMarker([lat, lng], {
      radius: 5
    });
    currentLocation.addTo(this.map);
    // Wait a short period before zooming to a designated level
    setTimeout(() => {this.map.setZoom(8);}, 750);
  }
}
