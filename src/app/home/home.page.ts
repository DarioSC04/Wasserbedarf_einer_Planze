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

  public _planzenartEingabe : string = "";
  public _topfVolumenEingabe : number = 0;
  public _lichtEingabe : number = 2;
  public _temperaturEingabe : number = 2;
  public _bodenEingabe : number = 2;
  public _klimaEingabe : number = 2;
  public _kommentarEingabe : string = "";

  constructor(private toastController: ToastController, private navController: NavController, private toastService: ToastService) {}

  public onBerechnungButton(){

    try{

    this.eingabenUeberpruefen();

    //factoren umrechechnen
    
    let lichtFaktor: number = 0.8 + this._lichtEingabe * 0.1;
    let temperaturFaktor: number = 0.8 + this._temperaturEingabe * 0.1;
    let bodenFaktor: number = 0.8 + this._bodenEingabe * 0.1;
    let klimaFaktor: number = 0.8 + this._klimaEingabe * 0.1;

    let pflanzenartFaktor: number = 1.0;
    switch(this._planzenartEingabe){
      case "Kakteen":
        pflanzenartFaktor = 0.01;
        break;
      case "Sukkulenten":
        pflanzenartFaktor = 0.03;
        break;
      case "normale Zimmerpflanzen":
        pflanzenartFaktor = 0.08;
        break;
      case "tropische Pflanzen":
        pflanzenartFaktor = 0.18;
        break;
      default:
        throw new Error("Ungültige Pflanzenart ausgewählt");
    }

    this.navController.navigateForward(`/ergebnis-seite?Pflanzenart=${this._planzenartEingabe}&PflanzenartFaktor=${pflanzenartFaktor}&TopfVolumen=${this._topfVolumenEingabe}&Licht=${lichtFaktor}&Temperatur=${temperaturFaktor}&Boden=${bodenFaktor}&Klima=${klimaFaktor}&Kommentar=${this._kommentarEingabe}`);

    } catch (error: any){
      this.toastService.zeigeDialog("Eingabefehler", error.message);
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
