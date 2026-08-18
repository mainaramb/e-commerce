import { Component, computed, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  // faz com o usuário volte para uma página pública
  private router = inject(Router);
  private authService = inject(AuthService);

  totalProdutosCadastrados = signal(20);
  pedidosPendentes = signal(6);
  usuariosCadastrados = signal(7);

  usuarioAtual = this.authService.usuarioAtual;

  //metodo que reforça quem é o usuário
  areaPerfil = computed(() => {
    const usuario = this.usuarioAtual();

//condiçao que mostra se o usuario está ou autenticado
    if(!usuario){
      return 'Nenhum usuário autenticado';
    }
    return `Usuário autenticado como: ${usuario.perfil}`;
  });
// direciona o usuário a pagina de login
  sair(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
