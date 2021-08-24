import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubtaskComponent } from './subtask.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalNewSubtaskComponent } from './components/modal-new-subtask/modal-new-subtask.component';



@NgModule({
  declarations: [
    SubtaskComponent,
    ModalNewSubtaskComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SubtaskModule { }
