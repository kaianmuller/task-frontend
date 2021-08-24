import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubtaskComponent } from './@core/pages/subtask/subtask.component';
import { TaskComponent } from './@core/pages/task/task.component';

const routes: Routes = [
  {
    path: 'task',
    component: TaskComponent
  },
  {
    path: 'subtask/:id',
    component: SubtaskComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
