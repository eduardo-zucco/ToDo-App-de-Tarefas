import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonFab, IonFabButton, IonIcon, AlertController,
  IonList, IonItem, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonFooter, IonAvatar, IonBadge, IonButton, IonActionSheet, ActionSheetController
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { add, checkmarkCircle, closeCircle, informationCircle, radioButtonOff, trash } from 'ionicons/icons';
import { TarefaService } from '../../services/tarefa.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonLabel, IonItem, IonList,
    IonHeader, IonToolbar, IonTitle,
    IonContent, IonFab, IonFabButton, IonIcon,
    CommonModule, FormsModule, IonItemSliding,
    IonItemOptions, IonItemOption, IonFooter
],
})
export class HomePage {
  tarefaCollection: any[] = [];

  constructor(
    private alertController: AlertController,
    private tarefaService: TarefaService,
    private actionSheetCtrl: ActionSheetController
  ) {
    addIcons({ add, trash, radioButtonOff, checkmarkCircle, closeCircle, informationCircle });
  }

  ionViewDidEnter() {
    this.listarTarefa();
  }

  listarTarefa() {
    this.tarefaCollection = this.tarefaService.listar();
  }

  public async showAdd() {
    const alert = await this.alertController.create({
      header: 'Informe a tarefa',
      cssClass: 'alert-wrapper',
      inputs: [
        {
          name: 'tarefa',
          type: 'text',
          placeholder: 'Descreva sua tarefa',
          cssClass: 'custom-alert-input',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'custom-alert-confirm',
        },
        {
          text: 'Confirmar',
          cssClass: 'custom-alert',
          handler: (data) => {
            const nome = data.tarefa?.trim();
            if (nome) {
              const novaTarefa = { nome: nome };
              this.tarefaService.salvar(novaTarefa, () => {
                this.listarTarefa();
              });
            }
          },
        }
      ]
    });

    await alert.present();
  }
  delete(item: any) {
    this.tarefaService.delete(item, () => {
      this.listarTarefa();
    });
  }

  async openActions(tarefa: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'O que deseja fazer?',
      mode: 'ios',
      buttons:[
          {
            text: tarefa.feito ? 'Colocar Como Pendente' : 'Marcar Como Realizado',
            icon: tarefa.feito ? 'close-circle' : 'checkmark-circle',
            handler: () => {
              tarefa.feito = !tarefa.feito;

              this.tarefaService.atualizar(tarefa, () => { this.listarTarefa(); })
            }
          },

          {
            text: 'Cancel',
            role: 'cancel',
            data: {action: 'cancel'},
          }
        ]

    });

    await actionSheet.present();
  }


}
