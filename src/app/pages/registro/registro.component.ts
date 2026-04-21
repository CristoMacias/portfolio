import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';

interface RegistroForm {
  nombre: string;
  email: string;
  password: string;
  confirmar: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {

  form = signal<RegistroForm>({
    nombre: '',
    email: '',
    password: '',
    confirmar: ''
  });

  enviado = signal(false);
  exito = signal(false);
  emailDuplicado = signal(false);
  cargando = signal(false);
  errorServidor = signal<string | null>(null);

  nombreValido = computed(() => this.form().nombre.trim().length > 0);

  emailValido = computed(() => {
    const email = this.form().email.trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  });

  passwordValida = computed(() => this.form().password.length >= 6);

  passwordsCoinciden = computed(() =>
    this.form().password === this.form().confirmar
  );

  formularioValido = computed(() =>
    this.nombreValido() &&
    this.emailValido() &&
    this.passwordValida() &&
    this.passwordsCoinciden()
  );

  constructor(private usuarioService: UsuarioService) {}

  updateField<K extends keyof RegistroForm>(campo: K, valor: RegistroForm[K]) {
    this.form.update(actual => ({
      ...actual,
      [campo]: valor
    }));
  }

  resetForm() {
    this.form.set({
      nombre: '',
      email: '',
      password: '',
      confirmar: ''
    });
  }

  registrar() {
    this.enviado.set(true);
    this.exito.set(false);
    this.emailDuplicado.set(false);
    this.errorServidor.set(null);

    if (!this.formularioValido()) {
      return;
    }

    this.cargando.set(true);

    const emailNormalizado = this.form().email.trim().toLowerCase();

    this.usuarioService.getUsuarios().subscribe({
      next: (usuarios) => {
        const existe = usuarios.some(
          u => u.email.trim().toLowerCase() === emailNormalizado
        );

        if (existe) {
          this.emailDuplicado.set(true);
          this.cargando.set(false);
          return;
        }

        const nuevoUsuario: Usuario = {
          id: Date.now().toString(),
          nombre: this.form().nombre.trim(),
          email: emailNormalizado,
          password: this.form().password,
          creadoEn: new Date().toISOString()
        };

        this.usuarioService.crearUsuario(nuevoUsuario).subscribe({
          next: (usuarioCreado) => {
            console.log('Usuario registrado:', usuarioCreado);
            this.exito.set(true);
            this.enviado.set(false);
            this.cargando.set(false);
            this.resetForm();
          },
          error: (err) => {
            console.error('Error al crear usuario', err);
            this.errorServidor.set('pages.registro.errors.saveUser');
            this.cargando.set(false);
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener usuarios', err);
        this.errorServidor.set('pages.registro.errors.checkEmail');
        this.cargando.set(false);
      }
    });
  }
}