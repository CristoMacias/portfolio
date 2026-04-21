import { Component, Input } from '@angular/core';
import { SeccionHabilidades } from '../../models/seccion-habilidades';

@Component({
  selector: 'app-carta-habilidad',
  templateUrl: './carta-habilidad.component.html',
  imports: [],
  styleUrl: './carta-habilidad.component.scss',
  standalone: true
})
export class CartaHabilidadComponent {
  @Input({ required: true }) seccion!: SeccionHabilidades;
}
