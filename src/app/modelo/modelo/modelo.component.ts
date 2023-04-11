import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { MarcaService } from 'src/app/marca/marca.service';
import { Especificacoes } from 'src/app/models/especificacoes';
import { Marca } from 'src/app/models/marca';
import { Modelo } from 'src/app/models/modelo';
import { ModeloService } from '../modelo.service';

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class ModeloComponent implements OnInit {
  titulo: string = 'Cadastrar Modelo'
  modelo = new Modelo()
  // especificacoes = new Especificacoes()

  marcas = new Array<Marca>()

  constructor(
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
      this.titulo = 'Alterar Modelo'
      this.getModelo(id)
    }
    this.getMarcas()
  }

  getModelo(id: number) {
    this.modeloService.getById(id).subscribe(
      (response) => {
        this.modelo = { ...response }
      }
    )
  }

  getMarcas() {
    this.marcaService.listar().subscribe(
      (response) => {
        this.marcas = [...response]
      }
    )
  }

  salvar() {
    this.confirmationService.confirm({
      message: 'Deseja realmente salvar esse modelo?',
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

    this.modeloService.getAlterar(this.modelo.id, this.modelo).subscribe(
      (response) => {

        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Alteração ', detail: 'modelo alterada com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/modelos'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getIncluir() {

    this.modeloService.getIncluir(this.modelo).subscribe(
      (response) => {
        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Inclusão ', detail: 'Modelo incluido com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/modelos'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getIsEditando() {
    return Boolean(this.modelo.id)
  }

  voltar() {
    window.history.back()
  }


}
