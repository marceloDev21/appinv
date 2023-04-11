import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { FornecedorService } from 'src/app/fornecedor/fornecedor.service';
import { Fornecedor } from 'src/app/models/fornecedor';
import { Propriedade } from 'src/app/models/propriedade';
import { PropriedadeService } from '../propriedade.service';

interface Tipo {
  label: string
}
@Component({
  selector: 'app-propriedade',
  templateUrl: './propriedade.component.html',
  styleUrls: ['./propriedade.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class PropriedadeComponent implements OnInit {
  titulo: string = 'Cadastrar Propriedade'
  propriedade = new Propriedade()

  fornecedores = new Array<Fornecedor>()
  fornecedor = new Fornecedor()

  tipos = new Array<Tipo>()
  selectedTipo?: Tipo
  fornecedorSelecionado: string = '';

  constructor(
    private propriedadeService: PropriedadeService,
    private fornecedorService: FornecedorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.tipos = [
      { 'label': 'próprio' },
      { 'label': 'alugado' },
    ]

  }

  ngOnInit(): void {
    const id: number = this.route.snapshot.params['id'];

    if (id) {
      this.titulo = 'Alterar Propriedade'
      this.getPropriedade(id)
    }
    this.getFornecedores()
  }

  getPropriedade(id: number) {
    this.propriedadeService.getById(id).subscribe(
      (response) => {
        this.propriedade = { ...response }
      }
    )
  }

  getFornecedores() {
    this.fornecedorService.listar().subscribe(
      (response) => {
        this.fornecedores = [...response]
      }
    )
  }

  salvar() {
    this.confirmationService.confirm({
      message: 'Deseja realmente salvar essa propriedade?',
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

    this.propriedadeService.getAlterar(this.propriedade.id, this.propriedade).subscribe(
      (response) => {

        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Alteração ', detail: 'Propriedade alterada com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/propriedades'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getIncluir() {

    this.propriedadeService.getIncluir(this.propriedade).subscribe(
      (response) => {
        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Inclusão ', detail: 'Propriedade incluido com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/propriedades'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getIsEditando() {
    return Boolean(this.propriedade.id)
  }

  voltar() {
    window.history.back()
  }


}
