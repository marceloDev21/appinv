import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResponsavelListaComponent } from './responsavel-lista/responsavel-lista.component';
import { ResponsavelComponent } from './responsavel/responsavel.component';

const routes: Routes = [
  {
    path: '',
    component: ResponsavelListaComponent
  },
  {
    path:'novo',
    component:ResponsavelComponent
  },
  {
    path:':id',
    component:ResponsavelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsavelRoutingModule { }
