import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EncabezadoAboutMeComponent } from '../../components/encabezado-about-me/encabezado-about-me.component';
import { CarouselHabilidadesComponent } from '../../components/carousel-habilidades/carousel-habilidades.component';
import { SkillsServiceService } from '../../services/skills-service.service';
import { FormacionComponent } from '../../components/formacion/formacion.component';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

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

}
