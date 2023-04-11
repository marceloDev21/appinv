import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, LazyLoadEvent, MessageService } from 'primeng/api';
import { Marca } from 'src/app/models/marca';
import { MarcaService } from '../marca.service';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-marca-lista',
  templateUrl: './marca-lista.component.html',
  styleUrls: ['./marca-lista.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class MarcaListaComponent implements OnInit {
  marcas = new Array<Marca>()
  marcasLazyLoad = new Array<Marca>()

  load: boolean = true
  totalDeRegistros: number = 0

  title = 'Marcas' 

  constructor(
    private marcasService: MarcaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.load = false;
    this.getDepartamentos()

  }

  getDepartamentos() {
    this.marcasService.listar().subscribe(
      (response) => {
        this.marcas = [...response]
        this.marcasLazyLoad = [...response]
        this.totalDeRegistros = response.length
      }
    )
  }

  loadCustomers(event: LazyLoadEvent) {
    this.load = true;
    setTimeout(() => {
      if (this.marcas) {
        let numPrimeiraLinha: number = Number(event.first)
        let numLinhasPagina: number = (numPrimeiraLinha + Number(event.rows))
        this.marcas = [...this.marcasLazyLoad.slice(numPrimeiraLinha, numLinhasPagina)];

        this.load = false;
      }
    }, 1000);
  }

  onSelectionChange(value = []) {
    this.marcas = [...value];
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
        this.marcasService.getExcluir(id).subscribe(
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
