import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { InscriptionModel } from '../shared/models/inscription.model';
import { LoginModel } from '../shared/models/login.model';
import { UtilisateurModel } from '../shared/models/utilisateur.model';
import { TokenStorageService } from '../shared/services/token-storage.service';
import { UtilisateurService } from '../shared/services/utilisateur.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //typeAction: string = '';
  //inscriptionForm: FormGroup;
  loginForm: FormGroup;
  tentativeConnexion = false;
  succesConnexion = false;
  echecConnexion = false;
  messageErreur = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenService: TokenStorageService, private utilisateurService: UtilisateurService, private router: Router) {
    this.loginForm = new FormGroup({
      identifiant: new FormControl('',[Validators.required, Validators.minLength(2)]),
      motDePasse: new FormControl('',[Validators.required, Validators.minLength(2)]),
    })
    /*this.inscriptionForm = new FormGroup({
      identifiant: new FormControl('',[Validators.required, Validators.minLength(2)]),
      motDePasse: new FormControl('',[Validators.required, Validators.minLength(2)]),
    })*/
   }

  ngOnInit(): void {

    //this.typeAction = this.authService.rechercherTypeAction();
    //console.log('typeAction : ' + this.typeAction);
  }

  onSubmit(): void {

    //if (this.typeAction == 'login') {
    this.tentativeConnexion = true;

    if(this.loginForm.valid){

      let loginInput = new LoginModel(this.loginForm.value.identifiant,this.loginForm.value.motDePasse);

      this.authService.login(loginInput).subscribe({
        next: reponse => {

          this.tokenService.saveToken(reponse.token);
          this.tokenService.saveUser(this.loginForm.value.identifiant);
          this.echecConnexion = false;
          this.succesConnexion = true;
          this.roles = this.tokenService.getUser().roles;
          this.utilisateurService.setStatutUtilisateur(new UtilisateurModel(this.loginForm.value.identifiant, this.succesConnexion));

          this.afficherPageUtilisateur();
        },
        error : () => {
          this.messageErreur = 'Identfiant et/ou mot de passe incorrect(s)' !;
          this.echecConnexion = true;
        }
      });
    }
  }
  /*}
    else if (this.typeAction == 'inscription') {
      console.log('onSubmit() - inscription');
      //if(this.inscriptionForm.valid){
      if(this.loginForm.valid){
      console.log('onSubmit() - inscription - form valid');
      //let inscriptionInput = new InscriptionModel(this.inscriptionForm.value.identifiant,this.inscriptionForm.value.motDePasse);
      let inscriptionInput = new InscriptionModel(this.loginForm.value.identifiant,this.loginForm.value.motDePasse);

      this.authService.inscription(inscriptionInput).subscribe({
        next: reponse => {
          console.log(reponse);
          //window.location.reload();
          this.authService.enregistrerTypeAction('login');
          this.afficherPageLogin();
                },
        error : () => {
          this.messageErreur = 'Impossible de créer cet utilisateur !';
        }
      });

    }
    else { console.log('onSubmit() - inscription - form not valid' + this.loginForm.value);}
  }*/

  afficherPageUtilisateur(): void {
    this.router.navigate(['/mes-oeuvres']);
  }

  /*
  afficherPageLogin(): void {
    this.router.navigate(['/login']);
  }
  */

}
