import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FormacionService } from '../../services/formacion.service';
import { Formacion } from '../../models/formacion';

@Component({
  selector: 'app-formacion',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule],
  templateUrl: './formacion.component.html',
  styleUrl: './formacion.component.scss'
})
export class FormacionComponent implements OnInit {

  private formacionService = inject(FormacionService);

  pasos: Formacion[] = [];
  cargando = true;
  error = false;

  ngOnInit(): void {
    this.cargarFormacion();
  }

  cargarFormacion(): void {
    this.cargando = true;
    this.error = false;

    this.formacionService.getFormacion().subscribe({
      next: (data: Formacion[]) => {
        this.pasos = data.map((item, index) => ({
          numero: String(index + 1).padStart(2, '0'),
          titulo: item.titulo,
          descripcion: item.descripcion
        }));

        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar la formación:', err);
        this.error = true;
        this.cargando = false;
      }
    });
  }

  
}