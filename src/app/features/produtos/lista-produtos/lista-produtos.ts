import { Component } from '@angular/core';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  produtos = signal ([
    {nome:'Teclado Gamer', preco:229.99},
    {nome:'Mouse Gamer', preco:129.99},
    {nome:'Monitor Gamer', preco:2000}
  ]);
  //! Função para exibir produtos selecionados pelo usuário no console
  exibirProduto(nome: string){
    console.log('Produto Selecionado:', nome);
    this.produtoSelecionado.set(nome);
  }
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
  total + item.preco,0
  )}
  );
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
  //! Método para monitorar alterações em tempo real usando effect()
  constructor(){
    effect(() =>{
      console.log('Lista de Produtos Alterados: ', this.produtos());
    });
    effect(() =>{
      console.log('Valor Total Atualizado: ', this.valorTotal());
    });
    effect(() =>{
      if (typeof document !== 'undefined'){
        document.title = `(${this.totalProdutos()}) - Loja da Mainara`
      }
    });
  }
  //! Método para criar um estado da seleção com signal string | null
  produtoSelecionado = signal <string | null>(null);
}
