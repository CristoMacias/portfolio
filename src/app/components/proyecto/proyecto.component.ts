import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Proyecto } from '../../models/proyecto';

@Component({
  selector: 'app-proyecto',
  imports: [CommonModule, TranslateModule],
  standalone: true,
  templateUrl: './proyecto.component.html',
  styleUrl: './proyecto.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProyectoComponent {

  @Input({ required: true }) proyecto!: Proyecto;
  @Input() destacado = false;

}
