import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartamentoListaComponent } from './departamento-lista/departamento-lista.component';
import { DepartamentoComponent } from './departamento/departamento.component';

const routes: Routes = [{
  path: '',
  component: DepartamentoListaComponent
},
{
  path: 'novo',
  component: DepartamentoComponent
},
{
  path: ':id',
  component: DepartamentoComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartamentoRoutingModule { }
