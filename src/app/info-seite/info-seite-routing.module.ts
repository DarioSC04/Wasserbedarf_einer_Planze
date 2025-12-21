import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoSeitePage } from './info-seite.page';

const routes: Routes = [
  {
    path: '',
    component: InfoSeitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoSeitePageRoutingModule {}
