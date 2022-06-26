export class InscriptionModel {

  identifiant: string;
  motDePasse: string;

  constructor(identifiant: string, motDePasse: string){
    this.identifiant = identifiant;
    this.motDePasse = motDePasse;
  }
}
