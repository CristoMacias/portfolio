import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Formacion } from '../models/formacion';

@Injectable({
  providedIn: 'root'
})
export class FormacionService {

  private apiUrl = "http://localhost:3003/formacion";

  constructor(private http: HttpClient) { }

  getFormacion() {
    return this.http.get<Formacion[]>(this.apiUrl);
  }
}
