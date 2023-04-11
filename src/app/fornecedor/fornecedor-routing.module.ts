import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FornecedorListaComponent } from './fornecedor-lista/fornecedor-lista.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';

const routes: Routes = [{
  path: '',
  component: FornecedorListaComponent
},
{
  path: 'novo',
  component: FornecedorComponent
},
{
  path: ':id',
  component: FornecedorComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedorRoutingModule { }
