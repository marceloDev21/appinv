import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatrimonioListaComponent } from './patrimonio-lista/patrimonio-lista.component';
import { PatrimonioComponent } from './patrimonio/patrimonio.component';

const routes: Routes = [{
  path: '',
  component: PatrimonioListaComponent
},
{
  path: 'novo',
  component: PatrimonioComponent
}, 
{
  path: 'codigo/:codigo',
  component: PatrimonioComponent
},
{
  path: 'departamento/:departamento',
  component: PatrimonioListaComponent
},
{
  path: ':id',
  component: PatrimonioComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatrimonioRoutingModule { }
