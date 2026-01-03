import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class SpeicherVerwaltungService {
  constructor(private storage: Storage) {
    this.storage.create();
  }

  public async berechnungHinzufügen(
    neuerEintrag: DatenbankEintrag
  ): Promise<void> {
    let berechnungen = await this.alleBerechnungenLaden();
    berechnungen.push(neuerEintrag);
    berechnungen.sort(
      (a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime()
    );
    await this.storage.set('berechnungen', berechnungen);
    console.log('Berechnung hinzugefügt:', neuerEintrag);
  }

  public async alleBerechnungenLaden(): Promise<DatenbankEintrag[]> {
    return (await this.storage.get('berechnungen')) || [];
  }

  public async berechnungLöschen(eintrag: DatenbankEintrag): Promise<void> {
    let berechnungen = await this.alleBerechnungenLaden();
    berechnungen = berechnungen.filter(
      (berechnung) => berechnung.id !== eintrag.id
    );
    await this.storage.set('berechnungen', berechnungen);
    console.log(`Berechnung ${eintrag} gelöscht.`);
  }

  public async alleBerechnungenLöschen(): Promise<void> {
    await this.storage.remove('berechnungen');
    console.log('Alle Berechnungen gelöscht.');
  }

  public async berechnungenAnzahl(): Promise<number> {
    let berechnungen = await this.alleBerechnungenLaden();
    return berechnungen.length;
  }
}

export class DatenbankEintrag {
  constructor(
    public id: number,
    public pflanzenartFormatiert: string,
    public pflanzengroesseInCm: number,
    public jahreszeitFormatiert: string,
    public lichtFormatiert: string,
    public bodenFormatiert: string,
    public ergebnisInMl: string,
    public datum: string,
    public plantImagePath: string,
    public plantImageAltText: string,
    public plantImageTypeText: string,
    public kommentar: string = ''
  ) {}
}
