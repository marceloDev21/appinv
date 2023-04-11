import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarcaListaComponent } from './marca-lista/marca-lista.component';
import { MarcaComponent } from './marca/marca.component';

const routes: Routes = [  {
  path: '',
  component: MarcaListaComponent
},
{
  path:'novo',
  component:MarcaComponent
},
{
  path:':id',
  component:MarcaComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarcaRoutingModule { }
