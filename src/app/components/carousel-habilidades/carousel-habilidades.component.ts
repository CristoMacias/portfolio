import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
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
export class CarouselHabilidadesComponent implements OnInit, OnDestroy {
  @Input({ required: true }) secciones: SeccionHabilidades[] = [];

  indiceActual = 0;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.iniciarAutoplay();
  }

  ngOnDestroy(): void {
    this.detenerAutoplay();
  }

  siguiente(): void {
    if (!this.secciones.length) return;
    this.indiceActual = (this.indiceActual + 1) % this.secciones.length;
    this.cdr.markForCheck();
  }

  anterior(): void {
    if (!this.secciones.length) return;
    this.indiceActual =
      (this.indiceActual - 1 + this.secciones.length) % this.secciones.length;
    this.cdr.markForCheck();
  }

  irA(indice: number): void {
    this.indiceActual = indice;
    this.cdr.markForCheck();
  }

  iniciarAutoplay(): void {
    if (this.intervalId || this.secciones.length <= 1) return;

    this.intervalId = setInterval(() => {
      this.siguiente();
    }, 5000);
  }

  detenerAutoplay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reiniciarAutoplay(): void {
    this.detenerAutoplay();
    this.iniciarAutoplay();
  }
}