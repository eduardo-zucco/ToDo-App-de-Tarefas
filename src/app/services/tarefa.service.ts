import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  tarefaCollection: any[] = [];
  key = 'tarefaCollection';
  constructor() { }

  salvar(tarefa: any, callback: Function | null = null) {
    tarefa.feito = false;
    //Obter do local storage
    let value = localStorage.getItem(this.key);
    if (value == null || value == undefined) {
      this.tarefaCollection.push(tarefa);
      localStorage.setItem(this.key, JSON.stringify(this.tarefaCollection));
    }
    else {
      let collection: any[] = JSON.parse(value);
      collection.push(tarefa);
      localStorage.setItem(this.key, JSON.stringify(collection));

    }
    if (callback != null && typeof callback === 'function') {
      callback();
    }
  }

  listar() {
    //obter do localStorage
    let value = localStorage.getItem(this.key);
    if (value == null || value == undefined) {
      return [];
    }

    let collection: any[] = JSON.parse(value);
    return collection;
  }

  delete(tarefa: any, callback: Function | null = null) {
    let value = localStorage.getItem(this.key);
    if (value == null || value == undefined) {
      return;
    }

    let collection: any[] = JSON.parse(value);

    let resultCollection = collection.filter(item => { return item.nome != tarefa.nome });
    localStorage.setItem(this.key, JSON.stringify(resultCollection));

    if (callback != null && typeof callback === 'function') {
      callback();
    }
  }

  atualizar(tarefa: any,  callback: Function | null = null) {
    let value = localStorage.getItem(this.key);
    if (value == null || value == undefined) {
      return;
    }
    else {
      let collection: any[] = JSON.parse(value);

      collection.forEach(item =>{
        if(item.nome == tarefa.nome){
          item.feito = tarefa.feito
        }}
      );

      localStorage.setItem(this.key, JSON.stringify(collection));

    }
    if (callback != null && typeof callback === 'function') {
      callback();
    }
  }
}
