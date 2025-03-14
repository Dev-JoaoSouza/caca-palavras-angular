import { Injectable } from '@angular/core';
import { CacaPalavrasService } from './caca-palavras.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  intructions: string = "closed"
  table: string[][]
  winner: number = 0
  word: string = ""
  foundWords: string[]
  winnerScreen: boolean = false
  final: boolean = false

  constructor(public cacaPalavras: CacaPalavrasService) {
    this.table = this.newTable(cacaPalavras.tamanho);
    this.foundWords = this.createFoundWords(this.cacaPalavras.palavras[this.cacaPalavras.stageNumber -1].length);
  }

  createFoundWords(value: number): string[] {
    const found = [];

    for(let i = 0; i < value; i++) {
      found.push("noFound");
    }

    return found;
  }

  show() {
    this.intructions = "open";
  }

  hide() {
    this.intructions = "closed"
  }

  newTable(valor: number): string[][] {
    const tamanho = valor;
    const table = [];

    for(let i = 0; i < tamanho; i++) {
        let line = [];
        for(let j = 0; j < tamanho; j++) {
            line.push("0");
        }
        table.push(line);
    }

    return table;
  }

  checkWords() {
    const word = this.word;
    const list = this.cacaPalavras.palavras[this.cacaPalavras.stageNumber - 1];
    const tamanho = this.cacaPalavras.tamanho;

    for(let i = 0; i < list.length; i++) {
      if (list[i] === word) {

        for (let y = 0; y < tamanho; y++) {
          for(let x = 0; x < tamanho; x++) {
            if (this.table[x][y] === "1") {
              this.table[x][y] = "2";
            }
          }
        }

        this.foundWords[i] = "found";
        this.word = "";
        this.winner++;
        break;
      }
    }
  }

  paintCell(i: number, j: number) {
    const tabuleiro = this.cacaPalavras.tabuleiro;

    if (this.table[j][i] === "0") {
      this.table[j][i] = "1";
      this.word += tabuleiro[j][i];
    }

    if (this.table[j][i] === "2") {
      this.word += tabuleiro[j][i];
    }
  }

  erased () {
    const tamanho = this.cacaPalavras.tamanho;

    for(let y = 0; y < tamanho; y++) {
      for(let x = 0; x < tamanho; x++) {
        if(this.table[x][y] === "1") {
          this.table[x][y] = "0";
        }
      }
    }

    this.word = "";
  }

  isWinner() {
    const palavras = this.cacaPalavras.palavras[this.cacaPalavras.stageNumber - 1];
    
    if(this.winner === palavras.length) {
      if(this.cacaPalavras.stageNumber === this.cacaPalavras.palavras.length) {
        this.final = true;
        setTimeout(() => this.winnerScreen = true, 500);
      } else {
        setTimeout(() => this.winnerScreen = true, 500);
      }
    }
  }

  restart() {
    this.cacaPalavras.update();
    const tamanho = this.cacaPalavras.tamanho;

    for(let y = 0; y < tamanho; y++) {
      for(let x = 0; x < tamanho; x++) {
        this.table[x][y] = "0";
      }
    }

    this.winner = 0;
    this.word = "";
    this.table = this.newTable(this.cacaPalavras.tamanho);
    this.foundWords = this.createFoundWords(this.cacaPalavras.palavras[this.cacaPalavras.stageNumber - 1].length);
    this.winnerScreen = false;
    this.final = false;
  }

  next() {
    this.cacaPalavras.nextGame();
    const tamanho = this.cacaPalavras.tamanho;

    for(let y = 0; y < tamanho; y++) {
      for(let x = 0; x < tamanho; x++) {
        this.table[x][y] = "0";
      }
    }

    this.winner = 0;
    this.word = "";
    this.table = this.newTable(this.cacaPalavras.tamanho);
    this.foundWords = this.createFoundWords(this.cacaPalavras.palavras[this.cacaPalavras.stageNumber - 1].length);
    this.winnerScreen = false;
    this.final = false;
  }
}
