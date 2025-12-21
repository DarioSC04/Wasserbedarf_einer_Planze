import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatenbankSeitePage } from './datenbank-seite.page';

const routes: Routes = [
  {
    path: '',
    component: DatenbankSeitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatenbankSeitePageRoutingModule {}
