import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {LeafletDrawModule} from '@asymmetrik/ngx-leaflet-draw';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatMomentDateModule, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatOptionModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AmazingTimePickerModule} from '@jonijnm/amazing-time-picker';
import {MatIconModule} from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';
import {TitleCasePipe} from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import { CollectionsListComponent } from './Components/collections-list/collections-list.component';
import { CollectionMapComponent } from './Components/collection-map/collection-map.component';
import { AppRoutingModule } from './app-routing.module';
import {MatListModule} from '@angular/material/list';
import { SearchComponent } from './Components/search/search.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import { MetadataSearchResultItemComponent } from './Components/metadata-search-result-item/metadata-search-result-item.component';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import { CollectionDetailsComponent } from './Components/collection-details/collection-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CollectionsListComponent,
    CollectionMapComponent,
    SearchComponent,
    MetadataSearchResultItemComponent,
    CollectionDetailsComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, LeafletModule, HttpClientModule,
    MatToolbarModule, LeafletDrawModule, MatButtonModule, MatInputModule, ReactiveFormsModule, FormsModule, MatMomentDateModule,
    MatDatepickerModule, MatFormFieldModule, AmazingTimePickerModule, MatIconModule, MatSliderModule, MatExpansionModule, AppRoutingModule, MatListModule, MatRadioModule, MatSelectModule, MatOptionModule, MatChipsModule, MatCardModule, MatPaginatorModule, MatMenuModule, MatTableModule
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'it-IT'},
    TitleCasePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
