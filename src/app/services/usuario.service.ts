import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = "http://localhost:3004/usuarios"

  constructor(private Http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.Http.get<Usuario[]>(this.apiUrl);
  }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.Http.post<Usuario>(this.apiUrl, usuario);
  }

  getUsuarioPorEmail(email: string): Observable<Usuario[]> {
    return this.Http.get<Usuario[]>(`${this.apiUrl}?email=${email}`);
  }

}
