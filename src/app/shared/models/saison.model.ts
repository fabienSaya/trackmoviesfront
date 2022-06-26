import { StatutModel } from "./statut.model";

export class SaisonModel {
  id: number;
  numero : String;
  statutVisionnage: StatutModel;
  nbEpisodes : number;

  constructor(saison: SaisonModel) {
    this.id = saison.id;
    this.numero = saison.numero;
    this.statutVisionnage = saison.statutVisionnage;
    this.nbEpisodes = saison.nbEpisodes;
  }

}
