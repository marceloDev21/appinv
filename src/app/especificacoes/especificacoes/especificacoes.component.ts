import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { MarcaService } from 'src/app/marca/marca.service';
import { ModeloService } from 'src/app/modelo/modelo.service';
import { Especificacoes } from 'src/app/models/especificacoes';
import { Marca } from 'src/app/models/marca';
import { Modelo } from 'src/app/models/modelo';
import { EspecificacoesService } from '../especificacoes.service';

@Component({
  selector: 'app-especificacoes',
  templateUrl: './especificacoes.component.html',
  styleUrls: ['./especificacoes.component.css']
})
export class EspecificacoesComponent implements OnInit {

  especificacoes = new Array<Especificacoes>()
  especificacao = new Especificacoes()

  modelos = new Array<Modelo>()

  marcas = new Array <Marca>()

  titulo = 'Adicionar equipamentos'

  constructor(
    private especificacoesService: EspecificacoesService,
    private modeloService: ModeloService,
    private marcaService: MarcaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id: number = this.route.snapshot.params['id'];

    if (id) {
      this.titulo = 'Alterar Equipamento '
      this.getEspecificacoes(id)
    }
    this.getMarca()
    this.getModelo()
  }

  getEspecificacoes(id: number) {
    this.especificacoesService.getById(id).subscribe(
      (response) => {
        this.especificacao = { ...response }
      }
    )
  }

  getModelo() {
    this.modeloService.listar().subscribe(
      (response) => {
        this.modelos = [...response]
      }
    )
  }

  getMarca() {
    this.marcaService.listar().subscribe(
      (response) => {
        this.marcas = [...response]
      }
    )
  }


  salvar() {
    this.confirmationService.confirm({
      message: 'Deseja realmente salvar esse especificacoes?',
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

    this.especificacoesService.getAlterar(this.especificacao.id, this.especificacao).subscribe(
      (response) => {

        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Alteração ', detail: 'Fornecedor alterada com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/equipamentos'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getIncluir() {

    this.especificacoesService.getIncluir(this.especificacao).subscribe(
      (response) => {
        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Inclusão ', detail: 'Fornecedor incluido com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/equipamentos'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getIsEditando() {
    return Boolean(this.especificacao.id)
  }

  voltar() {
    window.history.back()
  }
}


