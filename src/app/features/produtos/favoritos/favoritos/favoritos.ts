import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { PrecoFormatadoPipe } from "../../../../shared/pipes/preco-formatado-pipe";
import { Router } from "@angular/router";
import { FavoritosService } from "../../../../core/services/favoritos.service";
import { CarrinhoFacade } from "../../../../core/facades/carrinho.facade";
import { AuthFacade } from "../../../../core/facades/auth.facade";
@Component ({
    selector: 'app-favoritos',
    imports: [RouterLink, MatButtonModule, PrecoFormatadoPipe ],
    templateUrl: './favoritos.html',
    styleUrl: './favoritos.css',
})
export class favoritosComponent {
    private router =inject(Router);
    public carrinhoFacade =inject(CarrinhoFacade);
    private authFacade =inject(AuthFacade);
    private favoritosService =inject(FavoritosService);
    public favoritos = this.favoritosService.favoritos;

 removerItem(rmvItem:number){
  this.favoritosService.removerItem(rmvItem);
 }
 limparFavoritos(){
  this.favoritosService.limpar();
 }
}