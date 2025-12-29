import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { IonRange } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})

export class HomePage {

  public _planzenartEingabe : string = "";
  public _topfVolumenEingabe : number = 0;
  public _lichtEingabe : number = 2;
  public _temperaturEingabe : number = 2;
  public _bodenEingabe : number = 2;
  public _klimaEingabe : number = 2;

  constructor(public toastController: ToastController) {}

  public onBerechnungButton(){

    try{

    this.eingabenUeberpruefen();

    //factoren umrechechnen
    
    let lichtFaktor: number = 0.8 + this._lichtEingabe * 0.1;
    let temperaturFaktor: number = 0.8 + this._temperaturEingabe * 0.1;
    let bodenFaktor: number = 0.8 + this._bodenEingabe * 0.1;
    let klimaFaktor: number = 0.8 + this._klimaEingabe * 0.1;

    let planzenartfactor: number = 1.0;
    switch(this._planzenartEingabe){
      case "Sukkulenten":
        planzenartfactor = 0.03;
        break;
      case "normale Zimmerpflanzen":
        planzenartfactor = 0.08;
        break;
      case "tropische Pflanzen":
        planzenartfactor = 0.18;
        break;
      default:
        throw new Error("Ungültige Pflanzenart ausgewählt");
    }
    
    let ergebnis: number = this._topfVolumenEingabe * planzenartfactor * lichtFaktor * temperaturFaktor * bodenFaktor * klimaFaktor;
    let roundedErgebnis: number = Math.round(ergebnis * 100) / 100;

    if(roundedErgebnis < 0.01){
      this.sendToast("Der Wasserbedarf der Pflanze beträgt weniger als 0.01 Liter pro Woche.");
      return;
    }else{
    this.sendToast("Der Wasserbedarf der Pflanze beträgt " + roundedErgebnis.toString() + " Liter pro Woche.");
    }

    } catch (error: any){
      this.sendToast(error.message);
    }
    
  }
  

  private eingabenUeberpruefen(): void {
    if(this._planzenartEingabe === ""){
      throw new Error("Bitte wählen Sie eine Pflanzenart aus.");
    }

    if(isNaN(this._topfVolumenEingabe)||this._topfVolumenEingabe <= 0){
      throw new Error("Bitte geben Sie ein gültiges Topfvolumen ein.");
    }else if(this._topfVolumenEingabe > 1000){
      throw new Error("Die Berechnung ist nur für Zimmerpflanzen ausgelegt.");
    }

  }

  private async sendToast(text: string) : Promise<void>{
    const toast = await this.toastController.create({
      message: text,
      duration: 1500,
      position: "bottom",
    });

    await toast.present();
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

  public pinFormatterTemp(value: number) {
    switch(value){
      case 0: return 'Kalt';
      case 1: return 'Kalt';
      case 2: return 'Mild';
      case 3: return 'Warm';
      case 4: return 'Warm';
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

  public pinFormatterKlima(value: number) {
    switch(value){
      case 0: return 'Trocken';
      case 1: return 'Trocken';
      case 2: return 'Normal';
      case 3: return 'Feucht';
      case 4: return 'Feucht';
      default: return '';
    }
  }
  

}
