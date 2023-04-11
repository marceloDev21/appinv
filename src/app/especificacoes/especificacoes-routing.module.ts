import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspecificacoesListaComponent } from './especificacoes-lista/especificacoes-lista.component';
import { EspecificacoesComponent } from './especificacoes/especificacoes.component';

const routes: Routes = [{
  path: '',
  component: EspecificacoesListaComponent
},
{
  path: 'novo',
  component: EspecificacoesComponent
},
{
  path: ':id',
  component: EspecificacoesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspecificacoesRoutingModule { }
