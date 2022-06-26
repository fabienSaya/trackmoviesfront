import { Component } from '@angular/core';
import { UtilisateurModel } from './shared/models/utilisateur.model';
import { AuthService } from './shared/services/auth.service';
import { TokenStorageService } from './shared/services/token-storage.service';
import { UtilisateurService } from './shared/services/utilisateur.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trackMovies';

  connexionUtilisateur: boolean = false;
  identifiantUtilisateur: string = '';

  constructor(private tokenService: TokenStorageService, private utilisateurService: UtilisateurService, private authService: AuthService){ }

  ngOnInit(): void {

    this.utilisateurService.statutUtilisateur$.subscribe( statutUtilisateur => {
      this.connexionUtilisateur = statutUtilisateur.statutConnexion;
      this.identifiantUtilisateur = statutUtilisateur.identifiant;
      //console.log('identifiant : ' + statutUtilisateur.identifiant + ', statut : ' + statutUtilisateur.statutConnexion);
      //console.log('token : ' + this.tokenService.getToken() + ', user : ' + this.tokenService.getUser().identifiant   )
    })
  }

  logout(): void {

    this.connexionUtilisateur = false;

    this.authService.logout().subscribe({

      next: reponse => {
        console.log(reponse.body);
    }
  });

    this.tokenService.signOut();
  }

  //enregistrerTypeAction(action: string){
  //  this.authService.enregistrerTypeAction(action);
  //}
}
