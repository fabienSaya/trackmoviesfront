// import { HttpClientModule } from '@angular/common/http';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
// import { MatSelectModule } from '@angular/material/select';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { RouterTestingModule } from '@angular/router/testing';
// import { OeuvreDetailModel } from '../shared/models/oeuvre-detail.model';
// import { FormulaireEditionOeuvreComponent } from './formulaire-edition-oeuvre.component';

// describe('FormulaireEditionOeuvreComponent', () => {
//   let component: FormulaireEditionOeuvreComponent;
//   let fixture: ComponentFixture<FormulaireEditionOeuvreComponent>;
//   let oeuvreDetail:OeuvreDetailModel;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ FormulaireEditionOeuvreComponent ],
//       imports: [ReactiveFormsModule, HttpClientModule, MatSnackBarModule, RouterTestingModule, MatFormFieldModule, FormBuilder],
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(FormulaireEditionOeuvreComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//     oeuvreDetail = 
//       { id: 1,
//       typeOeuvre: 'film',
//       titre: 'filmTest',
//       description: '',
//       genres: [{id: 1, libelle: 'Action'}], 
//       statutVisionnage: {id: 1, libelle: 'Vu'}, 
//       note: 3, 
//       createurs: 'Steven Spielberg', 
//       acteurs: 'Tom Hanks', 
//       urlAffiche: 'urlAfficheTest', 
//       urlBandeAnnonce : "https://www.youtube.com/embed/12345678",
//       duree: 100,
//       saisons : [{id: 1, numero: 'S1', statutVisionnage: {id: 1, libelle: 'Vu'}, nbEpisodes : 6}]}
//         ;
//   });

//   it('parserCleYoutube doit retourner uniquement la cle youtube de l url', () => {
//     expect(component.parserCleYoutube(oeuvreDetail.urlBandeAnnonce)).toBe('12345678');
//   });

// });
