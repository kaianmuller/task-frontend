import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormControl, FormGroup, NgForm} from '@angular/forms'
import { Task } from '../../models/task.model';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  task!: Task;
  tasks!: Task[];
  task1!: Task[];
  task2!: Task[];
  statuses!: SelectItem[];

  clonedTask: { [s: string]: Task; } = {};
  
  constructor(
    private taskService: TaskService,
    private messageService: MessageService
    ) { }

  ngOnInit() {
    this.taskService.getTasks().then(data => this.task1 = data);
    this.taskService.getTasks().then(data => this.task2 = data);
  }

  onRowEditInit(task: Task) {
    this.clonedTask[task.titulo] = { ...task };
  }

  onRowEditSave(task: Task) {
    this.taskService.putTask(task);
    this.messageService.add({severity:'success', summary: 'Success', detail:'Task is updated'});
  }

  onRowEditCancel(task: Task, index: number) {
    this.task2[index] = this.clonedTask[task.id];
    delete this.task2[task.id];
}

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id);
  }


}
