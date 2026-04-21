import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EncabezadoAboutMeComponent } from '../../components/encabezado-about-me/encabezado-about-me.component';
import { CarouselHabilidadesComponent } from '../../components/carousel-habilidades/carousel-habilidades.component';
import { SkillsServiceService } from '../../services/skills-service.service';
import { FormacionComponent } from '../../components/formacion/formacion.component';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-about-me',
  imports: [AsyncPipe, EncabezadoAboutMeComponent, CarouselHabilidadesComponent, FormacionComponent, RouterLink, TranslateModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
  standalone: true
})
export class AboutMeComponent {
  private readonly skillsService = inject(SkillsServiceService);
  secciones$ = this.skillsService.getSkills();

  ngAfterViewInit(): void {
    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
        duration: 0.9
      }
    });

    tl.from('.js-eyebrow-line', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 0.6
    })
    .from('.js-eyebrow-text', {
      opacity: 0,
      x: -20,
      duration: 0.7
    }, '-=0.45')
    .from('.js-hero-title', {
      opacity: 0,
      y: 40,
      duration: 1
    }, '-=0.2')
    .from('.js-hero-intro', {
      opacity: 0,
      y: 24,
      duration: 0.6
    }, '-=0.45')
    .from('.presentacion', {
      opacity: 0,
      y: 24,
      duration: 0.6
    }, '-=0.45');
  }

}
