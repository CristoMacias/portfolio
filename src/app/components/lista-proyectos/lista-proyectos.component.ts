import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  signal
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Proyecto } from '../../models/proyecto';
import { ProyectsService } from '../../services/proyects.service';
import { ProyectoComponent } from '../proyecto/proyecto.component';

@Component({
  selector: 'app-lista-proyectos',
  standalone: true,
  imports: [CommonModule, ProyectoComponent, TranslateModule],
  templateUrl: './lista-proyectos.component.html',
  styleUrl: './lista-proyectos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaProyectosComponent implements OnInit {
  proyectos = signal<Proyecto[]>([]);
  cargando = signal(true);
  error = signal(false);

  filtroTecnologia = signal<string>('todas');

  constructor(private proyectsService: ProyectsService) {}

  ngOnInit(): void {
    this.obtenerProyectos();
  }

  obtenerProyectos(): void {
    this.cargando.set(true);
    this.error.set(false);

    this.proyectsService.getProyects().subscribe({
      next: (proyectos) => {
        this.proyectos.set(proyectos);
        this.cargando.set(false);
      },
      error: (error) => {
        console.error('Error al obtener proyectos', error);
        this.error.set(true);
        this.cargando.set(false);
      }
    });
  }

  tecnologiasDisponibles = computed(() => {
    const lista = this.proyectos()
      .flatMap(proyecto => proyecto.tecnologias ?? [])
      .filter((tecnologia, index, array) => array.indexOf(tecnologia) === index);

    return ['todas', ...lista];
  });

  proyectosFiltrados = computed(() => {
    const tecnologiaSeleccionada = this.filtroTecnologia();

    if (tecnologiaSeleccionada === 'todas') {
      return this.proyectos();
    }

    return this.proyectos().filter(proyecto =>
      proyecto.tecnologias?.includes(tecnologiaSeleccionada)
    );
  });

  proyectoDestacado = computed(() => {
    const lista = this.proyectosFiltrados();
    return lista.length > 0 ? lista[0] : null;
  });

  proyectosRestantes = computed(() => {
    return this.proyectosFiltrados().slice(1);
  });

  cambiarFiltro(tecnologia: string): void {
    this.filtroTecnologia.set(tecnologia);
  }

  trackByNumero(index: number, proyecto: Proyecto): number {
    return proyecto.numero;
  }

  trackByTecnologia(index: number, tecnologia: string): string {
    return tecnologia;
  }
}