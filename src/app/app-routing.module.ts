import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'ergebnis-seite',
    loadChildren: () => import('./ergebnis-seite/ergebnis-seite.module').then( m => m.ErgebnisSeitePageModule)
  },
  {
    path: 'datenbank-seite',
    loadChildren: () => import('./datenbank-seite/datenbank-seite.module').then( m => m.DatenbankSeitePageModule)
  },
  {
    path: 'info-seite',
    loadChildren: () => import('./info-seite/info-seite.module').then( m => m.InfoSeitePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
