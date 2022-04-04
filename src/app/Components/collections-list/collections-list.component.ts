import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PygeoapiService} from '../../providers/pygeoapi.service';
import {Collection} from '../../Common/Model';

@Component({
  selector: 'app-collections-list',
  templateUrl: './collections-list.component.html',
  styleUrls: ['./collections-list.component.css']
})
export class CollectionsListComponent implements OnInit {

  collections: Collection[];

  @Output()
  datasetSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor(private pygeoapi: PygeoapiService) { }

  ngOnInit(): void {
    this.pygeoapi.getCollections().subscribe(coll => this.collections = coll);
  }

}
