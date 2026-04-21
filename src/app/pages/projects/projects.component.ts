import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ListaProyectosComponent } from '../../components/lista-proyectos/lista-proyectos.component';
import { gsap } from 'gsap';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, ListaProyectosComponent, TranslateModule],
  templateUrl: './projects.component.html',
  standalone: true,
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  ngAfterViewInit(): void {
    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out'
      }
    });

    tl.from('.js-projects-line', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 0.7
    })
    .from('.js-projects-eyebrow-text', {
      opacity: 0,
      x: -18,
      duration: 0.55
    }, '-=0.35')
    .from('.js-projects-title', {
      opacity: 0,
      y: 40,
      duration: 0.9
    }, '-=0.15')
    .from('.js-projects-intro', {
      opacity: 0,
      y: 22,
      duration: 0.7
    }, '-=0.45')
    .from('.js-projects-list', {
      opacity: 0,
      y: 32,
      duration: 0.85
    }, '-=0.3');
  }

}


