import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  authService = inject(AuthService);
  router = inject(Router);

  erroLogin = signal(false);

  formulario = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    senha: new FormControl('',[Validators.required, Validators.minLength(6)])
  });

  entrar(){
    this.erroLogin.set(false);

    if(this.formulario.invalid){
      this.formulario.markAllAsTouched();
      return;
    }
    const email = this.formulario.value.email ?? '';
    const senha = this.formulario.value.email ?? '';

    const loginfinalizado = this.authService.login(email, senha);

    if(!loginfinalizado){
      this.erroLogin.set(true);
      return;
    }

    this.router.navigateByUrl('/produtos');
  }
}
