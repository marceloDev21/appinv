import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { DepartamentoService } from 'src/app/departamento/departamento.service';
import { EspecificacoesService } from 'src/app/especificacoes/especificacoes.service';
import { MarcaService } from 'src/app/marca/marca.service';
import { ModeloService } from 'src/app/modelo/modelo.service';
import { Departamento } from 'src/app/models/departamento';
import { Especificacoes } from 'src/app/models/especificacoes';
import { Marca } from 'src/app/models/marca';
import { Modelo } from 'src/app/models/modelo';
import { Patrimonio } from 'src/app/models/patrimonio';
import { Pessoa } from 'src/app/models/pessoa';
import { Posse } from 'src/app/models/posse';
import { Propriedade } from 'src/app/models/propriedade';
import { Tipo } from 'src/app/models/tipo';
import { PosseService } from 'src/app/posse/posse.service';
import { PropriedadeService } from 'src/app/propriedade/propriedade.service';
import { ResponsavelService } from 'src/app/responsavel/responsavel.service';
import { TipoService } from 'src/app/tipo/tipo.service';
import { PatrimonioService } from '../patrimonio.service';

@Component({
  selector: 'app-patrimonio',
  templateUrl: './patrimonio.component.html',
  styleUrls: ['./patrimonio.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class PatrimonioComponent implements OnInit {
  titulo: string = 'Cadastrar Patrimônio'
  patrimonio = new Patrimonio()

  responsaveis = new Array<Pessoa>()

  pessoas = new Array<Pessoa>()
  pessoa = new Pessoa()

  departamentos = new Array<Departamento>()

  modelos = new Array<Modelo>()
  marcas = new Array<Marca>()

  equipamentos = new Array<Especificacoes>()

  tipos = new Array<Tipo>()

  propriedades = new Array<Propriedade>()

  posse = new Posse
  posses = new Array<Posse>()

  situacoes = [
    { 'label': 'EM_USO' },
    { 'label': 'DISPONIVEL' },
    { 'label': 'DANIFICADO' }
  ]
  selectedSituacoes!: string;

  constructor(
    private patrimonioService: PatrimonioService,
    private posseService: PosseService,

    private responsavelService: ResponsavelService,
    private departamentoService: DepartamentoService,
    private modeloService: ModeloService,
    private marcaService: MarcaService,
    private especificacoesService: EspecificacoesService,
    private tipoService: TipoService,
    private propriedadeService: PropriedadeService,

    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute,

    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    // id na url
    const id: number = this.route.snapshot.params['id'];

    // codigo na url
    const codigo: number = this.route.snapshot.params['codigo'];

    if (id) {
      this.titulo = 'Alterar patrimônio';
      this.getPatrimonio(id);
    } if (codigo) {
      this.getByCode(codigo);
    }
    this.getPosse()
    this.getEspecificacoes();
    this.getModelo()
    this.getMarca()
    this.getDepartamento();
    this.getTipo();
    this.getResponsavel();
    this.getPropriedade();
  }


  getPatrimonio(id: number) {
    this.patrimonioService.getById(id).subscribe(
      (response) => {
        this.patrimonio = { ...response }
      }
    )
  }

  getResponsavel() {
    this.responsavelService.listar().subscribe(
      (response) => {
        this.responsaveis = [...response]
        this.pessoas = [...response]
      }
    )
  }


  getDepartamento() {
    this.departamentoService.listar().subscribe(
      (response) => {
        this.departamentos = [...response]
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

  getEspecificacoes() {
    this.especificacoesService.listar().subscribe(
      (response) => {
        this.equipamentos = [...response]
      }
    )
  }

  getTipo() {
    this.tipoService.listar().subscribe(
      (response) => {
        this.tipos = [...response]
      }
    )
  }

  getPosse() {
    this.posseService.listar().subscribe(
      (response) => {
        this.posses = [...response]

      }
    )
  }

  getPropriedade() {
    this.propriedadeService.listar().subscribe(
      (response) => {
        this.propriedades = [...response]
      }
    )
  }

  inserirItem() {

    if (this.posse) {
      if (this.patrimonio.posse.includes(this.posse)) {
        
        this.messageService.add({ key: 'bc', severity: 'warn', summary: 'Validação', detail: 'Item já inserido!' });
      } else {
        this.patrimonio.posse.push({ ...this.posse })
        this.posse = new Posse
      }
    }
  }

  getByCode(codigo: number) {
    this.patrimonioService.getByCode(codigo).subscribe((response) => {
      if (response != null) {
        this.titulo = 'Alterar Item';
        this.patrimonio = { ...response };
      } else {
        this.titulo = 'Adicionar Item';
        this.patrimonio.codigo = codigo;
      }
    });
  }

  getIsEditando() {
    return Boolean(this.patrimonio.id)
  }



  salvar() {
    this.patrimonio.responsavel = this.patrimonio.responsavel

    this.confirmationService.confirm({
      message: 'Deseja realmente salvar esse patrimonio?',
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

    this.patrimonioService.getAlterar(this.patrimonio.id, this.patrimonio).subscribe(
      (response) => {

        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Alteração ', detail: 'patrimonio alterada com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/patrimonios'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getIncluir() {

    this.patrimonioService.getIncluir(this.patrimonio).subscribe(
      (response) => {
        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Inclusão ', detail: 'patrimonio incluido com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/patrimonios'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  voltar() {
    window.history.back()
  }

}
