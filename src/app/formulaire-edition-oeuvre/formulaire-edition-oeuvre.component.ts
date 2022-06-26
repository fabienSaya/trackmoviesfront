import { Component, ElementRef, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { GenreModel } from '../shared/models/genre.model';
import { RechercheModel } from '../shared/models/recherche.model';
import { StatutModel } from '../shared/models/statut.model';
import { TypeModel } from '../shared/models/type.model';
import { ApiService } from '../shared/services/api.service';
import { GenreService } from '../shared/services/genre.service';
import { OeuvreService } from '../shared/services/oeuvre.service';
import { StatutService } from '../shared/services/statut.service';
import { TypeService } from '../shared/services/type.service';
import { OeuvreDetailModel } from '../shared/models/oeuvre-detail.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SaisonModel } from '../shared/models/saison.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-formulaire-edition-oeuvre',
  templateUrl: './formulaire-edition-oeuvre.component.html',
  styleUrls: ['./formulaire-edition-oeuvre.component.css'],
})
export class FormulaireEditionOeuvreComponent implements OnInit {
  private _URL_YOUTUBE='https://www.youtube.com/embed/';
  private _URL_IMG_TMDB='https://image.tmdb.org/t/p/original';

  //a supprimer: sert  pour debug en json
  oeuvreASauverJson : any;

  subscriptions:Subscription[] =[];

  oeuvreForm: FormGroup;

  types!: TypeModel[];
  selectionType: string = '';

  genres!: GenreModel[];
  selectedGenres:GenreModel[]=[];

  statutVisionnages!: StatutModel[];

  //données de l'oeuvre sélectionnée pour modification
  oeuvreAModifier!: OeuvreDetailModel;

  notePossibles : Number[] = [0,1,2,3,4,5];

  oeuvresApiTrouvees: Array<RechercheModel> = [];
  selectionOeuvreApi: RechercheModel = {id: 0, type: '', titre: '', urlAffiche: '', urlBandeAnnonce: '', description: ''};
  oeuvreApiChoisie: boolean = false;
  saisieRecherche: string = '';


  //gestion des messages (on met 2 booleen car on peut ne pas afficherde message du tout egalement)
  displayMsgOeuvreSauvee :boolean = false ;
  displayMsgErreurSauvegarde:boolean = false;

  msgErreur:String='';

  constructor(private fb: FormBuilder, public typeService: TypeService, public oeuvreService: OeuvreService,
            public genreService : GenreService, public statutService : StatutService,private el: ElementRef
            ,private _snackBar: MatSnackBar, private activatedRoute:ActivatedRoute, public apiService: ApiService, private router: Router)
  {
      this.oeuvreForm = this.fb.group({
      id: [''],
      typeOeuvre: ['', [Validators.required, Validators.minLength(1)]],
      titre: ['', [Validators.required, Validators.minLength(1)]],
      genreIds: [''],
      statutVisionnageId: [1],//statut par défaut le 1er, normalement ='A Voir'
      note: [''],
      createurs: [''],
      acteurs: [''],
      duree: ['', [Validators.pattern("^[0-9]*$")]],
      description: [''],
      urlAffiche: [''],
      urlBandeAnnonce: [''],
      saisons: this.fb.array([])
    });
  }

  ngOnInit(): void {
    console.log('test ajouter une aouvre -> retour -> ajouter une oeuvre')

    this.initialiserRechercheOeuvreApi();

    this.types = this.typeService.getTypesPourEditionOeuvre();

    this.subscriptions.push(
      this.genreService.genres$.subscribe( data => { if (data.length == 0) { this.genreService.getGenres(); }; this.genres = data; } )
    );

    this.subscriptions.push(
      this.statutService.statuts$.subscribe( data => { if (data.length == 0) { this.statutService.getStatuts(); } this.statutVisionnages = data } )
    );

//Autoremplissage des champs lors de la demande de modification d'une oeuvre
    //Souscription à l'oeuvreDetail et injection des données dans la variable oeuvreAModifier si un id est présent dans l'URL
    if (this.activatedRoute.snapshot.params['id']) {
        this.subscriptions.push(
          this.oeuvreService.oeuvreDetail$.subscribe(data => this.oeuvreAModifier=data)
        );
        console.log(this.oeuvreAModifier);

        //preremplissage des champs du formulaire pour la modification
        this.oeuvreAModifier.id? this.oeuvreForm.controls["id"].setValue(this.oeuvreAModifier.id) : [''];
        this.oeuvreAModifier.typeOeuvre? this.oeuvreForm.controls["typeOeuvre"].setValue(this.oeuvreAModifier.typeOeuvre) : [''];
        this.oeuvreAModifier.titre? this.oeuvreForm.controls["titre"].setValue(this.oeuvreAModifier.titre) : [''];
        //création d'un tableau pour héberger les id des genres de l'oeuvre
        if (this.oeuvreAModifier.genres) {
        let genreArray : any = [];
        this.oeuvreAModifier.genres.forEach(genre => {
            genreArray.push(genre.id);}),
            console.log(genreArray);
          ;
        //On affecte ensuite ce tableau d'Id en valeur des genres
        this.oeuvreAModifier.genres? this.oeuvreForm.controls["genreIds"].setValue(genreArray) : [''];
      }
        this.oeuvreAModifier.statutVisionnage? this.oeuvreForm.controls["statutVisionnageId"].setValue(this.oeuvreAModifier.statutVisionnage.id) : [1];
        this.oeuvreAModifier.note? this.oeuvreForm.controls["note"].setValue(this.oeuvreAModifier.note) : [''];
        this.oeuvreAModifier.createurs? this.oeuvreForm.controls["createurs"].setValue(this.oeuvreAModifier.createurs) : [''];
        this.oeuvreAModifier.acteurs? this.oeuvreForm.controls["acteurs"].setValue(this.oeuvreAModifier.acteurs) : [''];
        this.oeuvreAModifier.duree? this.oeuvreForm.controls["duree"].setValue(this.oeuvreAModifier.duree) : [''];
        this.oeuvreAModifier.description? this.oeuvreForm.controls["description"].setValue(this.oeuvreAModifier.description) : [''];
        this.oeuvreAModifier.urlAffiche? this.oeuvreForm.controls["urlAffiche"].setValue(this.oeuvreAModifier.urlAffiche) : [''];
        this.oeuvreAModifier.urlBandeAnnonce? this.oeuvreForm.controls["urlBandeAnnonce"].setValue(this.parserCleYoutube(this.oeuvreAModifier.urlBandeAnnonce)) : [''];
        //traitement des saisons avec affectation des valeurs si existante
        this.oeuvreAModifier.saisons? this.oeuvreAModifier.saisons.forEach(saison => this.addSaison(saison)): [''];
        console.log(this.oeuvreAModifier.saisons)
      };
    }

  onSubmitForm(event:Event, formDirective: FormGroupDirective) {
    //évite de recharger la parge au moment de la soumission
    //sinon, l'event normal de soumission est de faire l'action et recharger la page
    event.preventDefault();

    if (this.oeuvreForm.valid) {
      console.log('formulaire valide')
      console.log(this.oeuvreForm.value);
      this.oeuvreASauverJson=this.oeuvreForm.value;

      //on sauvegarde une url youtube
      let key:String  = this.oeuvreForm.controls["urlBandeAnnonce"].value;
      if (key!=null && key.trim()!='') {
        this.oeuvreForm.controls["urlBandeAnnonce"].setValue(this._URL_YOUTUBE+key);
      } else {
        this.oeuvreForm.controls["urlBandeAnnonce"].setValue('');
      }

      this.oeuvreService.saveOeuvre(this.oeuvreForm.value).subscribe(
        {
          next  : response => {
            console.log(response)//si tout s'est bien passé
            this.oeuvreService.setOeuvreDetail(response);
            this.displayMsgOeuvreSauvee=true;
            this.displayMsgErreurSauvegarde=false;//on desactive le message d'erreur au cas où

            formDirective.resetForm() //to reset les controles de validité
            this.oeuvreForm.reset();//to reset les valeurs du formulaire
            this.saisons.clear();//on clear les saisons

            //on remet statut visionnage à sa valeur par defaut
            this.oeuvreForm.controls["statutVisionnageId"].setValue(1);
            this._snackBar.open('Sauvegarde OK', '', {
              duration: 3000,
              panelClass: ['green-snackbar']
            });

            //const messageSuccessDiv = this.el.nativeElement.querySelector('#SuccessMsg');
            //messageSuccessDiv.focus();
            //window.location.hash ='#SuccessMsg';
          },
          error : response =>  {
            console.log("response=",response);
            this.displayMsgErreurSauvegarde=true;
            this.displayMsgOeuvreSauvee=false;
            //console.log("response error=",response.error);
            this.msgErreur=response.error;

            this._snackBar.open('Echec de la Sauvegarde', '', {
              duration: 3000,
              panelClass: ['red-snackbar']
            });
            //const messageErrorDiv = this.el.nativeElement.querySelector('#ErrorMsg');
            //messageErrorDiv.focus();
           //window.location.hash ='#ErrorMsg';
          }
        }
      )
    } else {
      console.log('formulaire invalide')
      console.log(this.oeuvreForm);
      //on met le focus sur le 1er control invalide
      for (const key of Object.keys(this.oeuvreForm.controls)) {
        if (this.oeuvreForm.controls[key].invalid) {
          console.log('control invalide key :',key);
          console.log('control invalide :',this.oeuvreForm.controls[key]);
          //const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          //invalidControl.focus();

          if (key!='saisons') {
            console.log('control invalide :',this.oeuvreForm.controls[key]);
            const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
            invalidControl.focus();
          } else {
            //a voir plus tard si ca a un interet d'essaye de mettre le focus sur cette partie
            /*let saisonFormArray =this.oeuvreForm.controls["saisons"];
            console.log('saisonFormArray=',saisonFormArray);
            for (const saison of Object.keys(saisonFormArray.value)) {
              console.log('saison=',saison);
              console.log('control invalide :',this.saisonForm.controls[key]);
            }*/
          }
          break;
       }
      }
    }
  }

  get saisons()  {
    return this.oeuvreForm.controls["saisons"] as FormArray;
  }

  addSaison(saison:SaisonModel| null):void {
    const saisonForm = this.fb.group({
      id: saison? saison.id : new FormControl('', [Validators.pattern("^[0-9]*$")]),
      numero: saison? saison.numero : new FormControl('', [Validators.required, Validators.minLength(1)]),
      statutVisionnageId: saison? saison.statutVisionnage.id : [1],//statut par défaut le 1er, normalement ='A Voir'
      nbEpisodes: saison? saison.nbEpisodes : new FormControl('', [Validators.pattern("^[0-9]*$")]),
    })
    this.saisons.push(saisonForm)
   }


  deleteSaison(saisonIndex: number) {
    this.saisons.removeAt(saisonIndex);
  }

  deleteOeuvre(oeuvreId: number) {
    this.oeuvreService.deleteOeuvre(oeuvreId).subscribe(
      {
        next  : response => {
          console.log('success', response)//si tout s'est bien passé
          this.displayMsgOeuvreSauvee=true;
          this.displayMsgErreurSauvegarde=false;//on desactive le message d'erreur au cas où
          this._snackBar.open('Suppression OK', '', {
            duration: 3000,
            panelClass: ['green-snackbar']
          });
          this.router.navigate(['/mes-oeuvres']);
         }
        // ,
        // error : response =>  {
        //   console.log('error', response);
        //   this.displayMsgErreurSauvegarde=true;
        //   this.displayMsgOeuvreSauvee=false;
        //   this.msgErreur=response.error;

        //   this._snackBar.open('Echec de la Suppression', '', {
        //     duration: 3000,
        //     panelClass: ['red-snackbar']
        //   });
        // }
      }
    )
  }

  removeMessage() {
    this.displayMsgErreurSauvegarde=false;
    this.msgErreur='';
    this.displayMsgOeuvreSauvee=false;
  }

  resetForm() {
    this.oeuvreForm.reset();//to reset les valeurs du formulaire
    this.saisons.clear();//on clear les saisons

    //on remet statut visionnage à sa valeur par defaut
    this.oeuvreForm.controls["statutVisionnageId"].setValue(1);
    this.apiService.initialiserRechercheOeuvreApi();
    this.initialiserRechercheOeuvreApi();

  }

    chargeForm() {

    this.selectionOeuvreApi = this.apiService.recupererOeuvreApi();

    if (this.selectionOeuvreApi) {
      if (this.selectionOeuvreApi.titre !== '') {

        console.log('Oeuvre sélectionnée pour le chargement : ' + this.selectionOeuvreApi.titre);

        this.oeuvreForm.patchValue({
          typeOeuvre: this.selectionOeuvreApi.type,
          titre: this.selectionOeuvreApi.titre,
          urlAffiche: (this._URL_IMG_TMDB + this.selectionOeuvreApi.urlAffiche).slice(0,149),
          description: (this.selectionOeuvreApi.description.slice(0,247) + '...'),
        });
      }
      else {
        console.log('Aucune oeuvre sélectionnée pour le chargement');
      }
    }
    else {
      console.log('Aucune oeuvre sélectionnée pour le chargement');
    }
  }

  initialiserRechercheOeuvreApi() {
    this.oeuvreApiChoisie = false;
    this.saisieRecherche ='';
    this.oeuvresApiTrouvees = [];
  }

  ngOnDestroy() {
    //on detruit les subscriptions en place
    this.subscriptions.forEach(sub => sub.unsubscribe())
   }

 //méthode qui permet d'extraire la clé youtube de l'Url, afin de l'injecter ensuite dans le formulaire à l'étape modification
  parserCleYoutube(urlBandeAnnonce:string) {
    let cle = urlBandeAnnonce.slice(30)
    return cle;
  }
}
