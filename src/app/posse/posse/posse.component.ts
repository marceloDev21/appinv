import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DepartamentoService } from 'src/app/departamento/departamento.service';
import { Patrimonio } from 'src/app/models/patrimonio';
import { Pessoa } from 'src/app/models/pessoa';
import { Posse } from 'src/app/models/posse';
import { PatrimonioService } from 'src/app/patrimonio/patrimonio.service';
import { ResponsavelService } from 'src/app/responsavel/responsavel.service';
import { PosseService } from '../posse.service';

@Component({
  selector: 'app-posse',
  templateUrl: './posse.component.html',
  styleUrls: ['./posse.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class PosseComponent implements OnInit {
  titulo: string = 'Cadastrar Posse'
  posse = new Posse()
  posses = new Array<Posse>()

  pessoas = new Array<Pessoa>()

  patrimonios = new Array<Patrimonio>()
  patrimonio = new Patrimonio()

  load: boolean = true
  totalDeRegistros: number = 0

  nome: string = ''
  codigo?: number

  constructor(
    private posseService: PosseService,
    private responsavelService: ResponsavelService,
    private patrimonioService: PatrimonioService,
    private departamentoService: DepartamentoService,

    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.load = false
    const id: number = this.route.snapshot.params['id'];

    if (id) {
      this.titulo = 'Checar Posse'
      this.getPosse(id)
    }
    this.getPessoas()
    this.getPatrimonios()
  }

  getPosse(id: number) {
    this.posseService.getById(id).subscribe(
      (response) => {
        this.posse = { ...response }
      }
    )
  }

  getPessoas() {
    this.responsavelService.listar().subscribe(
      (response) => {
        this.pessoas = [...response]
      }
    )
  }

  getPatrimonios() {
    this.patrimonioService.listar().subscribe(
      (response) => {
        this.patrimonios = [...response]
      }
    )
  }
  
  salvar() {
    this.confirmationService.confirm({
      message: 'Deseja realmente salvar esse posse?',
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

    this.posseService.getAlterar(this.posse.id, this.posse).subscribe(
      (response) => {

        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Alteração ', detail: 'posse alterada com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/posses'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getIncluir() {

    this.posseService.getIncluir(this.posse).subscribe(
      (response) => {
        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Inclusão ', detail: 'posse incluido com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/posses'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getIsEditando() {
    return Boolean(this.posse.id)
  }

  voltar() {
    window.history.back()
  }

  clear(table: Table) {
    table.clear();
  }

}
