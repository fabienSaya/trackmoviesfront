export class UtilisateurModel {

  identifiant: string;
  statutConnexion:boolean;


  constructor(identifiant: string, statutConnexion:boolean){
    this.identifiant = identifiant;
    this.statutConnexion = statutConnexion;
  }
}
