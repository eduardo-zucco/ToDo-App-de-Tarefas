import { Component, OnInit } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { Platform, ToastController, AlertController } from '@ionic/angular'
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  isMobile = false;
  isPWAInstalled = false;

  constructor(
    private alertCtrl: AlertController,
    private platform: Platform,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController
  ) { }


  async ngOnInit(): Promise<void> {
    this.swUpdate.versionUpdates.subscribe(async (event) => {

      if (event.type === 'VERSION_READY') {
        const alert = await this.alertCtrl.create({
          header: 'Oba, temos novidades!',
          subHeader: 'Há uma nova versão disponível da aplicação.',
          message: 'Deseja atualizar agora?',
          buttons: [
            'Mais Tarde',
            {
              text: 'Instalar',
              handler: () => { this.swUpdate.activateUpdate().then(() => location.reload()); }
            }
          ]
        });
        alert.present();
      }

    });

    /*await this.platform.ready();

    this.isMobile = this.platform.is('android') || this.platform.is('ios');

    if (!this.isMobile) {
      this.checkForUpdate();
      if (!this.isPWAInstalled) {
        this.listenForInstallEvent()
      }
    }


  }

  private async checkForUpdate() {
    try {
      const isUpdateAvailable = await this.swUpdate.checkForUpdate();

      if (isUpdateAvailable) {
        console.log('Atualização detectada manualmente.');
      } else {
        console.log('Nenhuma atualização disponível no momento.');
      }
    } catch (err) {
      console.warn('Erro ao checar por atualizações:', err);
    }
  }

  private deferredPrompt: any;

  private listenForInstallEvent(): void {
    window.addEventListener('beforeinstallprompt', (event: any) => {
      // Evita o prompt automático
      event.preventDefault();

      // Armazena o evento para uso posterior
      this.deferredPrompt = event;

      // Marca como não instalado ainda
      this.isPWAInstalled = false;

      // Mostra uma notificação personalizada
      this.toastCtrl.create({
        message: 'Deseja instalar o app?',
        position: 'bottom',
        buttons: [
          {
            text: 'Instalar',
            handler: () => {
              this.promptInstall();
            }
          },
          {
            text: 'Fechar',
            role: 'cancel'
          }
        ]
      }).then(toast => toast.present());
    });

    // Detecta se já está instalado
    window.addEventListener('appinstalled', () => {
      this.isPWAInstalled = true;
      this.deferredPrompt = null;

      this.toastCtrl.create({
        message: 'Aplicativo instalado com sucesso!',
        duration: 3000,
        color: 'success'
      }).then(t => t.present());
    });
  }
  private promptInstall(): void {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();

      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuário aceitou a instalação');
        } else {
          console.log('Usuário recusou a instalação');
        }
        this.deferredPrompt = null;
      });
    }*/
  }


}
