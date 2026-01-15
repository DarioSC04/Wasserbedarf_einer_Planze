import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class SpeicherVerwaltungService {
  constructor(private storage: Storage) {
    this.storage.create();
  }
  /** Fügt einen neuen Eintrag zur Datenbank hinzu.
   * @param neuerEintrag Der hinzuzufügende als DatenbankEintrag Objekt.
   */

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

  /** Lädt alle gespeicherten Berechnungen aus der Datenbank. */
  public async alleBerechnungenLaden(): Promise<DatenbankEintrag[]> {
    return (await this.storage.get('berechnungen')) || [];
  }

  /** Löscht einen einzelnen Eintrag aus der Datenbank.
   * @param eintrag Der zu löschende Eintrag als DatenbankEintrag Objekt.
   */

  public async berechnungLöschen(eintrag: DatenbankEintrag): Promise<void> {
    let berechnungen = await this.alleBerechnungenLaden();
    berechnungen = berechnungen.filter(
      (berechnung) => berechnung.id !== eintrag.id
    );
    await this.storage.set('berechnungen', berechnungen);
    console.log(`Berechnung ${eintrag} gelöscht.`);
  }

  /** Löscht alle gespeicherten Berechnungen aus der Datenbank. */
  public async alleBerechnungenLöschen(): Promise<void> {
    await this.storage.remove('berechnungen');
    console.log('Alle Berechnungen gelöscht.');
  }

  /** Gibt die Anzahl der gespeicherten Berechnungen zurück. */
  public async berechnungenAnzahl(): Promise<number> {
    let berechnungen = await this.alleBerechnungenLaden();
    return berechnungen.length;
  }
}

/** Repräsentiert einen Eintrag in der Datenbank.
 * id: Eindeutige Identifikationsnummer des Eintrags.
 * pflanzenartFormatiert: Pflanzenart in der Mehrzahl z.B. "Kakteen".
 * pflanzengroesseInCm: Pflanzengröße in Zentimetern.
 * jahreszeitFormatiert: Jahreszeit als String.
 * lichtFormatiert: Formatierte Lichtverhältnisse von Vollsonne, Sonne, Halbschatten bis Schatten.
 * bodenFormatiert: Formatierter Bodentyp von Sandig, Normal bis Lehmig.
 * ergebnisInMl: Berechneter Wasserbedarf in Millilitern.
 * datum: Datum der Berechnung.
 * plantImagePath: Pfad zum Bild der Pflanze.
 * plantImageAltText: Alternativtext für das Pflanzenbild.
 * plantImageTypeText: Beschreibung der Pflanze in der Einahl, z.B. "Kaktus" statt wie in der auswahl "Kakteen", wichtig für die Anzeige in der Datenbankseite.
 * kommentar: Optionaler Kommentar des Nutzers
 */

export class DatenbankEintrag {
  constructor(
    public id: number,
    public pflanzenartFormatiert: string,
    public pflanzengroesseInCm: string,
    public jahreszeitFormatiert: string,
    public lichtFormatiert: string,
    public bodenFormatiert: string,
    public ergebnisInMl: number,
    public ergebnisString: string,
    public datum: string,
    public plantImagePath: string,
    public plantImageAltText: string,
    public plantImageTypeText: string,
    public kommentar: string = ''
  ) {}
}
