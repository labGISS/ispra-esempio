import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as L from 'leaflet';
import LeafletInfoBox from '../../Common/LeafletInfoBox';
import {RNDTService, SearchConfig} from '../../providers/rndt.service';
import {PygeoapiService} from '../../providers/pygeoapi.service';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute} from '@angular/router';
import { CollectionMetadata } from 'src/app/Common/Model';

@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.css']
})
export class CollectionDetailsComponent implements OnInit {
  drawEnabled = false;

  bboxLayer: L.Layer;
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

  data: CollectionMetadata;

  constructor(private route: ActivatedRoute, private pygeoapiService: PygeoapiService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(data => {
      const collectionId = (data['params']['id']);
      this.pygeoapiService.getCollectionMetadata(collectionId).subscribe(metadata => {
        this.data = metadata;
        console.log(metadata);
        const bbox = metadata.extent.spatial.bbox[0];

        this.mapFitToBounds = L.latLngBounds( [[bbox[1], bbox[0]], [bbox[3], bbox[2]]]);
        this.bboxLayer = L.rectangle(
          this.mapFitToBounds
        );
      });
    });
  }

  onMapReady(map: L.Map): void {
    console.log('Map is ready!');
    this.infoLayer = new LeafletInfoBox();
    this.infoLayer.setMap(map);
    this.infoLayer.setPosition('bottomleft');
  }

}
