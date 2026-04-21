import { Component, OnInit, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-nav-bar',
  imports: [MatSidenavModule, MatIconModule, MatButtonModule, RouterModule, TranslateModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  standalone: true
})
export class NavBarComponent implements OnInit {

  NavBarActive = false;

  usuario: Usuario | null = null;
  nombre: string | null = null;
  sesionIniciada = false;
  idioma: string = 'es';
  usuarioAdmin = false;

  private translate = inject(TranslateService);

  ngOnInit(): void {
    const idiomaGuardado = localStorage.getItem('lang');

    if(idiomaGuardado) {
      this.idioma = idiomaGuardado;
    }
    this.translate.use(this.idioma);
    this.cargarUsuario();
    if(this.usuario?.email === "admin@admin.es") {
      this.usuarioAdmin = true;
    }
  }

  cambiarIdioma(event: Event){
    const valor = (event.target as HTMLSelectElement).value;
    this.idioma = valor;
    this.translate.use(valor);

    localStorage.setItem('lang', valor);
  }

  pulsarNavBar() {
    this.NavBarActive = !this.NavBarActive;
  }

  private cargarUsuario(): void {
    const data =
      localStorage.getItem('authUser') ||
      sessionStorage.getItem('authUser');

    if (data) {
      this.usuario = JSON.parse(data);
      this.nombre = this.usuario?.nombre || null;
      this.sesionIniciada = true;
    }
  }

  cerrarSesion(): void {
    localStorage.removeItem('authUser');
    localStorage.removeItem('isLoggedIn');

    sessionStorage.removeItem('authUser');
    sessionStorage.removeItem('isLoggedIn');

    this.usuario = null;
    this.nombre = null;
    this.sesionIniciada = false;
  }
}