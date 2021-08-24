import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NivelPrioridad } from 'src/app/@core/models/enums/prioridad';
import { Status } from 'src/app/@core/models/enums/status';
import { Subtask } from 'src/app/@core/models/subtask.model';
import { Task } from 'src/app/@core/models/task.model';
import { SubtaskService } from 'src/app/@core/services/subtask.service';

@Component({
  selector: 'app-modal-new-subtask',
  templateUrl: './modal-new-subtask.component.html',
  styleUrls: ['./modal-new-subtask.component.css']
})
export class ModalNewSubtaskComponent implements OnInit {

  @Output() cerrarModal:EventEmitter<void> = new EventEmitter<void>();
  @Input() taskid!:number;
  @Input() edit:boolean = false;
  @Input() editSubtask:Subtask = new Subtask();
  localSubtask:Subtask = new Subtask();


  subtaskForm:FormGroup = new FormGroup({});

  enumPrioridad = NivelPrioridad;
  keyPrioridades = Array<string>();
  valuePrioridades = Array<string>();

  enumStatus = Status;
  keyStatus = Array<string>();
  valueStatus = Array<string>();

  

  constructor(private readonly subtaskServ:SubtaskService) {
    this.keyPrioridades = Object.keys(this.enumPrioridad);
    this.valuePrioridades = Object.values(this.enumPrioridad);
    this.keyStatus = Object.keys(this.enumStatus);
    this.valueStatus = Object.values(this.enumStatus);



    this.localSubtask = new Subtask();
    this.localSubtask.task = new Task();

   }

  ngOnInit(): void {

    

    if(this.edit){
      this.localSubtask = this.editSubtask;
    }else{
      this.localSubtask.task.id = this.taskid;
    }

    this.buildForm();

  }



  buildForm(){
    this.subtaskForm = new FormGroup({
      id: new FormControl(this.localSubtask.id),
      fechaCreacion: new FormControl(this.localSubtask.fechaCreacion),
      titulo: new FormControl(this.localSubtask.titulo, [Validators.required]),
      descripcion: new FormControl(this.localSubtask.descripcion,[Validators.maxLength(200),Validators.required]),
      nivelPrioridad: new FormControl(this.localSubtask.nivelPrioridad, [Validators.required]),
      status: new FormControl(this.localSubtask.status, [Validators.required]),
      task:new FormControl(this.localSubtask.task)
    });

    this.subtaskForm.valueChanges
    .subscribe(value => {
     // console.log(value);
    });
  }



  enviarFormulario(e:Event){
    e.preventDefault();
    const subtaskEntity= <Subtask>this.subtaskForm.value;
    subtaskEntity.fechaCreacion = new Date().toISOString();

  if(this.subtaskForm.valid){
    if(this.edit){
      this.subtaskServ.putSubtask(subtaskEntity).subscribe(result => {console.log(result);this.cerrarModal.emit();});
    }else{
      this.subtaskServ.postSubtask(subtaskEntity).subscribe(result => {console.log(result);this.cerrarModal.emit();});
    }
    this.buildForm();
  }else{
    console.log("Datos no validos!");
  }
    //console.log(subtaskEntity);
  }



  cerrarVentana(){
    this.cerrarModal.emit();
  }

}
