import { Component } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { ToastService } from '../toast-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})

export class HomePage {

  public readonly CM_TO_INCH_KONST: number = 0.393701;

  public _planzenartEingabe : string = "";
  public _pflanzenGroesseInCmEingabe : number = 0;
  public _lichtEingabe : number = 2;
  public _bodenEingabe : number = 2;
  public _jahreszeitEingabe : string = "";
  public _kommentarEingabe : string = "";

  constructor(private toastController: ToastController, private navController: NavController, private toastService: ToastService) {}

  public onBerechnungButton(){

    try{

    this.eingabenUeberpruefen();

    //factoren umrechechnen
    let lichtFaktor: number = 0.9 + this._lichtEingabe * 0.0875; //liegt zwischen 0.9 und 1.25 und eingaben liegen zwischen 0 und 4
    let bodenFaktor: number = 0.9 + this._bodenEingabe * 0.05; //liegt zwischen 0.9 und 1.1 und eingaben liegen zwischen 0 und 4
    let pflanzengroesseInInch: number = this._pflanzenGroesseInCmEingabe * this.CM_TO_INCH_KONST;
    let jahreszeitFaktor: number = this.jahreszeitFaktor();
    let pflanzenartFaktor: number = this.pflanzenartFaktor();

    let lichtFormatiert = this.pinFormatterLicht(this._lichtEingabe);
    let bodenFormatiert = this.pinFormatterBoden(this._bodenEingabe);

    let weiterleitungsURl = `/ergebnis-seite`;
    weiterleitungsURl += `?pflanzenart=${this._planzenartEingabe}`;
    weiterleitungsURl += `&jahreszeit=${this._jahreszeitEingabe}`;
    weiterleitungsURl += `&lichtFormatiert=${lichtFormatiert}`;
    weiterleitungsURl += `&bodenFormatiert=${bodenFormatiert}`;
    weiterleitungsURl += `&pflanzenartFaktor=${pflanzenartFaktor}`;
    weiterleitungsURl += `&pflanzengroesseInInch=${pflanzengroesseInInch}`;
    weiterleitungsURl += `&lichtFaktor=${lichtFaktor}`;
    weiterleitungsURl += `&bodenFaktor=${bodenFaktor}`;
    weiterleitungsURl += `&jahreszeitFaktor=${jahreszeitFaktor}`;
    weiterleitungsURl += `&kommentar=${this._kommentarEingabe}`;

    this.navController.navigateForward(weiterleitungsURl);

    } catch (error: any){
      this.toastService.zeigeDialog("Eingabefehler", error.message);
    }
    
  }

  private jahreszeitFaktor(): number {
    switch(this._jahreszeitEingabe){
      case "Frühling":
        return 1.0;
      case "Sommer":
        return 1.25;
      case "Herbst":
        return 1.25;
        break;
      case "Winter":
        return 1.0;
    }
    return 1.0;
  }

  private pflanzenartFaktor(): number {
    switch(this._planzenartEingabe){
      case "Kakteen":
        return 0.25;
      case "Sukkulenten":
        return 0.5;
      case "normale Zimmerpflanzen":
        return 0.75;
    }
    return 1.0;
  }
  

  private eingabenUeberpruefen(): void {
    if(this._planzenartEingabe === ""){
      throw new Error("Bitte wählen Sie eine Pflanzenart aus.");
    }

    if(this._jahreszeitEingabe === ""){
      throw new Error("Bitte wählen Sie eine Jahreszeit aus.");
    }

    if(this._pflanzenGroesseInCmEingabe <= 0){
      throw new Error("Die Größe der Pflanze muss größer als 0 cm sein.");
    }else if(this._pflanzenGroesseInCmEingabe > 500){
      throw new Error("Die Berechnung ist nur für Zimmerpflanzen ausgelegt.");
    }

    if(this._kommentarEingabe.length > 200){
      throw new Error("Der Kommentar darf maximal 200 Zeichen lang sein.");
    }

  }

  public pinFormatterLicht(value: number) {
    switch(value){
      case 0: return 'Licht';
      case 1: return 'Licht';
      case 2: return 'Licht';
      case 3: return 'Schatten';
      case 4: return 'Schatten';
      default: return '';
    }
  }

  public pinFormatterBoden(value: number) {
    switch(value){
      case 0: return 'Sandig';
      case 1: return 'Sandig';
      case 2: return 'Normal';
      case 3: return 'Tonig';
      case 4: return 'Tonig';
      default: return '';
    }
  }

}
