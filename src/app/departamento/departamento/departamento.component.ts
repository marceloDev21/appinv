import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Departamento } from 'src/app/models/departamento';
import { DepartamentoService } from '../departamento.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class DepartamentoComponent implements OnInit {
  titulo: string = 'Cadastrar Departamento'
  departamento = new Departamento()

  constructor(
    private departamentoService: DepartamentoService,

    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id: number = this.route.snapshot.params['id'];

    if (id) {
      this.titulo = 'Alterar Departamento'
      this.getDepartamento(id)
    }
  }

  getDepartamento(id: number) {
    this.departamentoService.getById(id).subscribe(
      (response) => {
        this.departamento = { ...response }
      }
    )
  }

  salvar() {
    this.confirmationService.confirm({
      message: 'Deseja realmente salvar esse departamento?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.getIsEditando()) {
          this.getAlterar()
        } else {
          this.getIncluir()
        }
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({key: 'bc', severity: 'error', summary: 'Rejeitado', detail: 'Você rejeitou a operação.' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ key: 'bc', severity: 'warn', summary: 'Cancelado', detail: 'Você cancelou a operação.' });
            break;
        }
      }
    });
  }

  getAlterar() {

    this.departamentoService.getAlterar(this.departamento.id, this.departamento).subscribe(
      (response) => {

        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Alteração ', detail: 'departamento alterada com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/departamentos'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getIncluir() {

    this.departamentoService.getIncluir(this.departamento).subscribe(
      (response) => {
        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Inclusão ', detail: 'Departamento incluido com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/departamentos'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getIsEditando() {
    return Boolean(this.departamento.id)
  }

  voltar() {
    window.history.back()
  }


}
