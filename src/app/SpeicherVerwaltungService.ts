import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class SpeicherVerwaltungService {

  constructor(private storage: Storage) {

    this.storage.create();

    // für den strat der app 3 test einträge hinzufügen
    this.alleBerechnungenLaden().then(async (berechnungen) => {
      if (berechnungen.length === 0) {
        let testEintraege: DatenbankEintrag[] = [
          new DatenbankEintrag(1, "Sukkulenten", 5, 3, 20, 2, 3, 150, new Date().toISOString(), "assets/images/sukkulente.png", "Bild einer Sukkulente", "Sukkulente","Beispielkommentar für Sukkulente"),
          new DatenbankEintrag(2, "Kakteen", 3, 4, 25, 1, 4, 100, new Date().toISOString(), "assets/images/kaktus.png", "Bild eines Kaktus", "Kaktus","Beispielkommentar für Kaktus"),
          new DatenbankEintrag(3, "normale Zimmerpflanzen", 7, 5, 22, 3, 2, 200, new Date().toISOString(), "assets/images/zimmerpflanze.png", "Bild einer normalen Zimmerpflanze", "normale Zimmerpflanze","Beispielkommentar für normale Zimmerpflanze"),
        ];
        await this.storage.set('berechnungen', testEintraege);
      }
    });

  }

  public async berechnungHinzufügen(value: DatenbankEintrag): Promise<void> {

    let berechnungen = await this.alleBerechnungenLaden();
    berechnungen.push(value);
    berechnungen.sort((a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime());
    await this.storage.set('berechnungen', berechnungen);
  }

  public async alleBerechnungenLaden(): Promise<DatenbankEintrag[]> {
    return await this.storage.get('berechnungen') || [];
  }

  public async berechnungLöschen(id: number): Promise<void> {
    let berechnungen = await this.alleBerechnungenLaden();
    berechnungen = berechnungen.filter(berechnung => berechnung.id !== id);
    await this.storage.set('berechnungen', berechnungen);
  }

  public async alleBerechnungenLöschen(): Promise<void> {
    await this.storage.remove('berechnungen');
  }

  public async berechnungenAnzahl(): Promise<number> {
    let berechnungen = await this.alleBerechnungenLaden();
    return berechnungen.length;
  }
}

export class DatenbankEintrag {
  constructor(
    public id: number,
    public pflanzenart: string,
    public topfVolumen: number,
    public licht: number,
    public temperatur: number,
    public boden: number,
    public klima: number,
    public ergebnis: number,
    public datum: string,
    public plantImagePath: string,
    public plantImageAltText: string,
    public plantImageTypeText: string,
    public kommentar: string = ""
  ) {}
}