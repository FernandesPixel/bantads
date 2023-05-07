import { Injectable } from '@angular/core';
import { Gerente } from 'src/app/shared/model/gerente';

const LS_CHAVE:string = 'gerentes';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  listarTodos(): Gerente[]{
    const gerentes = localStorage[LS_CHAVE];
    return gerentes ? JSON.parse(gerentes) : [];
  }

  inserir(gerente:Gerente): void{
    const gerentes = this.listarTodos();
    gerente.id = new Date().getMilliseconds();
    gerentes.push(gerente);
    localStorage[LS_CHAVE] = JSON.stringify(gerentes);
  }
  
  buscarPorId(id:number):Gerente | undefined{
    const gerentes: Gerente[] = this.listarTodos();

    return gerentes.find(gerente => gerente.id === id);
  }

  atualizar(gerente: Gerente): void{
    const gerentes: Gerente[] = this.listarTodos();
    gerentes.forEach((obj, index, objs) => {
      if(gerente.id === obj.id){
        objs[index] = gerente;
      }
    });
    console.log(gerentes);
    localStorage[LS_CHAVE] = JSON.stringify(gerentes);
  }

  remover(id:number):void{
    let gerentes: Gerente[] = this.listarTodos();

    gerentes = gerentes.filter(gerente => gerente.id !== id);

    localStorage[LS_CHAVE] = JSON.stringify(gerentes);
  }
}