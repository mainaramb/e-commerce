import { isPlatformBrowser } from '@angular/common';
import { Injectable, signal, computed, effect, inject, PLATFORM_ID } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  private platformId = inject(PLATFORM_ID);
  private readonly chaveStorage = 'minha-loja-favoritos';
  readonly favoritos = signal<string[]>([]);
  public quantidadeFavoritos = computed(() => this.favoritos().length);


  adicionar(produto: string) {
    this.favoritos.update((lista) => [...lista, produto]);
  }
  removerItem(rmvItem: number) {
    this.favoritos.update((listaAtual) => listaAtual.filter((_, index) => index !== rmvItem));
  }
  limpar() {
    this.favoritos.set([]);
  }
}

