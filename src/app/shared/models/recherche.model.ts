export class RechercheModel {

  id: number;
  type: string;
  titre: string;
  urlAffiche: string;
  urlBandeAnnonce: string;
  description: string;

  constructor(oeuvreApi: any) {
    if (oeuvreApi.media_type === 'tv'){
      this.id = oeuvreApi.id;
      this.type = 'serie';
      this.titre = oeuvreApi.name;
      this.urlAffiche = oeuvreApi.poster_path;
      this.urlBandeAnnonce = '';
      this.description = oeuvreApi.overview;
    }
    else if (oeuvreApi.media_type === 'movie') {
      this.id = oeuvreApi.id;
      this.type = 'film';
      this.titre = oeuvreApi.title;
      this.urlAffiche = oeuvreApi.poster_path;
      this.urlBandeAnnonce = '';
      this.description = oeuvreApi.overview;
    }
    else {
      console.log('Type objet API non attendu : ' + oeuvreApi.media_type)
      this.id = 0;
      this.type = '';
      this.titre = '';
      this.urlAffiche = '';
      this.urlBandeAnnonce = '';
      this.description = '';
    }
  }
}
