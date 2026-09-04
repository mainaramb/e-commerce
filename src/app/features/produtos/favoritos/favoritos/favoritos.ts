import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { PrecoFormatadoPipe } from "../../../../shared/pipes/preco-formatado-pipe";
import { Router } from "@angular/router";
import { FavoritosService } from "../../../../core/services/favoritos.service";
import { CarrinhoFacade } from "../../../../core/facades/carrinho.facade";
import { AuthFacade } from "../../../../core/facades/auth.facade";
import { FavoritosFacade } from "../../../../core/facades/favoritos.facade";
import { ItemCarrinho } from "../../../../core/models/item-carrinho";
@Component ({
    selector: 'app-favoritos',
    imports: [RouterLink, MatButtonModule, PrecoFormatadoPipe ],
    templateUrl: './favoritos.html',
    styleUrl: './favoritos.css',
})
export class Favoritos {
    private router =inject(Router);
    public carrinhoFacade =inject(CarrinhoFacade);
    private favoritosFacade =inject(FavoritosFacade);

    favoritos = this.favoritosFacade.itensFavoritos;
    quantidade = this.favoritosFacade.quantidadeFavoritos;
    vazio =this.favoritosFacade.favoritoVazio;


 removerItem(rmvItem:number){
  this.favoritosFacade.removerItem(rmvItem);
 }
 limparFavoritos(){
  this.favoritosFacade.limpar();
 }
 adicionarAoCarrinho(item:ItemCarrinho){
    this.carrinhoFacade.adicionarProdutoCarrinho(item);
 }
}