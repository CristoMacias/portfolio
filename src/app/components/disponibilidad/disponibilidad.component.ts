import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';

export type EstadoDisponibilidad = 'available' | 'busy' | 'unavailable';

interface ConfigDisponibilidad {
  estado: EstadoDisponibilidad;
  etiqueta: string;
  detalle: string;
  tiempoRespuesta: string;
}

@Component({
  selector: 'app-disponibilidad',
  imports: [MatCardModule, CommonModule, TranslateModule],
  standalone: true,
  templateUrl: './disponibilidad.component.html',
  styleUrl: './disponibilidad.component.scss'
})
export class DisponibilidadComponent {

  disponibilidad: ConfigDisponibilidad = {
    estado: 'available',
    etiqueta: 'components.disponibilidad.statusLabel',
    detalle: 'components.disponibilidad.detail',
    tiempoRespuesta: 'components.disponibilidad.response'
  };
}
