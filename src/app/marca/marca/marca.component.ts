import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Marca } from 'src/app/models/marca';
import { MarcaService } from '../marca.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class MarcaComponent implements OnInit {
  titulo: string = 'Cadastrar Marca'
  marca = new Marca()

  constructor(
    private marcaService: MarcaService,

    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id: number = this.route.snapshot.params['id'];

    if (id) {
      this.titulo = 'Alterar Marca'
      this.getMarca(id)
    }
  }

  getMarca(id: number) {
    this.marcaService.getById(id).subscribe(
      (response) => {
        this.marca = { ...response }
      }
    )
  }

  salvar() {
    this.confirmationService.confirm({
      message: 'Deseja realmente salvar essa marca?',
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

    this.marcaService.getAlterar(this.marca.id, this.marca).subscribe(
      (response) => {

        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Alteração ', detail: 'Marca alterada com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/marcas'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getIncluir() {

    this.marcaService.getIncluir(this.marca).subscribe(
      (response) => {
        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Inclusão ', detail: 'Marca incluída com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/marcas'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getIsEditando() {
    return Boolean(this.marca.id)
  }

  voltar() {
    window.history.back()
  }
}
