import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from '../models/proyecto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectsService {

  private apiUrl = "http://localhost:3002/proyectos";

  constructor(private http: HttpClient) { }

  getProyects(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.apiUrl);
  }
  
}
