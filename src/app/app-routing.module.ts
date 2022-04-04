import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {CollectionsListComponent} from "./Components/collections-list/collections-list.component";
import {CollectionMapComponent} from "./Components/collection-map/collection-map.component";
import {SearchComponent} from "./Components/search/search.component";
import {CollectionDetailsComponent} from './Components/collection-details/collection-details.component';

const routes: Routes = [
  { path: "list", component: CollectionsListComponent },
  { path: "collection/:id", component: CollectionDetailsComponent },
  { path: "collection/:id/items", component: CollectionMapComponent },
  { path: "search", component: SearchComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
