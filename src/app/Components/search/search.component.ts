import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RNDTService, SearchConfig} from '../../providers/rndt.service';
import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import {components} from '../../Common/RNDTModel';
import {PageEvent} from '@angular/material/paginator';
import * as L from 'leaflet';
import LeafletInfoBox from '../../Common/LeafletInfoBox';
import {PygeoapiService} from '../../providers/pygeoapi.service';
import {map} from 'rxjs/operators';
import {of, zip} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
  formGroup: FormGroup;

  resultsList: components['schemas']['Response'];

  drawEnabled = false;

  bboxLayer: L.Layer;
  drawnItems: L.FeatureGroup = L.featureGroup();
  infoLayer: LeafletInfoBox;

  mapFitToBounds: L.LatLngBounds;
  mapFitToBoundsOptions: L.FitBoundsOptions = {maxZoom: 8, animate: true};

  leafletOptions = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }),
    ],
    zoom: 5,
    center: L.latLng(42.08, 13.62)
  };

  drawOptions: L.Control.DrawConstructorOptions = {
    position: 'topright',
    draw: {
      circle: false,
      polygon: false,
      polyline: false,
      marker: false,
      circlemarker: false
    },
    edit: {
      featureGroup: this.drawnItems,
    }
  };


  constructor(private fb: FormBuilder, private rndtService: RNDTService, private pygeoapiService: PygeoapiService) { }

  ngOnInit(): void {
    console.log("AAAA");
    this.formGroup = this.fb.group({
      parameters: this.fb.group({
        searchText: this.fb.control(undefined),
        textSearchType: this.fb.control("all"),
        searchField: this.fb.control("any"),
        keywords: this.fb.control([]),
      }, {updateOn: 'submit'})
    });

    this.formGroup.valueChanges.subscribe(data => {
      console.log(data);
    });
  }

  search($event?: PageEvent): void {
    const config: SearchConfig = {
      f: 'json',
      max: 10,
      start: 0
    };

    if ($event) { // search started by paginator event
      config.max = $event.pageSize;
      config.start = $event.pageIndex * $event.pageSize;
    }

    console.log(this.formGroup.value['parameters']);
    this.rndtService.search(this.formGroup.value['parameters'], config).subscribe(res => {
      // console.log(res);
      this.resultsList = res;

      if ((this.formGroup.get("parameters.searchText").value as string).toLowerCase().includes("aqd")) {
        const req2 = this.pygeoapiService.getAQDDetails().pipe(map(res => {
          const r: components['schemas']['Record'] = {
            title: res.title,
            id: res.id,
            keywords: res.keywords,
            bbox: res.extent.spatial.bbox[0],
            pointOfContactOfData: {
              name: "TEST"
            },
            geometry: undefined,
            links: [
              {
                href: "http://localhost:4200/collection/AQD_Campioni",
                type: "customLink",
                labelKey: "catalog.rest.wfs3.json"
              },
              /*{
                href: "http://localhost:5000/collections/AQD_Campioni/items?f=json",
                type: "customLink",
                labelKey: "catalog.rest.wfs3.json"
              }*/
            ]
          };

          return r;
        })).subscribe(resu => {
          this.resultsList.records.unshift(resu);
        });
      }
    });
  }

  removeKeyword(keyword: string): void {
    const index = this.formGroup.get("parameters.keywords").value.indexOf(keyword);

    if (index >= 0) {
      this.formGroup.get("parameters.keywords").value.splice(index, 1);
    }
  }

  addKeyword($event: MatChipInputEvent): void {
    const value = ($event.value || '').trim();

    // Add our fruit
    if (value) {
      this.formGroup.get("parameters.keywords").value.push(value);
    }

    // Clear the input value
    // event.chipInput!.clear();
    $event.input.value = "";
  }

  onMapReady(mappa: L.Map): void {
    console.log('Map is ready!');
    this.infoLayer = new LeafletInfoBox();
    this.infoLayer.setMap(mappa);
    this.infoLayer.setPosition('bottomleft');
  }

  onDrawCreated($event: L.DrawEvents.Created): void {
    console.log($event);
  }


  onDrawEdited($event: L.DrawEvents.Edited): void {
    console.log($event);
  }

  reset(): void {

  }

  resultClicked(element: components['schemas']['Record']): void {
    this.mapFitToBounds = L.latLngBounds( [[element.bbox[1], element.bbox[0]], [element.bbox[3], element.bbox[2]]]);
    this.bboxLayer = L.rectangle(
      this.mapFitToBounds
    );
  }
}
