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

  public Pflanzenart: string | null;
  public PflanzenartFaktor: number | null;
  public TopfVolumen: number | null;
  public Licht: number | null;
  public Temperatur: number | null;
  public Boden: number | null;
  public Klima: number | null;
  public Kommentar: string | null;

  public Ergebnis: string | null;

  public _plantImagePath: string = "";
  public _plantImageAltText: string = "";
  public _plantImageTypeText: string = "";

  constructor(private route: ActivatedRoute, private speicherVerwaltungService: SpeicherVerwaltungService) { 

    this.Pflanzenart = this.route.snapshot.queryParamMap.get('Pflanzenart');
    this.PflanzenartFaktor = Number(this.route.snapshot.queryParamMap.get('PflanzenartFaktor'));
    this.TopfVolumen = Number(this.route.snapshot.queryParamMap.get('TopfVolumen'));
    this.Licht = Number(this.route.snapshot.queryParamMap.get('Licht'));
    this.Temperatur = Number(this.route.snapshot.queryParamMap.get('Temperatur'));
    this.Boden = Number(this.route.snapshot.queryParamMap.get('Boden'));
    this.Klima = Number(this.route.snapshot.queryParamMap.get('Klima'));
    this.Kommentar = this.route.snapshot.queryParamMap.get('Kommentar');
    this.Ergebnis = this.berechneWasserbedarf();

    if(this.Pflanzenart === "Sukkulenten"){

      this._plantImageAltText = "Bild einer Sukkulente";
      this._plantImagePath = "assets/images/sukkulente.png";
      this._plantImageTypeText = "Sukkulente";

    }else if(this.Pflanzenart === "Kakteen"){
      
      this._plantImageAltText = "Bild eines Kaktus";
      this._plantImagePath = "assets/images/kaktus.png";
      this._plantImageTypeText = "Kaktus";

    }else if(this.Pflanzenart === "normale Zimmerpflanzen"){

      this._plantImageAltText = "Bild einer normalen Zimmerpflanze";
      this._plantImagePath = "assets/images/zimmerpflanze.png";
      this._plantImageTypeText = "normale Zimmerpflanze";

    }else if(this.Pflanzenart === "tropische Pflanzen"){
      
      this._plantImageAltText = "Bild einer tropischen Pflanze";
      this._plantImagePath = "assets/images/tropische_pflanze.png";
      this._plantImageTypeText = "tropische Pflanze";

    }


    this.speicherVerwaltungService.berechnungHinzufügen(new DatenbankEintrag(
      Math.floor(Math.random() * 1000000),
      this.Pflanzenart || "",
      this.TopfVolumen || 0,
      this.Licht || 0,
      this.Temperatur || 0,
      this.Boden || 0,
      this.Klima || 0,
      Number(this.Ergebnis) || 0,
      new Date().toISOString(),
      this._plantImagePath,
      this._plantImageAltText,
      this._plantImageTypeText,
      this.Kommentar || ""
    ));
  }

  private berechneWasserbedarf(): string{
    let ergebnisTemp: number = Math.round(this.TopfVolumen! * this.PflanzenartFaktor! * this.Licht! * this.Temperatur! * this.Boden! * this.Klima! * 100) / 100;

    if(ergebnisTemp < 0.01){
      return "< 0.01";
    } else {
      return ergebnisTemp.toString();
    }
  }
}