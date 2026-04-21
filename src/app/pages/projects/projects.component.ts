import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ListaProyectosComponent } from '../../components/lista-proyectos/lista-proyectos.component';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, ListaProyectosComponent, TranslateModule],
  templateUrl: './projects.component.html',
  standalone: true,
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
}
