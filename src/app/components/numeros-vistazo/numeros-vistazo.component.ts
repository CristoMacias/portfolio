import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';

interface MetricaVistazo {
  valor: string;
  etiqueta: string;
}

@Component({
  selector: 'app-numeros-vistazo',
  imports: [CommonModule, MatCardModule, MatDividerModule, TranslateModule],
  templateUrl: './numeros-vistazo.component.html',
  styleUrl: './numeros-vistazo.component.scss',
  standalone: true
})
export class NumerosVistazoComponent {

  metricas: MetricaVistazo[] = [
    {
      valor: '+4',
      etiqueta: 'components.numerosVistazo.metrics.projectsDelivered'
    },
    {
      valor: '4 meses',
      etiqueta: 'components.numerosVistazo.metrics.experience'
    },
    {
      valor: 'Angular · Spring Boot',
      etiqueta: 'components.numerosVistazo.metrics.stack'
    }
  ];

}
