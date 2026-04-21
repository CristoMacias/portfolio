import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';

interface PasoTrabajo {
  numero: string;
  titulo: string;
  descripcion: string;
}

@Component({
  selector: 'app-metodo-trabajo',
  imports: [CommonModule, MatCardModule, MatDividerModule, TranslateModule],
  templateUrl: './metodo-trabajo.component.html',
  styleUrl: './metodo-trabajo.component.scss',
  standalone: true
})
export class MetodoTrabajoComponent {

  pasos: PasoTrabajo[] = [
    {
      numero: '01',
      titulo: 'components.metodoTrabajo.steps.1.title',
      descripcion: 'components.metodoTrabajo.steps.1.description'
    },
    {
      numero: '02',
      titulo: 'components.metodoTrabajo.steps.2.title',
      descripcion: 'components.metodoTrabajo.steps.2.description'
    },
    {
      numero: '03',
      titulo: 'components.metodoTrabajo.steps.3.title',
      descripcion: 'components.metodoTrabajo.steps.3.description'
    }
  ];

}
