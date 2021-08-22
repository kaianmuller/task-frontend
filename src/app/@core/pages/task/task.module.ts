import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TaskComponent } from './task.component';
import { TaskService } from '../../services/task.service';
import { ModalNewTaskComponent } from './components/modal-new-task/modal-new-task.component';

@NgModule({
  declarations: [
    TaskComponent,
    ModalNewTaskComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    TaskService,
  ]
})

export class TaskModule { }
