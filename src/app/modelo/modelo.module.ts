import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';

import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ModeloListaComponent } from './modelo-lista/modelo-lista.component';
import { ModeloRoutingModule } from './modelo-routing.module';
import { ModeloComponent } from './modelo/modelo.component';


@NgModule({
  declarations: [
    ModeloListaComponent,
    ModeloComponent
  ],
  imports: [
    CommonModule,
    ModeloRoutingModule,
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
  ]
})
export class ModeloModule { }
