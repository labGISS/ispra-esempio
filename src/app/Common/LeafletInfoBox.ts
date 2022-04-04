import * as L from 'leaflet';

class LeafletInfoBox extends L.Control {

  // tslint:disable-next-line:variable-name
  private _div: HTMLElement;
  // tslint:disable-next-line:variable-name
  private map: L.Map;

  onAdd(map: L.Map): HTMLElement {
    this._div = L.DomUtil.create('div', 'leaflet-custom-info'); // create a div with a class "info"
    this.update();
    return this._div;
  }

  update(content?): void {
    if (this._div) {
      this._div.innerHTML = (content ? content : '');
    }
  }

  setMap(map: L.Map): void {
    this.map = map;
  }

  addToMap(): void {
    this.addTo(this.map);
  }
}

export default LeafletInfoBox;
