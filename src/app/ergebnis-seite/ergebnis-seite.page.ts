import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpeicherVerwaltungService, DatenbankEintrag } from '../SpeicherVerwaltungService';

@Component({
  selector: 'app-ergebnis-seite',
  templateUrl: './ergebnis-seite.page.html',
  styleUrls: ['./ergebnis-seite.page.scss'],
  standalone: false,
})
export class ErgebnisSeitePage {

  public readonly GAL_TO_ML_KONST: number = 3785.41;
  public readonly INCH_TO_CM_KONST: number = 2.54;

  public pflanzenartFormatiert: string | null;
  public pflanzenartFaktor: number | 1;
  public pflanzengroesseInInch: number | 0;
  public lichtFormatiert: string | null;
  public lichtFaktor: number | 1;
  public bodenFormatiert: string | null;
  public bodenFaktor: number | 1;
  public jahreszeitFormatiert: string | null;
  public jahreszeitFaktor: number | 1;
  public kommentar: string | null;

  public ergebnisInMl: string | null;

  public _pflanzenBildPfad: string = "";
  public _pflanzenBildAltText: string = "";
  public _pflanzenBildTypText: string = "";

  constructor(private route: ActivatedRoute, private speicherVerwaltungService: SpeicherVerwaltungService) { 

    this.pflanzenartFormatiert = this.route.snapshot.queryParamMap.get('pflanzenart');
    this.pflanzenartFaktor = Number(this.route.snapshot.queryParamMap.get('pflanzenartFaktor'));
    this.pflanzengroesseInInch = Number(this.route.snapshot.queryParamMap.get('pflanzengroesseInInch'));
    this.lichtFormatiert = this.route.snapshot.queryParamMap.get('lichtFormatiert');
    this.lichtFaktor = Number(this.route.snapshot.queryParamMap.get('lichtFaktor'));
    this.bodenFormatiert = this.route.snapshot.queryParamMap.get('bodenFormatiert');
    this.bodenFaktor = Number(this.route.snapshot.queryParamMap.get('bodenFaktor'));
    this.jahreszeitFormatiert = this.route.snapshot.queryParamMap.get('jahreszeit');
    this.jahreszeitFaktor = Number(this.route.snapshot.queryParamMap.get('jahreszeitFaktor'));
    this.kommentar = this.route.snapshot.queryParamMap.get('kommentar');
    this.ergebnisInMl = this.berechneWasserbedarf();

    this.pflanzenBildFestlegen();
    
    this.ergebnisSpeichern();
  }

  private pflanzenBildFestlegen() {
        if(this.pflanzenartFormatiert === "Sukkulenten"){

      this._pflanzenBildAltText = "Bild einer Sukkulente";
      this._pflanzenBildPfad = "assets/images/sukkulente.png";
      this._pflanzenBildTypText = "Sukkulente";

    }else if(this.pflanzenartFormatiert === "Kakteen"){
      
      this._pflanzenBildAltText = "Bild eines Kaktus";
      this._pflanzenBildPfad = "assets/images/kaktus.png";
      this._pflanzenBildTypText = "Kaktus";

    }else if(this.pflanzenartFormatiert === "normale Zimmerpflanzen"){

      this._pflanzenBildAltText = "Bild einer normalen Zimmerpflanze";
      this._pflanzenBildPfad = "assets/images/zimmerpflanze.png";
      this._pflanzenBildTypText = "normale Zimmerpflanze";

    }else if(this.pflanzenartFormatiert === "tropische Pflanzen"){
      
      this._pflanzenBildAltText = "Bild einer tropischen Pflanze";
      this._pflanzenBildPfad = "assets/images/tropische_pflanze.png";
      this._pflanzenBildTypText = "tropische Pflanze";
    }
  }

  private ergebnisSpeichern() {

    this.speicherVerwaltungService.berechnungHinzufügen(new DatenbankEintrag(
      Math.floor(Math.random() * 1000000),
      this.pflanzenartFormatiert!,
      parseFloat((this.pflanzengroesseInInch! * this.INCH_TO_CM_KONST).toFixed(2)), //umrechnung in cm und auf zwei nachkommastellen runden
      this.jahreszeitFormatiert!,
      this.lichtFormatiert!,
      this.bodenFormatiert!,
      this.ergebnisInMl!,
      new Date().toISOString(),
      this._pflanzenBildPfad,
      this._pflanzenBildAltText,
      this._pflanzenBildTypText,
      this.kommentar!
    ));

  }

  private berechneWasserbedarf(): string{
    //Formel von Webseite: Water Needs = (Plant Type Factor * Plant Size) + Plant Type Factor  * Sun Exposure Factor * Soil Type Factor * Season Factor
    let ergebnisTempInGalProMonat = this.pflanzenartFaktor! * this.pflanzengroesseInInch! + this.pflanzenartFaktor! * this.lichtFaktor! * this.bodenFaktor! * 1.0;

    let ergebnisTempInMl = ergebnisTempInGalProMonat *  this.GAL_TO_ML_KONST / 30; //umrechnung in ml pro tag

    if(ergebnisTempInMl < 0.01){
      return "< 0.01";
    } else {
      return ergebnisTempInMl.toFixed(2);
    }
  }
}