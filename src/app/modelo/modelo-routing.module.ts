import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModeloListaComponent } from './modelo-lista/modelo-lista.component';
import { ModeloComponent } from './modelo/modelo.component';

const routes: Routes = [  {
  path: '',
  component: ModeloListaComponent
},
{
  path:'novo',
  component:ModeloComponent
},
{
  path:':id',
  component:ModeloComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModeloRoutingModule { }
