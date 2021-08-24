import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks!: Task[];


  statusModalTask:boolean = false;


  editar:boolean = false;
  editTask:Task = new Task();
  
  constructor(
    private taskService: TaskService,
    private router: Router
    ) { }

  ngOnInit() {
    this.actualizarLista();
  }

 


  actualizarLista(){
    setTimeout(()=>{
      this.taskService.getTasks().then(data => this.tasks = data);
    },100);
  }

  cerrarModal(){
    this.statusModalTask=false;
    this.editar=false;
  };



  editarTask(task:Task){
    this.editTask = task;
    this.editar = true;
    this.statusModalTask = true;
  }


  eliminarTask(id:number){
    this.taskService.deleteTask(id).subscribe(result => {console.log(result);this.actualizarLista();});
  }




  navegarSubtareas(id:number){
    this.router.navigateByUrl('/subtask/'+id);
  }


}
