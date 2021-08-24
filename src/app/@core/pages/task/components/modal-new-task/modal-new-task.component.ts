import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { NivelPrioridad } from 'src/app/@core/models/enums/prioridad';
import { Status } from 'src/app/@core/models/enums/status';
import { TaskService } from 'src/app/@core/services/task.service';
import { Task } from '../../../../models/task.model'; 

@Component({
  selector: 'app-modal-new-task',
  templateUrl: './modal-new-task.component.html',
  styleUrls: ['./modal-new-task.component.css']
})
export class ModalNewTaskComponent implements OnInit {

  @Output() cerrarModal:EventEmitter<void> = new EventEmitter<void>();
  @Input() edit:boolean = false;
  @Input() editTask:Task = new Task();
  localTask:Task = new Task();


  taskForm:FormGroup = new FormGroup({});

  enumPrioridad = NivelPrioridad;
  keyPrioridades = Array<string>();
  valuePrioridades = Array<string>();

  enumStatus = Status;
  keyStatus = Array<string>();
  valueStatus = Array<string>();

  constructor(private readonly taskServ:TaskService) {
    this.keyPrioridades = Object.keys(this.enumPrioridad);
    this.valuePrioridades = Object.values(this.enumPrioridad);
    this.keyStatus = Object.keys(this.enumStatus);
    this.valueStatus = Object.values(this.enumStatus);
   }

  ngOnInit(): void {


    if(this.edit){
      this.localTask = this.editTask;
    }

    this.buildForm();

  }



  buildForm(){
    this.taskForm = new FormGroup({
      id: new FormControl(this.localTask.id),
      fechaCreacion: new FormControl(this.localTask.fechaCreacion),
      titulo: new FormControl(this.localTask.titulo, [Validators.required]),
      descripcion: new FormControl(this.localTask.descripcion,[Validators.maxLength(200),Validators.required]),
      nivelPrioridad: new FormControl(this.localTask.nivelPrioridad, [Validators.required]),
      status: new FormControl(this.localTask.status, [Validators.required])
    });

    this.taskForm.valueChanges
    .subscribe(value => {
      //console.log(value);
    });
  }



  enviarFormulario(e:Event){
    e.preventDefault();
    const taskEntity= <Task>this.taskForm.value;
    taskEntity.fechaCreacion = new Date().toISOString();

    if(this.taskForm.valid){
    if(this.edit){
      this.taskServ.putTask(taskEntity).subscribe(result => {console.log(result);this.cerrarModal.emit();});
    }else{
      this.taskServ.postTask(taskEntity).subscribe(result => {console.log(result);this.cerrarModal.emit();});
    }
    this.buildForm();
  }else{
    console.log("Datos no validos!");
  }
    //console.log(taskEntity);
  }



  cerrarVentana(){
    this.cerrarModal.emit();
  }

}
