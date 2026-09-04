import { Component, Input, Output, EventEmitter, output } from '@angular/core';
import { UpperCasePipe, CurrencyPipe } from '@angular/common';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ItemCarrinho } from '../../../core/models/item-carrinho';
import {MatIconModule} from '@angular/material/icon';
import { FavoritosService } from '../../../core/services/favoritos.service';
import { Router } from '@angular/router';
import { ItemFavoritos } from '../../../core/models/item-favoritos';
@Component({
  selector: 'app-produto',
  imports: [UpperCasePipe, PrecoFormatadoPipe, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
// Adiciona a classe Produto e condicionais
export class Produto {
  //entrada de dados da lista Produtos em lista-produtos
  @Input() nome: string ='';
  @Input() preco: number = 0;
  //Saída de dados de Produtos selecionados para lista-produtos
  @Output() produtoSelecionado = new EventEmitter<string>();
  selecionarProduto(){
    this.produtoSelecionado.emit(this.nome);
  }

@Output() produtoAdicionado = new EventEmitter<ItemCarrinho>();
@Output() favoritosAdicionado = new EventEmitter<ItemFavoritos>();

adicionarAoCarrinho() {
  this.produtoAdicionado.emit({
    nome:this.nome,
    preco:this.preco,
  });
}
adicionarFavoritos() {
  this.favoritosAdicionado.emit({
    nome:this.nome,
    preco:this.preco,
  });
}

}
