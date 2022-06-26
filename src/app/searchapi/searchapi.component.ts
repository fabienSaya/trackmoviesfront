import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RechercheModel } from '../shared/models/recherche.model';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-searchapi',
  templateUrl: './searchapi.component.html',
  styleUrls: ['./searchapi.component.css']
})
export class SearchapiComponent implements OnInit {

  subscriptions:Subscription[] = [];
  oeuvresApiTrouvees: Array<RechercheModel> = [];
  selectionOeuvreApi!: RechercheModel;
  oeuvreApiChoisie: boolean = false;
  saisieRecherche: string = '';

  constructor(public apiService: ApiService) { }

  ngOnInit(): void {

    this.initialiserRechercheOeuvreApi();

    this.subscriptions.push(
      this.apiService.oeuvresApiTrouvees$.subscribe(data => this.oeuvresApiTrouvees=data)
    );
  }

  rechercherOeuvreApi(saisieRecherche: string) {

    console.log('saisieRecherche :' + saisieRecherche);

    if(saisieRecherche.trim().length < 3) {
      console.log("requête non lancée");
      this.oeuvresApiTrouvees = [];
    }
    else {

      this.apiService.rechercheOeuvreApi(saisieRecherche);

      console.log('oeuvresTrouvees[] : ' + this.oeuvresApiTrouvees);
    }
  }

  selectionnerOeuvreApi(oeuvre: RechercheModel): void {
    console.log('oeuvre sélectionnée : ' + oeuvre.titre);
    this.oeuvreApiChoisie = true;
    this.saisieRecherche = oeuvre.titre;
    this.selectionOeuvreApi = oeuvre;
    this.apiService.sauvegarderOeuvreApi(oeuvre);
  }
  initialiserRechercheOeuvreApi(): void{
    this.saisieRecherche ='';
    this.oeuvreApiChoisie = false;
    this.oeuvresApiTrouvees=[];
    this.apiService.initialiserRechercheOeuvreApi();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
