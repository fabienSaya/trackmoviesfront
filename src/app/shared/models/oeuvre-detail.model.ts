
import { OeuvreModel } from '../models/oeuvre.model';
import { SaisonModel } from './saison.model';

export class OeuvreDetailModel extends OeuvreModel {
  duree: number;
  saisons : Array<SaisonModel>;

  constructor(oeuvreDetail: OeuvreDetailModel) {
    super(oeuvreDetail);
    this.duree = oeuvreDetail.duree;
    this.saisons=oeuvreDetail.saisons;
  }
}

