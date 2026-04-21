import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SeccionHabilidades } from '../models/seccion-habilidades';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillsServiceService {

  private apiUrl = 'http://localhost:3001/skillSections';

  constructor(private http: HttpClient) { }

  getSkills(): Observable<SeccionHabilidades[]> {
    return this.http.get<SeccionHabilidades[]>(this.apiUrl);
  }

}
