import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropriedadeRoutingModule } from './propriedade-routing.module';
import { PropriedadeListaComponent } from './propriedade-lista/propriedade-lista.component';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { InputNumberModule } from 'primeng/inputnumber';
import { PanelModule } from 'primeng/panel';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { PropriedadeComponent } from './propriedade/propriedade.component';


@NgModule({
  declarations: [
    PropriedadeComponent,
    PropriedadeListaComponent
  ],
  imports: [
    CommonModule,
    PropriedadeRoutingModule,

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
export class PropriedadeModule { }
