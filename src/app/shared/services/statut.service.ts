import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { StatutModel } from '../models/statut.model';

@Injectable({
  providedIn: 'root'
})

export class StatutService {

  private _API_URL = 'http://localhost:8080/trackmovies/v1';

  private _statuts$ = new BehaviorSubject<StatutModel[]>([]);
  //private _statutParDefaut:Array<StatutModel>= [new StatutModel(-1,'Tous')];

  constructor(private httpClient:HttpClient) { }

  getStatuts():void {
    // récupération des statuts via le endpoint /mes_oeuvres de l'API backend
    this.httpClient.get(this._API_URL+'/statuts_visionnage')
        .pipe (
          // mapping de la réponse en tableau d'objets de type OeuvreModel
          map(
            (apiResponse:any) => apiResponse.statuts.map( (statut:StatutModel) => new StatutModel(statut.id,statut.libelle) )
          ) // fin map
        ) // fin pipe
       .subscribe(
          (response:Array<StatutModel>) => {
            //let statuts = [...this._statutParDefaut, ...response];
            //this._statuts$.next(statuts);
            this._statuts$.next(response);
          }
       )
     }

  get statuts$():Observable<StatutModel[]> {
    return this._statuts$.asObservable();
  }
}
