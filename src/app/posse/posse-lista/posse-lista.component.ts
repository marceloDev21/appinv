import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Posse } from 'src/app/models/posse';
import { PosseService } from '../posse.service';

@Component({
  selector: 'app-posse-lista',
  templateUrl: './posse-lista.component.html',
  styleUrls: ['./posse-lista.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class PosseListaComponent implements OnInit {
  posses = new Array<Posse>()
  possesLazyLoad = new Array<Posse>()

  load: boolean = true
  totalDeRegistros: number = 0
 
  title = 'Posses'

  constructor(
    private PosseService: PosseService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService ,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.load = false;
    this.getDepartamentos()

  }

  getDepartamentos() {
    this.PosseService.listar().subscribe(
      (response) => {
        this.posses = [...response]
        this.possesLazyLoad = [...response]
        this.totalDeRegistros = response.length
      }
    )
  }

  loadCustomers(event: LazyLoadEvent) {
    this.load = true;
    setTimeout(() => {
      if (this.posses) {
        let numPrimeiraLinha: number = Number(event.first)
        let numLinhasPagina: number = (numPrimeiraLinha + Number(event.rows))
        this.posses = [...this.possesLazyLoad.slice(numPrimeiraLinha, numLinhasPagina)];

        this.load = false;
      }
    }, 1000);
  }

  onSelectionChange(value = []) {
    this.posses = [...value];
  }

  onDelete(id: number) {
    this.confirmationService.confirm({
      message: 'Deseja realmente DELETAR esse Marca?',
      header: 'DELETAR',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          key: 'bc',
          severity: 'info',
          summary: 'Confirmado',
          detail: 'Operação confirmada!'
        });
        this.PosseService.getExcluir(id).subscribe(
          () => {
            this.messageService.add({
              key: 'bc',
              severity: 'success',
              summary: 'Deletado',
              detail: 'Marca deletada com sucesso!'
            });
            setTimeout(() => {
              return window.location.reload();
            }, 1000)
          }, (erro) => {
            if (erro.status == 404) {
              this.messageService.add({
                key: 'bc',
                severity: 'error',
                summary: 'Erro 404',
                detail: 'Página não encontrada.'
              });
            } else if (erro.status == 500) {
              this.messageService.add({
                key: 'bc',
                severity: 'error',
                summary: 'Erro 500',
                detail: 'Esse atributo pode estar vinculado a um patrimônio e não deve ser excluído. '
              });
            }
            else if (erro != null) {
              this.messageService.add({
                key: 'bc',
                severity: 'error',
                summary: 'Erro ao deletar',
                detail: 'Estamos enfrentado alguns erros de sistema. Tente novamente mais tarde.'
              });
            }
            console.log(erro)
          }
        );

      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              key: 'bc',
              severity: 'error',
              summary: 'Rejeitado',
              detail: 'Você rejeitou a operação.'
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              key: 'bc',
              severity: 'warn',
              summary: 'Cancelado',
              detail: 'Você cancelou a operação.'
            });
            break;
        }
      }
    });
  }

  clear(table: Table) {
    table.clear();
  }

}
