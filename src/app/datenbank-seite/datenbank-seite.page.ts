import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { DatenbankEintrag, SpeicherVerwaltungService } from '../SpeicherVerwaltungService';

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
              private alertCtrl: AlertController) {
  }

  private ionViewWillEnter() {
    this.datenbankEintraege = this.speicherVerwaltungService.alleBerechnungenLaden();
  }

  public async eintragLoeschen(eintrag: DatenbankEintrag) {

    const sicherheitsfrage = `Möchten Sie den Eintrag für die Pflanze "${eintrag.pflanzenart}" wirklich löschen?`;

    const jaHandler = async () => {
      await this.speicherVerwaltungService.berechnungLöschen(eintrag.id);
      this.datenbankEintraege = this.speicherVerwaltungService.alleBerechnungenLaden();
      this.sendToast(`Der Eintrag für die Pflanze "${eintrag.pflanzenart}" wurde gelöscht.`);
    };

    const abbrechenHandler = async () => {
      this.sendToast('Löschvorgang abgebrochen.');
    };

    this.alertSenden(sicherheitsfrage, jaHandler, abbrechenHandler);

  }

  public async alleEintraegeLoeschen() {

    const sicherheitsfrage = `Möchten Sie wirklich alle Einträge in der Datenbank löschen? Dieser Vorgang kann nicht rückgängig gemacht werden.`;
    const jaHandler = async () => {
      await this.speicherVerwaltungService.alleBerechnungenLöschen();
      this.datenbankEintraege = this.speicherVerwaltungService.alleBerechnungenLaden();
      this.sendToast('Alle Einträge wurden gelöscht.');
    };

    const abbrechenHandler = async () => {
      this.sendToast('Löschvorgang abgebrochen.');
    }; 
    this.alertSenden(sicherheitsfrage, jaHandler, abbrechenHandler);
  }

  private async alertSenden(sicherheitsfrage: string, jaHandler: () => Promise<void>, abbrechenHandler: () => Promise<void>) : Promise<void> {
        const jaButton = {
        text: "Weiter",
        handler: async () => {
            await jaHandler();
        }
    };

    const abbrechenButton = {
        text: "Abbrechen",
        role: "Cancel",
        handler: async () => {
            await abbrechenHandler();
        }
    };

    const meinAlert =
          await this.alertCtrl.create({
              header         : "Sicherheitsfrage",
              message        : sicherheitsfrage,
              backdropDismiss: false,
              buttons        : [ jaButton, abbrechenButton ]
          });

    await meinAlert.present();
  }

  private async sendToast(text: string) : Promise<void>{
    const toast = await this.toastController.create({
      message: text,
      duration: 1500,
      position: "bottom",
    });

    await toast.present();
  }
}
