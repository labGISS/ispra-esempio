import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {components} from '../../Common/RNDTModel';

@Component({
  selector: 'app-metadata-search-result-item',
  templateUrl: './metadata-search-result-item.component.html',
  styleUrls: ['./metadata-search-result-item.component.css']
})
export class MetadataSearchResultItemComponent implements OnInit {

  LABELS_STRINGS = {
    'catalog.rest.viewDetails': "Scheda Metadati",
    'catalog.rest.webSite': "Sito Web",
    'catalog.rest.viewFullMetadata': "Metadati XML",
    'catalog.rest.open': "Apri",
    'catalog.rest.wfs': "Servizio WFS",
    'catalog.rest.wfs3.json': "Servizio WFS 3.0",
    'catalog.rest.wfs3': "Visualizzatore Servizio WFS 3.0",
    'catalog.rest.wms': "Servizio WMS",
  };

  @Input()
  element: components['schemas']['Record'] = {
    title: "Compostaggio  ACV R3 (CACV)",
    id: "r_friuli:m10762-cc-i11217",
    updated: "2018-04-09T22:00:00Z",
    summary: "Il documento Criteri localizzativi regionali degli impianti di recupero e smaltimento dei rifiuti è lo strumento che definisce i criteri per l'individuazione delle aree idonee e non idonee alla localizzazione degli impianti di smaltimento e di recupero de...",
    hierarchyLevel: "dataset",
    responsibleOfData: "Insiel S.p.A.",
    pointOfContactOfData: {
      name: "Regione Autonoma Friuli Venezia Giulia - SERVIZIO DISCIPLINA GESTIONE RIFIUTI E SITI INQUINATI",
      email: "alessandro.comuzzi@regione.fvg.it",
      phone: ""
    },
    keywords: [
      "composting",
      "Area management/restriction/regulation zones and reporting units",
      "Landfill of waste sites (Landfill of Waste Directive)",
      "Regional",
      "open data"
    ],
    bbox: [
      12.32,
      45.56,
      13.92,
      46.66
    ],
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [
            12.32,
            45.56
          ],
          [
            12.32,
            46.66
          ],
          [
            13.92,
            46.66
          ],
          [
            13.92,
            45.56
          ],
          [
            12.32,
            45.56
          ]
        ]
      ]
    },
    links: [
      {
        href: "https://irdat.regione.fvg.it/Distributore/download?idFmt=383&type=lcr&idDset=11217&path=CLIR/Shape/Criteri_Impianto_CACV_shp.zip",
        type: "other",
        labelKey: ""
      },
      {
        href: "http://serviziogc.regione.fvg.it/geoserver/RIFIUTI/wms?request=GetCapabilities&service=wms&version=1.3.0",
        type: "other",
        labelKey: ""
      },
      {
        href: "http://serviziogc.regione.fvg.it/geoserver/RIFIUTI/wfs?request=GetCapabilities&service=wfs&version=2.0.0",
        type: "other",
        labelKey: ""
      },
      {
        href: "https://geodati.gov.it/geoportalRNDTPA/catalog/search/resource/details.page?uuid=r_friuli%3Am10762-cc-i11217",
        type: "details",
        labelKey: "catalog.rest.viewDetails"
      },
      {
        href: "https://irdat.regione.fvg.it/Distributore/download?idFmt=383&type=lcr&idDset=11217&path=CLIR/Shape/Criteri_Impianto_CACV_shp.zip",
        type: "open",
        labelKey: "catalog.rest.open"
      },
      {
        href: "http://www.regione.fvg.it/rafvg/cms/RAFVG/AT9/ARG8/",
        type: "website",
        labelKey: "catalog.rest.webSite"
      },
      {
        href: "https://geodati.gov.it/geoportalRNDTPA/rest/document?id=r_friuli%3Am10762-cc-i11217",
        type: "metadata",
        labelKey: "catalog.rest.viewFullMetadata"
      },
      {
        href: "http://serviziogc.regione.fvg.it/geoserver/RIFIUTI/wfs?request=GetCapabilities&service=wfs&version=2.0.0",
        type: "customLink",
        labelKey: "catalog.rest.wfs"
      },
      {
        href: "https://irdat.regione.fvg.it/Distributore/download?idFmt=383&type=lcr&idDset=11217&path=CLIR/Shape/Criteri_Impianto_CACV_shp.zip",
        type: "customLink",
        labelKey: "catalog.opendata.downloadZIP"
      },
      {
        href: "http://serviziogc.regione.fvg.it/geoserver/RIFIUTI/wms?request=GetCapabilities&service=wms&version=1.3.0",
        type: "customLink",
        labelKey: "catalog.rest.wms"
      }
    ]
  };

  @Output()
  clickEvent: EventEmitter<components['schemas']['Record']> = new EventEmitter<components["schemas"]["Record"]>();
  expand = false;

  detailsLinks: components['schemas']['Links'][] = [];
  servicesLinks: components['schemas']['Links'][] = [];

  constructor() { }

  ngOnInit(): void {
    for (const link of this.element.links) {
      if (['website', 'metadata', 'details'].includes(link.type)) {
        this.detailsLinks.push(link);
      } else if (link.labelKey.includes("wms") || link.labelKey.includes("wfs")) {
        this.servicesLinks.push(link);
      }
    }

    // if (this.servicesLinks.length === 0) {
    //   console.log(this.element.title, this.element.links);
    // }
  }

  onCardClick($event: MouseEvent): void {
    this.clickEvent.emit(this.element);
  }

  goToLink(url: string): void {
    window.open(url, "_blank");
  }
}
