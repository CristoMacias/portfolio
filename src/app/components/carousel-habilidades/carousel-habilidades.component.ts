import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SeccionHabilidades } from '../../models/seccion-habilidades';
import { CartaHabilidadComponent } from '../carta-habilidad/carta-habilidad.component';

@Component({
  selector: 'app-carousel-habilidades',
  imports: [CartaHabilidadComponent, TranslateModule],
  templateUrl: './carousel-habilidades.component.html',
  standalone: true,
  styleUrl: './carousel-habilidades.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselHabilidadesComponent {
  @Input({ required: true}) secciones: SeccionHabilidades[] = [];

  indiceActual = 0;

  siguiente(): void {
    if (!this.secciones.length) return;
    this.indiceActual = (this.indiceActual + 1) % this.secciones.length;
  }

  anterior(): void {
    if (!this.secciones.length) return;
    this.indiceActual = (this.indiceActual - 1 + this.secciones.length) % this.secciones.length;
  }
}
