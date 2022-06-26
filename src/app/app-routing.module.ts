import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailOeuvreComponent } from './detail-oeuvre/detail-oeuvre.component';
import { FormulaireEditionOeuvreComponent } from './formulaire-edition-oeuvre/formulaire-edition-oeuvre.component';
import { HomeComponent } from './home/home.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';

/* définir les routes de l'applications */
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'mes-oeuvres', component: ListComponent,canActivate: [AuthGuard] },
  { path: 'mes-oeuvres/:id', component: DetailOeuvreComponent,canActivate: [AuthGuard] },
  { path: 'edition-oeuvre', component: FormulaireEditionOeuvreComponent,canActivate: [AuthGuard] },
  { path: 'edition-oeuvre/:id', component: FormulaireEditionOeuvreComponent,canActivate: [AuthGuard] },
];

@NgModule({
  //imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
