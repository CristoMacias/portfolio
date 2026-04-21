import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DisponibilidadComponent } from '../../components/disponibilidad/disponibilidad.component';
import { MetodoTrabajoComponent } from '../../components/metodo-trabajo/metodo-trabajo.component';
import { NumerosVistazoComponent } from '../../components/numeros-vistazo/numeros-vistazo.component';


@Component({
  selector: 'app-home',
  imports: [DisponibilidadComponent, MetodoTrabajoComponent, NumerosVistazoComponent, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent {
}
