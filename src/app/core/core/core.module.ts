import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuComponent } from '../menu/menu.component';


import { InputTextareaModule } from 'primeng/inputtextarea';

import { ConfirmationService, MessageService } from 'primeng/api';
import { DepartamentoService } from 'src/app/departamento/departamento.service';
import { EspecificacoesService } from 'src/app/especificacoes/especificacoes.service';
import { FornecedorService } from 'src/app/fornecedor/fornecedor.service';
import { MarcaService } from 'src/app/marca/marca.service';
import { PatrimonioService } from 'src/app/patrimonio/patrimonio.service';
import { PosseService } from 'src/app/posse/posse.service';
import { PropriedadeService } from 'src/app/propriedade/propriedade.service';
import { ResponsavelService } from 'src/app/responsavel/responsavel.service';
import { TipoService } from 'src/app/tipo/tipo.service';
import { ModeloService } from 'src/app/modelo/modelo.service';



@NgModule({
  /*
  Componentes globais, como o menu, navbar, buttons, vão no declarations e no exports.
  */
  declarations: [
    MenuComponent,
  ],

  imports: [
    CommonModule,
    HttpClientModule,
    PanelMenuModule,
    InputTextareaModule,
  ],
  /*
  Componentes globais, como o menu, vão no declarations e no exports.
  */
  exports: [
    MenuComponent,
  ],
  /*
  Todas as service dos componentes vão no providers.
  */
  providers: [
    DatePipe,
    MessageService,
    ConfirmationService,
    DepartamentoService,
    FornecedorService,
    MarcaService,
    EspecificacoesService,
    ModeloService,
    PatrimonioService,
    PropriedadeService,
    ResponsavelService,
    PosseService,
    TipoService

  ]

})
export class CoreModule { }
