import { Injectable } from '@angular/core';
import { Subtask } from '../models/subtask.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubtaskService {

  URL = environment.URL_SUBTASK_API;
  subtask: Subtask;

  constructor(
    private http: HttpClient
  ) { 
    this.subtask = new Subtask();
  }

  /* 
    Conexión con la base de datos para crear el CRUD
    'C: Create (crear)'; 'R: Read (leer)'; 'U: Update (actualizar)'; 'R: Remove (borrar)'  
    el crud utiliza en este caso el protocolo http por lo cual se aplican metodos los http correspondientes
  */

  // Crear Tarea
  postSubtask(subtask: Subtask) {
    return this.http.post(this.URL, subtask);
  }

  async getSubtasks(id: number) {
    return await this.http.get<any>(this.URL + `/findoftask/${id}`)
    .toPromise()
    .then(res => <Subtask[]>res.data)
    .then(data => {return data; });
}

  // Obtener una sola tarea
  getSubtask(subtask: Subtask, id: number) {
    return this.http.get<Subtask[]>(this.URL + `/${id}`)
  } 

  // Actualizar datos de la tarea
  putSubtask(subtask: Subtask) {
    console.log(subtask);
    return this.http.put(this.URL + `/${subtask.id}`, subtask);
  }


  // Eliminar tarea
  deleteSubtask(id: number) {
    return this.http.delete(this.URL + `/${id}`);
  }
}
