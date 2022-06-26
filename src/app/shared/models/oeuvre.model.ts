import { GenreModel } from '../models/genre.model';
import { StatutModel } from '../models/statut.model';

export class OeuvreModel {
  id: number;
  typeOeuvre: string;
  titre: string;
  genres: GenreModel[];
  statutVisionnage: StatutModel;
  note: number;
  createurs: string;
  acteurs: string;
  urlAffiche: string;
  urlBandeAnnonce: string;
  description: string;

  constructor(oeuvre: OeuvreModel) {
    this.id = oeuvre.id;
    this.typeOeuvre = oeuvre.typeOeuvre;
    this.titre = oeuvre.titre;
    this.statutVisionnage = oeuvre.statutVisionnage;
    this.genres = oeuvre.genres;
    this.note = oeuvre.note;
    this.createurs = oeuvre.createurs
    this.acteurs = oeuvre.acteurs
    this.urlAffiche = oeuvre.urlAffiche;
    this.urlBandeAnnonce = oeuvre.urlBandeAnnonce;
    this.description=oeuvre.description;
  }
}
