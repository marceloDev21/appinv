import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropriedadeListaComponent } from './propriedade-lista/propriedade-lista.component';
import { PropriedadeComponent } from './propriedade/propriedade.component';

const routes: Routes = [  {
  path: '',
  component: PropriedadeListaComponent
},
{
  path:'novo',
  component:PropriedadeComponent
},
{
  path:':id',
  component:PropriedadeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropriedadeRoutingModule { }
