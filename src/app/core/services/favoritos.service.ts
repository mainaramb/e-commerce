import { isPlatformBrowser } from '@angular/common';
import { Injectable, signal, computed, effect, inject, PLATFORM_ID } from '@angular/core';
import { ItemFavoritos } from '../models/item-favoritos';
@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  private platformId = inject(PLATFORM_ID);
  private readonly chaveStorage = 'minha-loja-favoritos';
  public quantidadeFavoritos = computed(() => this.favoritos().length);
  private favoritos = signal<ItemFavoritos[]>(this.carregarFavoritosSalvo());

  itensFavoritos = computed(() => this.favoritos());
  quantidadeItens = computed(() => this.favoritos().length);
  favoritosVazio = computed(() => this.favoritos().length === 0);

  constructor() {
    // Sempre que o favoritos mudar, a lista atualizada será persistida.
    effect(() => {
      this.salvarFavoritos(this.favoritos());
    });
  }
  
  adicionar(produto: ItemFavoritos) {
    this.favoritos.update((lista) => [...lista, produto]);
  }
  removerItem(rmvItem: number) {
    this.favoritos.update((listaAtual) => listaAtual.filter((_, index) => index !== rmvItem));
  }
  limpar() {
    this.favoritos.set([]);
  }

  private estaNoNavegador(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private carregarFavoritosSalvo(): ItemFavoritos[] {
      if (!this.estaNoNavegador()) {
        return [];
      }
      const dadosSalvos = localStorage.getItem(this.chaveStorage);
      if (!dadosSalvos) {
        return [];
      }
      try {
        return JSON.parse(dadosSalvos) as ItemFavoritos[];
      } catch {
        return [];
      }
    }
    private salvarFavoritos(itens: ItemFavoritos[]) {
      if (this.estaNoNavegador()) {
        return;
      }
      localStorage.setItem(this.chaveStorage, JSON.stringify(itens));
    }
}

