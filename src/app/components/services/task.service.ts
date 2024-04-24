import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Pageable, Task } from '../model/task';
import { RequestDTO } from '../model/requestDto';
import { ResponseDTO } from '../model/responseDto';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private URL_API = environment.urlBaseClient;

  constructor(private httpClient: HttpClient) { }

  saveTask(task: Task): Observable<ResponseDTO> {
    return this.httpClient.post<ResponseDTO>(this.URL_API, task);
  }

  getTasks(): Observable<Pageable> {
    return this.httpClient.get<Pageable>(this.URL_API);
  }
  getTaskById(id: number): Observable<Task> {
    return this.httpClient.get<Task>(this.URL_API + `/${id}`);
  }

  updateTask(id: number, task: RequestDTO): Observable<ResponseDTO> {
    return this.httpClient.put<ResponseDTO>(this.URL_API + `/${id}`, task);
  }

  deleteTask(id: number): Observable<ResponseDTO> {
    return this.httpClient.delete<ResponseDTO>(this.URL_API + `/${id}`);
  }

}
