export class LoginModel {

  username: string;
  password: string;

  constructor(identifiant: string, motDePasse: string){
    this.username = identifiant;
    this.password = motDePasse;
  }
}
