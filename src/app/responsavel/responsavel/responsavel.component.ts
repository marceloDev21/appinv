import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Pessoa } from 'src/app/models/pessoa';
import { ResponsavelService } from '../responsavel.service';

@Component({
  selector: 'app-responsavel',
  templateUrl: './responsavel.component.html',
  styleUrls: ['./responsavel.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class ResponsavelComponent implements OnInit {
  titulo: string = 'Cadastrar Responsável'
  responsavel = new Pessoa()

  constructor(
    private responsavelService: ResponsavelService,

    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id: number = this.route.snapshot.params['id'];

    if (id) {
      this.titulo = 'Alterar Responsavel'
      this.getResponsavel(id)
    }
  }

  getResponsavel(id: number) {
    this.responsavelService.getById(id).subscribe(
      (response) => {
        this.responsavel = { ...response }
      }
    )
  }

  salvar() {
    this.confirmationService.confirm({
      message: 'Deseja realmente salvar esse responsavel?',
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

    this.responsavelService.getAlterar(this.responsavel.id, this.responsavel).subscribe(
      (response) => {

        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Alteração ', detail: 'responsavel alterada com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/responsaveis'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getIncluir() {

    this.responsavelService.getIncluir(this.responsavel).subscribe(
      (response) => {
        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Inclusão ', detail: 'Responsavel incluido com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/responsaveis'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getIsEditando() {
    return Boolean(this.responsavel.id)
  }

  voltar() {
    window.history.back()
  }


}
