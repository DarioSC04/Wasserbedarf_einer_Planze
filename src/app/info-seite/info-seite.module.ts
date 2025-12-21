import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoSeitePageRoutingModule } from './info-seite-routing.module';

import { InfoSeitePage } from './info-seite.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoSeitePageRoutingModule
  ],
  declarations: [InfoSeitePage]
})
export class InfoSeitePageModule {}
