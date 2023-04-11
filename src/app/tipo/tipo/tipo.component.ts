import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Tipo } from 'src/app/models/tipo';
import { TipoService } from '../tipo.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.css'],
  providers: [MessageService, ConfirmationService]
})

export class TipoComponent implements OnInit {
  titulo: string = 'Cadastrar Tipo'
  categoria = new Tipo()

  constructor(
    private tipoService: TipoService,

    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id: number = this.route.snapshot.params['id'];

    if (id) {
      this.titulo = 'Alterar Tipo'
      this.getTipo(id)
    }
  }

  getTipo(id: number) {
    this.tipoService.getById(id).subscribe(
      (response) => {
        this.categoria = { ...response }
      }
    )
  }

  salvar() {
    this.confirmationService.confirm({
      message: 'Deseja realmente salvar esse tipo?',
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
            this.messageService.add({ key: 'bc', severity: 'error', summary: 'Rejeitado', detail: 'Você rejeitou a operação.' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ key: 'bc', severity: 'warn', summary: 'Cancelado', detail: 'Você cancelou a operação.' });
            break;
        }
      }
    });
  }

  getAlterar() {

    this.tipoService.getAlterar(this.categoria.id, this.categoria).subscribe(
      (response) => {

        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Alteração ', detail: 'Tipo alterado com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/tipos'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getIncluir() {

    this.tipoService.getIncluir(this.categoria).subscribe(
      (response) => {
        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Inclusão ', detail: 'Tipo incluido com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/tipos'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getIsEditando() {
    return Boolean(this.categoria.id)
  }

  voltar() {
    window.history.back()
  }
}
