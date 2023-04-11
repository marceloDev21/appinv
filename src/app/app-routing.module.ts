import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartamentoModule } from './departamento/departamento.module';
import { EspecificacoesModule } from './especificacoes/especificacoes.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { HomeModule } from './home/home.module';
import { LeitorModule } from './leitor/leitor.module';
import { MarcaModule } from './marca/marca.module';
import { ModeloModule } from './modelo/modelo.module';
import { PatrimonioModule } from './patrimonio/patrimonio.module';
import { PosseModule } from './posse/posse.module';
import { PropriedadeModule } from './propriedade/propriedade.module';
import { ResponsavelModule } from './responsavel/responsavel.module';
import { TipoModule } from './tipo/tipo.module';
import { WaitModule } from './wait/wait.module';
// import { AuthGuard } from './utility/app-guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'wait'
  },
  {
    path: 'wait',
    loadChildren: () => WaitModule,

  },
  {
    path: 'home',
    loadChildren: () => HomeModule,
    // canActivate: [AuthGuard]
  },
  {
    path: 'leitor',
    loadChildren: () => LeitorModule,
    // canActivate: [AuthGuard]
  },
  {
    path: 'departamentos',
    loadChildren: () => DepartamentoModule,
    // canActivate: [AuthGuard]
  },
  {
    path: 'propriedades',
    loadChildren: () => PropriedadeModule,
    // canActivate: [AuthGuard]
  },
  {
    path: 'fornecedores',
    loadChildren: () => FornecedorModule,
    // canActivate: [AuthGuard]
  },
  {
    path: 'marcas',
    loadChildren: () => MarcaModule,
    // canActivate: [AuthGuard]
  },
  {
    path: 'modelos',
    loadChildren: () => ModeloModule,
    // canActivate: [AuthGuard]
  },
  {
    path: 'equipamentos',
    loadChildren: () => EspecificacoesModule,
    // canActivate: [AuthGuard]
  },
  {
    path: 'patrimonios',
    loadChildren: () => PatrimonioModule,
    // canActivate: [AuthGuard]
  },
  {
    path: 'posses',
    loadChildren: () => PosseModule,
    // canActivate: [AuthGuard]
  },
  {
    path: 'propriedades',
    loadChildren: () => PropriedadeModule,
    // canActivate: [AuthGuard]
  },
  {
    path: 'tipos',
    loadChildren: () => TipoModule,
    // canActivate: [AuthGuard]
  },
  {
    path: 'responsaveis',
    loadChildren: () => ResponsavelModule,
    // canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
