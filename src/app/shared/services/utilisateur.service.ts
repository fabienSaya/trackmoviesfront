import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UtilisateurModel } from '../models/utilisateur.model';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  /**
   * Gestion affichage utilisateur dans le header avec subject
   */
  private _statutUtilisateur$ = new BehaviorSubject<UtilisateurModel>(new UtilisateurModel('',false));
  //private _utilisateurConnecte: boolean = false;
  private _statutUtilisateur:UtilisateurModel = new UtilisateurModel('',false);

  constructor(tokenService: TokenStorageService ) {
  /**
   * Gestion du refresh
   */
    if(tokenService.getToken()) {
      //this._utilisateurConnecte = true;
      this._statutUtilisateur = new UtilisateurModel(tokenService.getUser(),true);
      this._statutUtilisateur$.next(this._statutUtilisateur);
    }
  }

  setStatutUtilisateur(statutUtilisateur: UtilisateurModel): void {

    this._statutUtilisateur$.next(statutUtilisateur);

  }

  get statutUtilisateur$(): Observable<UtilisateurModel> {
    console.log('get StatutUtilisateur$()');
    return this._statutUtilisateur$.asObservable();
  }

  /*recupererStatutUtilisateur(): UtilisateurModel {
    return this._statutUtilisateur;
  }*/
}
