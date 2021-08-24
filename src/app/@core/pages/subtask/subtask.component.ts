import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subtask } from '../../models/subtask.model';
import { SubtaskService } from '../../services/subtask.service';

@Component({
  selector: 'app-subtask',
  templateUrl: './subtask.component.html',
  styleUrls: ['./subtask.component.css']
})
export class SubtaskComponent implements OnInit {

  subtasks!: Subtask[];

  taskId!:number;

  statusModalSubtask:boolean = false;


  editar:boolean = false;
  editSubtask:Subtask = new Subtask();
  
  constructor(
    private subtaskService: SubtaskService,
    private route: ActivatedRoute,
    private router: Router

    ) {

      this.route.params.subscribe(params => {
        this.taskId = params['id'];
        //console.log(this.taskId);
      });

     }

  ngOnInit() {


    this.actualizarLista();
  }

 


  actualizarLista(){
    setTimeout(()=>{
      this.subtaskService.getSubtasks(this.taskId).then(data => this.subtasks = data);
    },100);
  }

  cerrarModal(){
    this.statusModalSubtask=false;
    this.editar=false;
  };



  editarSubtask(task:Subtask){
    this.editSubtask = task;
    this.editar = true;
    this.statusModalSubtask = true;
  }


  eliminarSubtask(id:number){
    this.subtaskService.deleteSubtask(id).subscribe(result => {console.log(result);this.actualizarLista();});
  }



  navegarTareas(){
    this.router.navigateByUrl('/task');  
  }


}
