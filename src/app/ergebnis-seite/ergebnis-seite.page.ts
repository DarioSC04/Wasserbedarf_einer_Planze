import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ToastService } from '../toast-service';
import {
  SpeicherVerwaltungService,
  DatenbankEintrag,
} from '../speicher-verwaltung-service';

@Component({
  selector: 'app-ergebnis-seite',
  templateUrl: './ergebnis-seite.page.html',
  styleUrls: ['./ergebnis-seite.page.scss'],
  standalone: false,
})
export class ErgebnisSeitePage implements OnInit {
  public readonly GAL_TO_ML_KONST: number = 3785.41;
  public readonly INCH_TO_CM_KONST: number = 2.54;

  public pflanzenartFormatiert: string | undefined;
  public pflanzenartFaktor: number | undefined;
  public pflanzengroesseInInch: number | undefined;
  public lichtFormatiert: string | undefined;
  public lichtFaktor: number | undefined;
  public bodenFormatiert: string | undefined;
  public bodenFaktor: number | undefined;
  public jahreszeitFormatiert: string | undefined;
  public jahreszeitFaktor: number | undefined;
  public kommentar: string | undefined;
  public ergebnisInMl: number | undefined;
  public ergebnisString: string | undefined;

  public _pflanzenBildPfad: string = '';
  public _pflanzenBildAltText: string = '';
  public _pflanzenBildTypText: string = '';

  constructor(
    private route: ActivatedRoute,
    private speicherVerwaltungService: SpeicherVerwaltungService,
    private navController: NavController,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.pflanzenartFormatiert = params['pflanzenart'] || '';
      this.pflanzenartFaktor = Number(params['pflanzenartFaktor']);
      this.pflanzengroesseInInch = Number(params['pflanzengroesseInInch']);
      this.lichtFormatiert = params['lichtFormatiert'] || '';
      this.lichtFaktor = Number(params['lichtFaktor']);
      this.bodenFormatiert = params['bodenFormatiert'] || '';
      this.bodenFaktor = Number(params['bodenFaktor']);
      this.jahreszeitFormatiert = params['jahreszeitFormatiert'] || '';
      this.jahreszeitFaktor = Number(params['jahreszeitFaktor']);
      this.kommentar = params['kommentar'] || '';

      this.ergebnisInMl = this.berechneWasserbedarf();

      if (this.ergebnisInMl < 1000 ) {
      this.ergebnisString = this.nummerInsDeutscheFormat(this.ergebnisInMl, -1) + ' ml pro Woche';
      }else{
      const ergebnisInL = (Number(this.ergebnisInMl) / 1000);
      this.ergebnisString = this.nummerInsDeutscheFormat(ergebnisInL, 2) + ' l pro Woche';
      }
      this.pflanzenBildFestlegen();
    });
  }

  private pflanzenBildFestlegen() {
    if (this.pflanzenartFormatiert === 'Sukkulenten') {
      this._pflanzenBildAltText = 'Bild einer Sukkulente';
      this._pflanzenBildPfad = 'assets/images/sukkulente.png';
      this._pflanzenBildTypText = 'Sukkulente';
    } else if (this.pflanzenartFormatiert === 'Kakteen') {
      this._pflanzenBildAltText = 'Bild eines Kaktus';
      this._pflanzenBildPfad = 'assets/images/kaktus.png';
      this._pflanzenBildTypText = 'Kaktus';
    } else if (this.pflanzenartFormatiert === 'normale Zimmerpflanzen') {
      this._pflanzenBildAltText = 'Bild einer normalen Zimmerpflanze';
      this._pflanzenBildPfad = 'assets/images/zimmerpflanze.png';
      this._pflanzenBildTypText = 'normale Zimmerpflanze';
    } else if (this.pflanzenartFormatiert === 'tropische Pflanzen') {
      this._pflanzenBildAltText = 'Bild einer tropischen Pflanze';
      this._pflanzenBildPfad = 'assets/images/tropische_pflanze.png';
      this._pflanzenBildTypText = 'tropische Pflanze';
    }
  }

  public onSpeichernButtonKlick() {
    const eintrag = new DatenbankEintrag(
      Math.floor(Math.random() * 1000000),
      this.pflanzenartFormatiert!,
      this.nummerInsDeutscheFormat(
        this.pflanzengroesseInInch! * this.INCH_TO_CM_KONST,2
      ), //umrechnung in cm und auf zwei nachkommastellen runden
      this.jahreszeitFormatiert!,
      this.lichtFormatiert!,
      this.bodenFormatiert!,
      this.ergebnisInMl!,
      this.ergebnisString!,
      new Date().toISOString(),
      this._pflanzenBildPfad,
      this._pflanzenBildAltText,
      this._pflanzenBildTypText,
      this.kommentar!
    );

    this.speicherVerwaltungService.berechnungHinzufügen(eintrag);
    console.log('Ergebnis gespeichert:', eintrag);

    this.toastService.zeigeToast('Ergebnis wurde gespeichert.');
    this.navController.navigateForward('/home');
  }

  /** Berechnet den wöchentlichen Wasserbedarf in ml. */
  private berechneWasserbedarf(): number {
    //Formel von Webseite: Water Needs = (Plant Type Factor * Plant Size) + Plant Type Factor  * Sun Exposure Factor * Soil Type Factor * Season Factor
    let ergebnisTempInGalProMonat =
      this.pflanzenartFaktor! * this.pflanzengroesseInInch! +
      this.pflanzenartFaktor! *
        this.lichtFaktor! *
        this.bodenFaktor! *
        this.jahreszeitFaktor!;

    let ergebnisTempInMl =
      (ergebnisTempInGalProMonat * this.GAL_TO_ML_KONST) / (30 / 7); //umrechnung in ml pro Woche
    return ergebnisTempInMl;
  }
  /** Formatiert eine Zahl auf ganze Zahlen und im deutschen Format. */
  private nummerInsDeutscheFormat(zahl: number, anzahlNachkommastellen: number): string {
    if (anzahlNachkommastellen < 0) {
      zahl = Math.round(zahl / Math.pow(10, -anzahlNachkommastellen)) * Math.pow(10, -anzahlNachkommastellen);
    }else{
    zahl = Number(zahl.toFixed(anzahlNachkommastellen));
    }
    return zahl.toLocaleString('de-DE');
  }
}
