import { Injectable, inject } from "@angular/core";
import { ItemFavoritos } from "../models/item-favoritos";
import { FavoritosService } from "../services/favoritos.service";
import { ProdutoLoja } from "../models/produto-loja";
@Injectable({providedIn: 'root'})

export class FavoritosFacade {
    private favoritosService = inject(FavoritosService);

    itensFavoritos =this.favoritosService.itensFavoritos;
    quantidadeFavoritos = this.favoritosService.quantidadeItens;
    favoritoVazio =this.favoritosService.favoritosVazio;

    favoritarProduto(produto:ItemFavoritos) {
        this.favoritosService.adicionar(produto);
    }
    limpar(){
        this.favoritosService.limpar();
    }
    removerItem(rmvItem: number){
        this.favoritosService.removerItem(rmvItem);
    }
    favoritosProdutos(produto:ProdutoLoja){
        this.favoritosService.adicionar(produto);
    }
    
}