// on import LocalEvents.js
import LocalEvents from "./LocalEvents.js";
// on import la config
import config from "../../app.config.json";
// on importe la libririe mapbox
import mapboxgl from "mapbox-gl";
// on import la librarie bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
// on import la librarie bootstrap-icons
import "bootstrap-icons/font/bootstrap-icons.css";
// on import la librarie mapbox
import "mapbox-gl/dist/mapbox-gl.css";
// on import le css
import "../assets/style.css";

const STORAGE_NAME = "events";

class App {
  // properties
  // container de la map
  elDivMap;
  // instance de la map
  map;
  mapsave;
  marker;
  LocalEvents;
  lngLat = null;
  valluArray = [];
  arrayData = [];
  serializedArrayData = [];
  markerPoint = true;
  markersArr = [];

  constructor() {
    this.LocalEvents = new LocalEvents();
  }

  start() {
    console.log("App started");
    this.loadDom();
    this.initMap();
    this.LocalEvents.formConstruct();
    this.addLocalStorage();
    this.seeMarker();
    this.displayMarkerData();
  }

  // Chargement du dom
  loadDom() {
    // on récupére notre div app
    const app = document.getElementById("app");
    // on crée un élément div pour la map
    this.elDivMap = document.createElement("div");
    // on lui donnée un id
    this.elDivMap.id = "map";
    // on ajoute la div de la map à la div app
    app.appendChild(this.elDivMap);
    this.getStorage();
  }

  // initialisation de la map
  initMap() {
    mapboxgl.accessToken = config.apis.mapbox_gl.apiKey;
    // on va instancier notre map
    this.map = new mapboxgl.Map({
      container: this.elDivMap,
      style: config.apis.mapbox_gl.map_styles.satellite_streets,
      center: [2.3522, 48.8566],
      zoom: 12,
    });
    const nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, "top-left");

    // ajout d'un écouteur sur la map
    this.map.on("click", this.handleClicMap.bind(this));
  }

  // Méthode qui capte le clic sur la map
  handleClicMap(e) {
    let lat = document.getElementById("lat");
    let long = document.getElementById("long");
    // TODO REMOVE WHEN DONE
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let dateDebut = document.getElementById("dateDebut");
    let dateFin = document.getElementById("dateFin");

    lat.value = e.lngLat.lat;
    long.value = e.lngLat.lng;
    // TODO REMOVE WHEN DONE
    title.value = "Default Title";
    description.value = "Default Description";
    dateDebut.value = "2023-10-01T14:00";
    dateFin.value = "2023-10-01T15:00";

    if (this.currentMarker == null) {
      this.marker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(this.map);
      this.currentMarker = true;
    } else if (this.currentMarker == true) {
      this.marker.remove();
      this.marker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(this.map);
      this.currentMarker = true;
    }
  }

  // méthode qui ajoute au local storage
  addLocalStorage() {
    const send = document.getElementById("send");
    send.addEventListener("click", (e) => {
      e.preventDefault();
      this.savelocalStorage();
      location.reload();
    });
  }

  // méthode qui ajoute au local storage
  savelocalStorage() {
    let existingData = localStorage.getItem(STORAGE_NAME);
    let eventsArray = existingData ? JSON.parse(existingData) : [];

    let arrayData = {
      Latitude: lat == "" ? "Inconnu" : lat.value,
      Longitude: long == "" ? "Inconnu" : long.value,
      Titre: title == "" ? "Inconnu" : title.value,
      Description: description == "" ? "Inconnu" : description.value,
      dateDebut: dateDebut == "" ? "Inconnu" : dateDebut.value,
      dateFin: dateFin == "" ? "Inconnu" : dateFin.value,
    };

    eventsArray.push(arrayData);
    let serializedArrayData = JSON.stringify(eventsArray);
    localStorage.setItem(STORAGE_NAME, serializedArrayData);
  }

  getStorage() {
    // Tableau pour stocker les notes récupérées
    let arrNote = [];
    // Récupération des données depuis le localstorage en utilisant le nom de la clé
    const serializedData = localStorage.getItem(STORAGE_NAME);
    // Si aucune donnée n'est trouvée, on retourne un tableau vide
    if (!serializedData) return arrNote;
    // Tentative de parsing des données récupérées
    try {
      arrNote = JSON.parse(serializedData) || [];
    } catch (error) {
      // En cas d'erreur lors du parsing (données corrompues ou invalides)
      // On supprime les données du localstorage
      localStorage.removeItem(STORAGE_NAME);
    }
    return arrNote;
  }

  seeMarker() {
    let markers = this.getStorage();
    for (const markersPoint of markers) {
      const marker = new mapboxgl.Marker()
        .setLngLat([
          Number(markersPoint.Longitude),
          Number(markersPoint.Latitude),
        ])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title ">${markersPoint.Titre}</h4>
              </div>
              <div class="modal-body mt-2">
                <p>Description : ${markersPoint.Description} </p>
                <p>Date de début: ${markersPoint.dateDebut}</p>
                <p>Date de fin: ${markersPoint.dateFin}</p>
              </div>
            </div>`
          )
        )
        .addTo(this.map);
      
      // Add the marker to the markers array
      this.markersArr.push(marker);
      
      // Add event listener for mouseover to show popup
      this.addMarkerPopup(marker, markersPoint);
    }
  }

  // Method to add mouseover event listener to a marker
  addMarkerPopup(marker, markersPoint) {
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    marker.getElement().addEventListener('mouseover', () => {
      popup.setLngLat(marker.getLngLat())
        .setHTML(
          `<div id="divpopup">
            <h3>${markersPoint.Titre}</h3>
            <p>${markersPoint.dateDebut}</p>
            <p>${markersPoint.dateFin}</p>
            <p>${markersPoint.Description}</p>
          </div>`
        )
        .addTo(this.map);
    });

    marker.getElement().addEventListener('mouseleave', () => {
      popup.remove();
    });
  }


  
}

const app = new App();

export default app;