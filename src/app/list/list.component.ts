import { Component, OnInit } from '@angular/core';
import { OeuvreModel } from '../shared/models/oeuvre.model';
import { OeuvreService } from '../shared/services/oeuvre.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(public oeuvreService:OeuvreService) {}

  ngOnInit(): void {

    if (this.oeuvreService.rechercherPremierAffichage()){
      //this.refreshPage();
    }

    this.oeuvreService.getOeuvresInitiales();
/*
    this.oeuvreService.oeuvres$.subscribe( (data:Array<OeuvreModel>) => {
      if((data.length==0) && (!this.oeuvreService.getParametreRechercheExiste())) {
        this.oeuvreService.getOeuvresInitiales()
      }
    });*/

  }

  getUrlAffiche(urlAffiche:string | null ):string {
    return (urlAffiche!=null && urlAffiche!='')
            ?  urlAffiche
            : 'https://via.placeholder.com/300x450.png?text=no+images'
  }

  refreshPage(){
    window.location.reload();
  }
}
