import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PosseListaComponent } from './posse-lista/posse-lista.component';
import { PosseComponent } from './posse/posse.component';

const routes: Routes = [{
  path: '',
  component: PosseListaComponent
},
{
  path:'novo',
  component:PosseComponent
},
{
  path:':id',
  component:PosseComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosseRoutingModule { }
