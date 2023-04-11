import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Patrimonio } from 'src/app/models/patrimonio';
import { PatrimonioService } from '../patrimonio.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-patrimonio-lista',
  templateUrl: './patrimonio-lista.component.html',
  styleUrls: ['./patrimonio-lista.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class PatrimonioListaComponent implements OnInit {
  patrimonios = new Array<Patrimonio>()
  patrimoniosLazyLoad = new Array<Patrimonio>()

  load: boolean = true
  totalDeRegistros: number = 0

  title: string = 'Patrimônios'
  constructor(
    private patrimonioService: PatrimonioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const departamento = this.route.snapshot.params['departamento'];
    this.load = true;
    if (departamento) {
      this.getItensDepartamento(departamento)
      this.title = "Patrimônio"
    } else {
      this.getPatrimonios()
    }

  }

  getPatrimonios() {
    this.load = false
    this.patrimonioService.listar().subscribe(
      (response) => {
        this.patrimonios = [...response]
        this.patrimoniosLazyLoad = [...response]
        this.totalDeRegistros = response.length
      }
    )
  }

  getItensDepartamento(departamento: string) {
    this.load = false
    this.patrimonioService.getByDepartamento(departamento).subscribe(
      (response) => {
        this.patrimonios = [...response]
        this.patrimoniosLazyLoad = [...response]
        this.totalDeRegistros = response.length
      },
      erro => {
        if (erro.status == 404) {
          this.messageService.add({key: 'bc', severity: 'error', summary: 'Erro 404', detail: 'Página não encontrada.' });
        } else if (erro.status == 500) {
          this.messageService.add({key: 'bc', severity: 'error', summary: 'Erro 500', detail: 'Esse atributo pode estar vinculado a um patrimônio e não deve ser excluído. ' });
        }
        else if (erro != null) {
          this.messageService.add({key: 'bc', severity: 'error', summary: 'Erro de sistema', detail: 'Estamos enfrentado alguns erros de sistema. Tente novamente mais tarde.' });
        }
      }

    )
  }

  loadCustomers(event: LazyLoadEvent) {
    this.load = true;
    setTimeout(() => {
      if (this.patrimonios) {
        let numPrimeiraLinha: number = Number(event.first)
        let numLinhasPagina: number = (numPrimeiraLinha + Number(event.rows))
        this.patrimonios = [...this.patrimoniosLazyLoad.slice(numPrimeiraLinha, numLinhasPagina)];

        this.load = false;
      }
    }, 1000);
  }

  lectionChange(value = []) {
    this.patrimonios = [...value];
  }

  onSelectionChange(value = []) {
    this.patrimonios = [...value];
  }

  onDelete(id: number) {
    this.confirmationService.confirm({
      message: 'Deseja realmente DELETAR esse Patrimonio?',
      header: 'DELETAR',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          key: 'bc',
          severity: 'info',
          summary: 'Confirmado',
          detail: 'Operação confirmada!'
        });
        this.patrimonioService.getExcluir(id).subscribe(
          () => {
            this.messageService.add({
              key: 'bc',
              severity: 'success',
              summary: 'Deletado',
              detail: 'Patrimonio deletado com sucesso!'
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
