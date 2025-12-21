import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErgebnisSeitePage } from './ergebnis-seite.page';

const routes: Routes = [
  {
    path: '',
    component: ErgebnisSeitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErgebnisSeitePageRoutingModule {}
