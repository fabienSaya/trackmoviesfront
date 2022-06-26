import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InscriptionModel } from '../models/inscription.model';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  //private _typeAction: string = '';
  private _API_URL = 'http://localhost:8080/trackmovies/v1';
  //private _HTTP_OPTIONS = { headers: ({ 'Content-Type': 'application/json' })};

  constructor(private httpClient: HttpClient) {}

  login(loginInput: LoginModel): Observable<any> {

    let endPoint = '/login';

    return this.httpClient.post(this._API_URL + endPoint, loginInput);

  }

  logout():Observable<any> {

    let endPoint = '/logout'

    return this.httpClient.get(this._API_URL + endPoint, {responseType : 'text'});

  }

  inscription(inscriptionInput: InscriptionModel): Observable<any> {

    let endPoint = '/utilisateur';

    return this.httpClient.post(this._API_URL + endPoint, inscriptionInput);
  }

  //enregistrerTypeAction(action: string) {
  //  this._typeAction = action;
  //}

  //rechercherTypeAction(): string{
  //  return this._typeAction;
  //}
}
