import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PosseRoutingModule } from './posse-routing.module';
import { PosseListaComponent } from './posse-lista/posse-lista.component';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { PosseComponent } from './posse/posse.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PosseComponent,
    PosseListaComponent
  ],
  imports: [
    CommonModule,
    PosseRoutingModule,
    HttpClientModule,
    FormsModule,
    CardModule,
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
export class PosseModule { }
