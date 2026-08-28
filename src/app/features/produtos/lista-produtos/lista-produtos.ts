import { Component, signal } from '@angular/core';
import { Produto } from '../produto/produto';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { produtosService } from '../../../core/services/produtos.service';
import { inject } from '@angular/core';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';  
import { ItemCarrinho } from '../../../core/models/item-carrinho';
import { RouterLink } from '@angular/router';
import { ProdutoLoja } from '../../../core/models/produto-loja';
import { FavoritosService } from '../../../core/services/favoritos.service';
@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe, RouterLink],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  produtos = signal<ProdutoLoja[]>([]);                                         
  carregando = signal (true);
  erro = signal <string | null>(null);
  //! Função para exibir produtos selecionados pelo usuário no console
  exibirProduto(nome: string){
    console.log('Produto Selecionado:', nome);
    this.produtoSelecionado.set(nome);
  }
// ===============INJECT ==========================
  private produtosService = inject(produtosService);
  public carrinhoFacade = inject(CarrinhoFacade);
  private favoritosService = inject(FavoritosService);

  quantidadeCarrinho = this.carrinhoFacade.quantidadeCarrinho;
  totalCarrinho = this.carrinhoFacade.totalCarrinho;


  //! Função que adiciona produto usando update()
  adicionarProduto(){
    this.produtos.update(listaAtual => [
      ...listaAtual,
      {nome:'Playstation 5', preco:3000},
    ]);
  }

  //! Função que contabiliza a quantidade de produtos na lista com método computed()
  totalProdutos = computed(() => this.produtos().length);
  //! Função que calcula o valor total dos produtos usando o método computed()
  valorTotal = computed(() =>
  {return this.produtos().reduce((total, item) =>
  total + item.preco,0)});

  valorTotalFormatado = computed(()=> this.valorTotal().toFixed(2));

  //! Função que substitui a lista atual usando o método set()
  substituirProdutos(){
    this.produtos.set([
      {nome:'Teclado', preco: 50 },
      {nome:'Mouse', preco: 15 },
      {nome:'Monitor', preco: 500 },
      {nome:'Desktop', preco: 1500 },
      {nome:'Headset', preco: 30 },
    ]);
  }
// MÉTODO HTTP CLINT (API)
  carregarProdutos(){
    this.erro.set(null); // limpa o erro antes de fazer requisição
    this.carregando.set(true); // ativar o sinal de carregando
    this.produtosService.buscarProdutos().subscribe({
      next: (dados) => {
        const produtos = this.produtosService.transformarProdutos(dados);
        this.produtos.set(produtos);
        this.carregando.set(false);
      },
      error: (erro) => {
        console.error('Erro ao carregar produtos: ', erro);
        this.erro.set('Erro ao carregar produtos. Por favor, tente novamente!');
        this.carregando.set(false);
      }
    });

  }
  //! Método para monitorar alterações em tempo real usando effect()
  constructor(){
    //!carrega a API
    this.carregarProdutos();

    effect(() =>{
      if (typeof document !== 'undefined'){
        document.title = `(${this.totalProdutos()}) - Loja da Mainara`
      }
    });
  }
  //! Método para criar um estado da seleção com signal string | null
  produtoSelecionado = signal <string | null>(null);
  //! Método para criar um estado para carrinho com signal
 
  adicionarAoCarrinho(produto: ItemCarrinho){
    this.carrinhoFacade.adicionarProdutoCarrinho(produto);
  }

  aoFavoritar(nomeProduto: string) {
    this.favoritosService.adicionar(nomeProduto);
  }
}
