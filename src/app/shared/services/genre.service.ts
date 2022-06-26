import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { GenreModel } from '../models/genre.model';

@Injectable({
  providedIn: 'root'
})

export class GenreService {

  private _API_URL = "http://localhost:8080/trackmovies/v1";

  private _genres$ = new BehaviorSubject<GenreModel[]>([]);
  //private _genreParDefaut:Array<GenreModel>= [new GenreModel(-1,'Tous')];


  constructor(private httpClient:HttpClient) { }

  getGenres():void {
    // récupération des statuts via le endpoint /mes_oeuvres de l'API backend
    this.httpClient.get(this._API_URL+'/genres')
        .pipe (
          // mapping de la réponse en tableau d'objets de type OeuvreModel
          map(
            (apiResponse:any) => apiResponse.genres.map( (genre:GenreModel) => new GenreModel(genre.id, genre.libelle) )
          ) // fin map
        ) // fin pipe
       // souscrition à la réponse HTTP (observable) et push dans le subject _genre$
        .subscribe(
         (reponse:Array<GenreModel>) => {
          //let genres =  [...this._genreParDefaut, ...reponse];
          //this._genres$.next(genres);
          this._genres$.next(reponse);
         }
       )
     }

  get genres$():Observable<GenreModel[]> {
    return this._genres$.asObservable();
  }
}
