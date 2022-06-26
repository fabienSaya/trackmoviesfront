import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, toArray } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RechercheModel } from '../models/recherche.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _oeuvresApiTrouvees$ = new BehaviorSubject<RechercheModel[]>([]);
  private _API_KEY = environment.apiKeyTheMovieDB;
  private _API_URL = environment.apiUrlTheMovieDB;
  private _oeuvreApi !: RechercheModel;
  //private _rechercheOeuvreApiInitialisee = false;

  constructor(private httpClient: HttpClient) { }

  /**
   * rôle : request api theMovieDB pour rechercher des films
   * endpoint : /search/movie
   * queryString : api_key, language, query (3 caractères minimum)
   */

  public rechercheOeuvreApi(saisieRecherche: string): void {

    if (saisieRecherche.trim().length > 2) {
      console.log('saisieRecherche > 2');
      let endPoint = '/search/multi';
      let params = new HttpParams()
      .set('api_key', this._API_KEY)
      .set('language', 'fr')
      .set('query', saisieRecherche);

      this.httpClient.get( this._API_URL + endPoint, {params} )
      .pipe(
        map( (reponseApi: any) => reponseApi.results.filter( (objetApi: any) => ( (objetApi.media_type === 'tv') || (objetApi.media_type === 'movie') ) ).map(
          (objetApi:any) => new RechercheModel(objetApi))
        )
      )
      .subscribe( (data: Array<RechercheModel>) => { console.log(data); this._oeuvresApiTrouvees$.next(data) });
    }
    else {
      console.log('saisieRecherche < 3');
      this._oeuvresApiTrouvees$.next([]);
    }
  }

  get oeuvresApiTrouvees$(){
    return this._oeuvresApiTrouvees$.asObservable();
  }

  public sauvegarderOeuvreApi(oeuvre: RechercheModel):void {
    this._oeuvreApi = oeuvre;
  }

  public recupererOeuvreApi():RechercheModel {
    return this._oeuvreApi;
  }

  public initialiserRechercheOeuvreApi(): void {
    //console.log('oeuvre avant init : ' + this._oeuvreApi.id)
    //this._rechercheOeuvreApiInitialisee = true;
    //this._oeuvreApi = { id: 0, type: '', titre: '', urlAffiche: '', urlBandeAnnonce: '', description: ''};
    this._oeuvresApiTrouvees$.next([]);
    //console.log('oeuvre après init : ' + this._oeuvreApi.id)
  }

  //public rechercheOeuvreApiAInitialiser(): boolean {
  //  return this._rechercheOeuvreApiInitialisee;
  //}
}
