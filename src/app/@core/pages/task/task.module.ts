import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TaskComponent } from './task.component';
import { TaskService } from '../../services/task.service';
import { ModalNewTaskComponent } from './components/modal-new-task/modal-new-task.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TaskComponent,
    ModalNewTaskComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    TaskService,
  ]
})

export class TaskModule { }
