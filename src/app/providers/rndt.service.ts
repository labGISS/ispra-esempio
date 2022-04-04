import { Injectable } from "@angular/core";
import {HttpClient, HttpParams, HttpUrlEncodingCodec} from "@angular/common/http";
import {Observable} from "rxjs";
import {components} from "../Common/RNDTModel";

export interface SearchConfig {
  f: "georss" | "atom" | "json" | "pjson" | "xjson" | "dcat" | "kml" | "html" | "htmlfragment" | "searchpage" | "CSV";
  start?: number;
  max?: number;
  maxSearchTimeMilliSec?: number;
  spatialRel?: "all" | "esriSpatialRelWithin" | "esriSpatialRelOverlaps" | "Intersect";
}

const SEARCH_FIELDS = {
  any: "* AND ",
  title: "title:",
  abstract: "abstract:",
  lineage: "apiso.Lineage:",
  access_constraints: "apiso.AccessConstraints:"
};

@Injectable({
  providedIn: "root"
})
export class RNDTService {

  private endpoint = "https://geodati.gov.it/RNDT/rest/find/document";

  constructor(private httpClient: HttpClient) { }

  private keywordMerge(keywords: string[], operator?: string, quotes = false): string {
    let str;

    for (const word of keywords) {
      const w = quotes ? `"${word.trim()}"` : word.trim();
      if (!str) {
        str = `(${w}`; // for the first word we set str variable, with parenthesis and word
      } else {
        str += ` ${operator} ${w}`;  // for the other words we append separator and word to the str variable
      }
    }

    return `${str})`; // notice the parenthesis closed
  }

  search(parameters: {
           searchText?: string;
           searchField: "any" | "title" | "abstract" | "lineage" | "access_constraints";
           keywords?: string[];
           organizationName?: string;
           bbox?: number[];
           after?: string;
           before?: string;
           orderBy: "areaAscending" | "areaDescending" | "dateAscending" | "dateDescending" | "format" | "relevance" | "title";
           spatialRel?: "all" | "esriSpatialRelWithin" | "esriSpatialRelOverlaps" | "Intersect";
           textSearchType: "exact" | "any" | "all"; // Exact: searchText="carta geologica", Any: searchText=carta geologica, All: searchText=carta AND geologica
         },
         config: SearchConfig,
  ): Observable<components["schemas"]["Response"]> {
    /*
    Example
    http://192.168.3.30:8080/geoportalRNDTPA/rest/find/document?start=1&max=15&geometryType=esriGeometryBox
    &searchText=apiso.AccessConstraints:(testo AND cercato) AND keywords:("chiave" OR " prova")
    AND apiso.DataOrganizationName:"Regione Campania"&orderBy=relevance&spatialRel=all&f=json
    */
    let httpParams = new HttpParams({encoder: new HttpUrlEncodingCodec()});

    let textParam = "*";

    for (const key of Object.keys(parameters)) {
      if (key === "searchText" && parameters[key]) {
        textParam = `${parameters["searchText"]}`;
        if (parameters.textSearchType === "all" || parameters.textSearchType === "exact") {
          const operator = parameters.textSearchType === "all" ? "ALL" : "OR";
          const keywordList = parameters.searchText.split(" ");
          textParam = `${SEARCH_FIELDS[parameters.searchField]}${this.keywordMerge(keywordList, operator)}`;
        }
        delete parameters[key];
      }
      else if (key === "keywords" && parameters[key] && parameters[key].length > 0) {
        textParam = `${textParam} AND keywords:${this.keywordMerge(parameters[key], "OR", true)}`;
        delete parameters[key];
      }
      else if (key === "organizationName" && parameters[key]) {
        textParam = `${textParam} AND apiso.DataOrganizationName:${parameters[key]}`;
        delete parameters[key];
      }
      else if (key === "bbox" && parameters[key]) {
        const bboxStr = parameters[key].join(",");
        httpParams = httpParams.set("bbox", bboxStr);
      }
      else if (parameters[key]) {
        httpParams = httpParams.set(key, parameters[key]);
      }
    }

    for (const key of Object.keys(config)) {
      if (config[key]) {
        httpParams = httpParams.set(key, config[key]);
      }
    }

    if (textParam) {
      httpParams = httpParams.set("searchText", textParam);
    }

    console.log(httpParams.toString());
    return this.httpClient.get<components["schemas"]["Response"]>(this.endpoint, {params: httpParams});
  }
}
