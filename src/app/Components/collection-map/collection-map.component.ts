import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import LeafletInfoBox from '../../Common/LeafletInfoBox';
import InfoBox from '../../Common/LeafletInfoBox';
import {PygeoapiService} from '../../providers/pygeoapi.service';
import {ActivatedRoute} from '@angular/router';
import {GeoJSON} from 'geojson';
import {DomSanitizer} from '@angular/platform-browser';
import {Browser} from 'leaflet';
import retina = Browser.retina;
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-collection-map',
  templateUrl: './collection-map.component.html',
  styleUrls: ['./collection-map.component.css']
})
export class CollectionMapComponent implements OnInit {
  title = 'GIS';
  leafletOptions = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }),
    ],
    zoom: 2,
    // center: L.latLng(-37.87, 175.475)
    center: L.latLng(40.772274, 14.790388)
  };

  drawnItems: L.FeatureGroup = L.featureGroup();

  drawOptions = {
    position: 'topright',
    draw: false
  };

  infoLayer: LeafletInfoBox;
  cameraLayer: L.Layer;

  data: GeoJSON;
  // dataPropertiesList: {[id: string]: any}[];
  dataSource: MatTableDataSource<{[id: string]: any}>;

  downloadJsonHref: any;
  queryables: import("E:/Workspaces/GIS-Projects/ISPRA/Test/Client/src/app/Common/Model").Queryable;
  propertyList: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private pygeoapi: PygeoapiService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  onMapReady(map: L.Map): void {
    console.log('Map is ready!');
    this.infoLayer = new InfoBox();
    this.infoLayer.setMap(map);
    this.infoLayer.setPosition('bottomleft');
  }

  showDataset(geojson: GeoJSON): void {
    const geojsonMarkerOptions = {
      radius: 8,
      fillColor: '#ff6600',
      color: '#000',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    };

    this.cameraLayer = L.geoJSON(geojson, {
      pointToLayer: (feature, latlng) => {
        return L.circleMarker(latlng, geojsonMarkerOptions);
      },
      onEachFeature: (feature, layer) => {
        layer.bindPopup(this.createHtmlStringFromJson(feature.properties));
      }
    });


    // this.cameraLayer = L.geoJSON(geojson);
    // console.log(this.cameraLayer);
  }

  createHtmlStringFromJson(json: object): string {
    let ret = '';
    const keys = Object.keys(json);

    for (const key of keys) {
      const s = `<b>${key}</b>: ${json[key]}</br>`;
      ret = ret + s;
    }

    return ret;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(data => {
      const collectionId = (data['params']['id']);
      this.pygeoapi.getItems(collectionId).subscribe(geojson => {
        this.data = geojson;
        // this.dataPropertiesList = this.data['features'].map(item => item['properties']);
        this.dataSource = new MatTableDataSource<{[p: string]: any}>(this.data['features'].map(item => item['properties']));
        this.dataSource.paginator = this.paginator;

        // console.log(this.dataPropertiesList);
        this.showDataset(geojson);
      });

      this.pygeoapi.getCollectionQueryables(collectionId).subscribe(res => {
        this.queryables = res;
        this.propertyList = Object.keys(this.queryables.properties);
      });
    });
  }

  downloadFile(data): void {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/geo+json' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
}

