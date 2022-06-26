import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { OeuvreDetailModel } from '../shared/models/oeuvre-detail.model';
import { DetailOeuvreComponent } from './detail-oeuvre.component';
import { ActivatedRoute} from '@angular/router';


//contient une suite de tests unitaires
describe('DetailOeuvreComponent', () => {
  //Déclarer l'environnement de la suite de tests unitaires
  //Compiler les components
  let component: DetailOeuvreComponent;
  let fixture: ComponentFixture<DetailOeuvreComponent>;
  let oeuvreServiceSpy: any;
  let oeuvreDetail:OeuvreDetailModel;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailOeuvreComponent ],
      providers: [{provide:ActivatedRoute, useValue: {snapshot:{params:[{id:1}]}}}],
      imports: [RouterTestingModule, HttpClientTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailOeuvreComponent);
    component = fixture.componentInstance;
    let elt = fixture.nativeElement;
    // SPY permet de tester les components sans attendre une valeur de retour asynchrone
    oeuvreServiceSpy = jasmine.createSpyObj('OeuvreService', ['getOeuvreById'])
    // activer la détection de changement dans l'environnement de test, obligatoire pour accéder aux interpolations et avoir le textContent
    fixture.detectChanges();
    //création d'une oeuvreDetail pour les Tests
    oeuvreDetail = 
      { id: 1,
      typeOeuvre: 'film',
      titre: 'filmTest',
      description: '',
      genres: [{id: 1, libelle: 'Action'}], 
      statutVisionnage: {id: 1, libelle: 'Vu'}, 
      note: 3, 
      createurs: 'Steven Spielberg', 
      acteurs: 'Tom Hanks', 
      urlAffiche: 'urlAfficheTest', 
      urlBandeAnnonce : 'cleBandeAnnonceTest',
      duree: 100,
      saisons : [{id: 1, numero: 'S1', statutVisionnage: {id: 1, libelle: 'Vu'}, nbEpisodes : 6}]}
        ;
   
  });

  it('creation d une instance', () => {
         expect(component).toBeTruthy();
       });

  it('getUrlAffiche doit retourner une url ou une url par défaut si inexistante', () => {
    expect(component.getUrlAffiche(null)).toBe('https://via.placeholder.com/300x450.png?text=no+images');
    expect(component.getUrlAffiche('')).toBe('https://via.placeholder.com/300x450.png?text=no+images');
    expect(component.getUrlAffiche(oeuvreDetail.urlAffiche)).toBe('urlAfficheTest');
  });

});
  
    



