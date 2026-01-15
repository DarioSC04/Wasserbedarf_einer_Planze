import { Component } from '@angular/core';
import {
  DatenbankEintrag,
  SpeicherVerwaltungService,
} from '../speicher-verwaltung-service';
import { ToastService } from '../toast-service';

@Component({
  selector: 'app-datenbank-seite',
  templateUrl: './datenbank-seite.page.html',
  styleUrls: ['./datenbank-seite.page.scss'],
  standalone: false,
})
export class DatenbankSeitePage {
  public datenbankEintraege: Promise<DatenbankEintrag[]> = Promise.resolve([]);
  public keineEintraegeVorhanden: Promise<boolean> = Promise.resolve(false);

  constructor(
    private speicherVerwaltungService: SpeicherVerwaltungService,
    private toastService: ToastService
  ) {}

  /** muss hier sein um die Einträge zu laden beim betreten der Seite */
  ionViewWillEnter() {
    this.ladeEintraege();
  }

  private ladeEintraege() {
    this.datenbankEintraege =
      this.speicherVerwaltungService.alleBerechnungenLaden();
      this.keineEintraegeVorhanden = this.datenbankEintraege.then(eintraege => eintraege.length === 0); 
  }

  /** Löscht einen einzelnen Eintrag nach Bestätigung durch den Nutzer. */
  public async eintragLoeschen(eintrag: DatenbankEintrag) {
    const sicherheitsfrage = `Möchten Sie den Eintrag für die Pflanze "${eintrag.plantImageTypeText}" wirklich löschen?`;

    const jaHandler = async () => {
      await this.speicherVerwaltungService.berechnungLöschen(eintrag);
      this.ladeEintraege();
      this.toastService.zeigeToast(
        `Der Eintrag für die Pflanze "${eintrag.plantImageTypeText}" wurde gelöscht.`
      );
    };

    const abbrechenHandler = async () => {
      this.toastService.zeigeToast('Löschvorgang abgebrochen.');
    };

    this.toastService.sicherheitsAbfrage(
      sicherheitsfrage,
      jaHandler,
      abbrechenHandler
    );
  }

  /** Löscht alle Einträge nach Bestätigung durch den Nutzer. */
  public async alleEintraegeLoeschen() {
    if ((await this.speicherVerwaltungService.berechnungenAnzahl()) === 0) {
      this.toastService.zeigeToast(
        'Es sind keine Einträge in der Datenbank vorhanden.'
      );
      return;
    }

    const sicherheitsfrage = `Möchten Sie wirklich alle Einträge in der Datenbank löschen? Dieser Vorgang kann nicht rückgängig gemacht werden.`;
    const jaHandler = async () => {
      await this.speicherVerwaltungService.alleBerechnungenLöschen();
      this.datenbankEintraege =
        this.speicherVerwaltungService.alleBerechnungenLaden();
      this.toastService.zeigeToast('Alle Einträge wurden gelöscht.');
    };

    const abbrechenHandler = async () => {
      this.toastService.zeigeToast('Löschvorgang abgebrochen.');
    };

    this.toastService.sicherheitsAbfrage(
      sicherheitsfrage,
      jaHandler,
      abbrechenHandler
    );
  }
}
