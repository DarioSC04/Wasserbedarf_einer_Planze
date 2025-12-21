import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ErgebnisSeitePageRoutingModule } from './ergebnis-seite-routing.module';

import { ErgebnisSeitePage } from './ergebnis-seite.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ErgebnisSeitePageRoutingModule
  ],
  declarations: [ErgebnisSeitePage]
})
export class ErgebnisSeitePageModule {}
