import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Fornecedor } from 'src/app/models/fornecedor';
import { FornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class FornecedorComponent implements OnInit {
  titulo: string = 'Cadastrar Fornecedor'
  fornecedor = new Fornecedor()
  fornecedores = new Array<Fornecedor>()

  constructor(
    private fornecedorService: FornecedorService,

    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id: number = this.route.snapshot.params['id'];

    if (id) {
      this.titulo = 'Alterar Fornecedor'
      this.getFornecedor(id)
    }
  }

  getFornecedor(id: number) {
    this.fornecedorService.getById(id).subscribe(
      (response) => {
        this.fornecedor = { ...response }
      }
    )
  }

  salvar() {
    this.confirmationService.confirm({
      message: 'Deseja realmente salvar esse fornecedor?',
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

    this.fornecedorService.getAlterar(this.fornecedor.id, this.fornecedor).subscribe(
      (response) => {

        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Alteração ', detail: 'Fornecedor alterada com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/fornecedores'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getIncluir() {

    this.fornecedorService.getIncluir(this.fornecedor).subscribe(
      (response) => {
        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Inclusão ', detail: 'Fornecedor incluido com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/fornecedores'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getIsEditando() {
    return Boolean(this.fornecedor.id)
  }

  voltar() {
    window.history.back()
  }
}
