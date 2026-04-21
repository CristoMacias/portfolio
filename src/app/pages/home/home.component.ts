import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DisponibilidadComponent } from '../../components/disponibilidad/disponibilidad.component';
import { MetodoTrabajoComponent } from '../../components/metodo-trabajo/metodo-trabajo.component';
import { NumerosVistazoComponent } from '../../components/numeros-vistazo/numeros-vistazo.component';
import { gsap } from 'gsap';


@Component({
  selector: 'app-home',
  imports: [DisponibilidadComponent, MetodoTrabajoComponent, NumerosVistazoComponent, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent {

  ngAfterViewInit(): void {
    gsap.to(".imagen-portada", {
      scale: 1.05,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    })

    setTimeout(() => {

      gsap.to('.imagen-portada', {
        scale: 1.05,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.imagen-portada', {
        scale: 1.08,
        opacity: 0,
        duration: 1.2,
      })
        .from('.texto-portada h1', {
          y: 28,
          opacity: 0,
          duration: 0.7,
        }, '-=0.4')
        .from('.texto-portada p', {
          y: 20,
          opacity: 0,
          duration: 0.6,
        }, '-=0.4')
        .from('.disponibilidad', {
          y: 16,
          opacity: 0,
          duration: 0.6,
        }, '-=0.3');

    }, 50);

  }
}
