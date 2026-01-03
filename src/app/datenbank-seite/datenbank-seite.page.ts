import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DatenbankEintrag, SpeicherVerwaltungService } from '../SpeicherVerwaltungService';
import { ToastService } from '../toast-service';

@Component({
  selector: 'app-datenbank-seite',
  templateUrl: './datenbank-seite.page.html',
  styleUrls: ['./datenbank-seite.page.scss'],
  standalone: false,
})
export class DatenbankSeitePage{

  public datenbankEintraege: Promise<DatenbankEintrag[]> = Promise.resolve([]);

  constructor(private speicherVerwaltungService: SpeicherVerwaltungService,
              private toastController: ToastController,
              private toastService: ToastService) {
  }

  private ionViewWillEnter() {
    this.datenbankEintraege = this.speicherVerwaltungService.alleBerechnungenLaden();
  }

  public async eintragLoeschen(eintrag: DatenbankEintrag) {

    const sicherheitsfrage = `Möchten Sie den Eintrag für die Pflanze "${eintrag.plantImageTypeText}" wirklich löschen?`;

    const jaHandler = async () => {
      await this.speicherVerwaltungService.berechnungLöschen(eintrag.id);
      this.ionViewWillEnter();
      this.toastService.zeigeToast(`Der Eintrag für die Pflanze "${eintrag.plantImageTypeText}" wurde gelöscht.`);
    };

    const abbrechenHandler = async () => {
      this.toastService.zeigeToast('Löschvorgang abgebrochen.');
    };

    this.toastService.sicherheitsAbfrage(sicherheitsfrage, jaHandler, abbrechenHandler);

  }

  public async alleEintraegeLoeschen() {

    if ( (await this.speicherVerwaltungService.berechnungenAnzahl()) === 0 ) {
      this.toastService.zeigeToast('Es sind keine Einträge in der Datenbank vorhanden.');
      return;
    }

    const sicherheitsfrage = `Möchten Sie wirklich alle Einträge in der Datenbank löschen? Dieser Vorgang kann nicht rückgängig gemacht werden.`;
    const jaHandler = async () => {
      await this.speicherVerwaltungService.alleBerechnungenLöschen();
      this.datenbankEintraege = this.speicherVerwaltungService.alleBerechnungenLaden();
      this.toastService.zeigeToast('Alle Einträge wurden gelöscht.');
    };

    const abbrechenHandler = async () => {
      this.toastService.zeigeToast('Löschvorgang abgebrochen.');
    };
    
    this.toastService.sicherheitsAbfrage(sicherheitsfrage, jaHandler, abbrechenHandler);
  }
}
