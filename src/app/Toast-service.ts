import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

/**
 * Klasse für Hilfsservice zur Erzeugung von Dialogen (Alerts) und Toasts.
 * Im Gegensatz zu Dialogen verschwinden Toasts wieder von selbst.
 * Für Fehlermeldungen sollten Dialoge verwendet werden.
 */

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  /**
   * Konstruktor für *Dependency Injection*.
   */
  constructor(
    private alertCtrl: AlertController,
    private toastController: ToastController
  ) {}

  /**
   * Alert/Dialog anzeigen.
   * <br><br>
   * Für die Anzeige von "\n" in {@param nachricht} wurde eine CSS-Regel
   * mit "white-space: pre-line" in der globalen CSS-Datei ("src/global.scss")
   * definiert.
   *
   * @param title  Dialog-Titel, z.B. "Fehler" oder "Ungültige Eingabe".
   *
   * @param nachricht  Eigentlich Nachricht des Dialogs.
   */
  async zeigeDialog(titel: string, nachricht: string) {
    const meinAlert = await this.alertCtrl.create({
      header: titel,
      message: nachricht,
      buttons: ['Ok'],
    });

    await meinAlert.present();
  }

  /**
   * Toast anzeigen. Sollte nicht für die Anzeige von Fehlermeldungen verwendet werden.
   *
   * @param nachricht  Anzuzeigender Text
   */
  async zeigeToast(nachricht: string) {
    const toast = await this.toastController.create({
      message: nachricht,
      duration: 2000,
    });

    await toast.present();
  }

  /**
   * Sicherheitsabfrage-Dialog anzeigen.
   *
   * @param sicherheitsfrage  Die Sicherheitsfrage, die im Dialog angezeigt werden soll.
   * @param jaHandler        Funktion, die ausgeführt wird, wenn der Benutzer auf "Weiter" klickt.
   * @param abbrechenHandler Funktion, die ausgeführt wird, wenn der Benutzer auf "Abbrechen" klickt.
   */

  async sicherheitsAbfrage(
    sicherheitsfrage: string,
    jaHandler: () => Promise<void>,
    abbrechenHandler: () => Promise<void>
  ): Promise<void> {
    const jaButton = {
      text: 'Weiter',
      handler: async () => {
        await jaHandler();
      },
    };

    const abbrechenButton = {
      text: 'Abbrechen',
      role: 'Cancel',
      handler: async () => {
        await abbrechenHandler();
      },
    };

    const meinAlert = await this.alertCtrl.create({
      header: 'Sicherheitsfrage',
      message: sicherheitsfrage,
      backdropDismiss: false,
      buttons: [abbrechenButton, jaButton],
    });

    await meinAlert.present();
  }
}
