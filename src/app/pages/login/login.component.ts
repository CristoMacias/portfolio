import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslateModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  submitted = false;
  showPassword = false;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberSession: [false]
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!control && control.invalid && control.touched;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.loginError = null;
    this.submitted = false;

    const { email, password, rememberSession } = this.loginForm.value;
    const emailNormalizado = email.trim().toLowerCase();

    this.usuarioService.getUsuarioPorEmail(emailNormalizado).subscribe({
      next: (usuarios: Usuario[]) => {
        if (!usuarios.length) {
          this.loginError = 'pages.login.errors.userNotFound';
          this.isLoading = false;
          return;
        }

        const usuario = usuarios[0];

        if (usuario.password !== password) {
          this.loginError = 'pages.login.errors.wrongPassword';
          this.isLoading = false;
          return;
        }

        const storage = rememberSession ? localStorage : sessionStorage;
        storage.setItem('authUser', JSON.stringify(usuario));
        storage.setItem('isLoggedIn', 'true');

        this.submitted = true;
        this.isLoading = false;

        this.router.navigate(['/home']).then(() => window.location.reload());
      },
      error: (err) => {
        console.error(err);
        this.loginError = 'pages.login.errors.server';
        this.isLoading = false;
      }
    });
  }
}