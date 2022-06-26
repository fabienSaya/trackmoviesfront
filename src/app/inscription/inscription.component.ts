import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InscriptionModel } from '../shared/models/inscription.model';
import { LoginModel } from '../shared/models/login.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  inscriptionForm: FormGroup;
  tentativeConnexion = false;
  succesConnexion = false;
  echecConnexion = false;
  messageErreur = '';

  constructor(private router: Router, private authService: AuthService) {
    this.inscriptionForm = new FormGroup({
      identifiant: new FormControl('',[Validators.required, Validators.minLength(2)]),
      motDePasse: new FormControl('',[Validators.required, Validators.minLength(2)]),
    })
  }

  ngOnInit(): void {}

  onSubmit(): void {

    this.tentativeConnexion = true;

    if(this.inscriptionForm.valid){

      let inscriptionInput = new InscriptionModel(this.inscriptionForm.value.identifiant,this.inscriptionForm.value.motDePasse);

      this.authService.inscription(inscriptionInput).subscribe({
        next: reponse => {

          this.echecConnexion = false;
          this.succesConnexion = true;

          this.afficherPageLogin();
        },
        error : () => {
          this.messageErreur = 'Impossible de créer cet utilisateur !';
          this.echecConnexion = true;
        }
      });

    }
  }

  afficherPageLogin(): void {
    this.router .navigate(['/login']);

  }

}
