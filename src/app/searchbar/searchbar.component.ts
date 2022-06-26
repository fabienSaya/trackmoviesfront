import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, Subscription, tap, merge } from 'rxjs';
import { GenreModel } from '../shared/models/genre.model';
import { StatutModel } from '../shared/models/statut.model';
import { TypeModel } from '../shared/models/type.model';
import { GenreService } from '../shared/services/genre.service';
import { OeuvreService } from '../shared/services/oeuvre.service';
import { StatutService } from '../shared/services/statut.service';
import { TypeService } from '../shared/services/type.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  types!: TypeModel[];
  selectionType: string = '';
  selectionStatut: string = '';
  selectionGenre: string = '';
  userInputValue: string = '';

  //@ViewChild('texteOeuvreRecherche', {static: true}) texteOeuvreRecherche!: ElementRef;

  constructor(public statutService:StatutService, public genreService:GenreService,public oeuvreService:OeuvreService, public typeService: TypeService) {
    //console.log(this);
  }

  ngOnInit(): void {
    /*
    const keyUpEvents$ = fromEvent(this.texteOeuvreRecherche.nativeElement, 'keyup')
    .pipe(
      map((event:any) => { return event.target.value; }),
      filter(res => res.length > 2),
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => { console.log(this.texteOeuvreRecherche.nativeElement.value) })
    );

    const keyDownBackSpaceEvents$ = fromEvent(this.texteOeuvreRecherche.nativeElement, 'keydown.backspace')
    .pipe(
      map((event:any) => { return event.target.value; }),
      filter(res => res.length > 2),
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => { console.log(this.texteOeuvreRecherche.nativeElement.value) })
    );

    const keyDownDeleteEvents$ = fromEvent(this.texteOeuvreRecherche.nativeElement, 'keydown.delete')
    .pipe(
      map((event:any) => { return event.target.value; }),
      //filter(res => res.length > 2),
      //debounceTime(300),
      //distinctUntilChanged(),
      tap(() => { console.log(this.texteOeuvreRecherche.nativeElement.value) })
    );

    const blurEvents$ = fromEvent(this.texteOeuvreRecherche.nativeElement, 'blur')
    .pipe(
      map((event:any) => { return event.target.value; }),
      filter(res => res.length > 2),
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => { console.log(this.texteOeuvreRecherche.nativeElement.value) })
    );

    const allEvents = merge(keyDownBackSpaceEvents$, keyUpEvents$, blurEvents$,keyDownDeleteEvents$)
    .subscribe(
      reponse => {
        if(reponse) {
          console.log('reponse : ' + reponse);
          this.oeuvreService.searchOeuvres(reponse, this.selectionType,this.selectionStatut,this.selectionGenre);
        }
        else {
          console.log('else');
          this.oeuvreService.searchOeuvres('', this.selectionType,this.selectionStatut,this.selectionGenre);
        }
      }
    )
    */
    this.types = this.typeService.getTypes();
    // Souscription observable return par la méthode genres§

    this.genreService.genres$.subscribe( (genreData:Array<GenreModel>) => {

      //--> Réponse vide : appel à la méthode getGenres()
      //-->  1. init requête HTTP Get
      //-->  2. subscribe() à la réponse HTTP (observable)
      //-->  3. next() dans _genre$ (subject) return en observable part la méthode genres$

      if(genreData.length==0) {
        this.genreService.getGenres()
      }
    });

    // Souscription observable return par la méthode statuts§

    this.statutService.statuts$.subscribe( (statutData:Array<StatutModel>) => {

      //--> Réponse return par observable vide : appel à la méthode getStatuts()
      //-->  1. init requête HTTP (get)
      //-->  2. subscribe() à la réponse HTTP (observable)
      //-->  3. next() dans _statuts$ (subject) return en observable part la méthode statuts$

      if(statutData.length==0) {
        this.statutService.getStatuts()
      }
    });
  }
  /**
  * Gestion du texte de recherche
  * @param texte
  */
  searchOeuvresInput(texte:string){

    this.oeuvreService.searchOeuvres(texte, this.selectionType,this.selectionStatut,this.selectionGenre);
    this.userInputValue = texte;
  }
  /**
   * Gestion des évènements liés aux changements de filtre de recherche
   */
  searchOeuvresFilter(){

    this.oeuvreService.searchOeuvres(this.userInputValue, this.selectionType,this.selectionStatut,this.selectionGenre);
  }
}
