import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatenbankSeitePageRoutingModule } from './datenbank-seite-routing.module';

import { DatenbankSeitePage } from './datenbank-seite.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatenbankSeitePageRoutingModule
  ],
  declarations: [DatenbankSeitePage]
})
export class DatenbankSeitePageModule {}
