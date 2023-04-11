import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DepartamentoRoutingModule } from './departamento-routing.module';
import { DepartamentoListaComponent } from './departamento-lista/departamento-lista.component';
import { DepartamentoComponent } from './departamento/departamento.component';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TooltipModule} from 'primeng/tooltip';
import { InputNumberModule } from 'primeng/inputnumber';
import {ToastModule} from 'primeng/toast';



@NgModule({
  declarations: [
    DepartamentoListaComponent,
    DepartamentoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    TableModule,
    InputTextModule,
    InputMaskModule,
    InputTextareaModule,
    DropdownModule,
    ButtonModule,
    CalendarModule,
    DialogModule,
    ConfirmDialogModule,
    MessageModule,
    MessagesModule,
    PanelModule,
    InputNumberModule,
    TooltipModule,
    ToastModule,

    DepartamentoRoutingModule,
  ]
})
export class DepartamentoModule { }
