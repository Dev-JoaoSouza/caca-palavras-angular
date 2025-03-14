import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacaPalavrasService {
  tabuleiro: string[][]
  palavras: string[][]
  letras: string[]
  tamanho: number
  stageNumber: number

  constructor() {
    this.tabuleiro = [
      ['h', 'u', 'n', 'c', 'i', 'e', 'x', 'q', 'g', 'g'],
      ['r', 'a', 'c', 'e', 'r', 'o', 'l', 'a', 'j', 't'],
      ['b', 'm', 'l', 'h', 'l', 'u', 'i', 'b', 'f', 'a'],
      ['k', 'd', 'i', 's', 'v', 'z', 'z', 'a', 'n', 'l'],
      ['g', 'l', 'j', 'b', 'c', 'd', 'i', 'c', 'p', 'o'],
      ['r', 'u', 'b', 'a', 'a', 'e', 'j', 'a', 'i', 'z'],
      ['f', 'o', 'v', 'n', 'j', 'o', 's', 'x', 'h', 'z'],
      ['s', 'i', 'h', 'a', 'u', 'n', 'f', 'i', 's', 'h'],
      ['w', 'i', 'c', 'n', 't', 'c', 'a', 'q', 'u', 'i'],
      ['d', 'j', 'e', 'a', 'o', 'b', 'b', 'o', 'x', 'y']
    ];
    this.palavras = [
      ["abacaxi", "acerola", "banana", "caju", "caqui"],
      ["cereja", "coco", "damasco", "figo", "framboesa"],
      ["goiaba", "graviola", "jabuticaba", "jaca", "kiwi"],
      ["laranja", "manga", "melancia", "morango", "noz"],
      ["pera", "pitanga", "pequi", "seriguela", "tangerina", "uva"],
    ];
    this.letras = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "y", "x", "z"];
    this.tamanho = 10;
    this.stageNumber = 1;
  }

  valueRandom(num: number): number {
    return Math.floor(Math.random() * num);
  }

  checkPoint(palavra: string, x: number, y: number, orientacao: number): boolean {
    let X
    let Y

    switch (orientacao) {
      case 0: //vertical
        for (let i = 0; i < palavra.length; i++) {
          X = x + i;
          Y = y;

          if ((X < this.tamanho) && (Y < this.tamanho)) {
            if (this.tabuleiro[X][Y] !== "0") {
              if (this.tabuleiro[X][Y] !== palavra[i]) return false;
            }

          } else {
            return false;
          }

        }
        break;
        
      case 1: //horizontal
        for (let i = 0; i < palavra.length; i++) {
          X = x;
          Y = y + i;

          if ((X < this.tamanho) && (Y < this.tamanho)) {
            if (this.tabuleiro[X][Y] !== "0") {
              if (this.tabuleiro[X][Y] !== palavra[i]) return false;
            }
          } else {
            return false;
          }
        }
        break;
    
      default:
        break;
    }
    return true;
  }

  zerarTabuleiro() {
    const tamanho = this.tamanho;

    for(let y = 0; y < tamanho; y++) {
      for(let x = 0; x < tamanho; x++) {
        this.tabuleiro[x][y] = "0";
      }
    }
  }

  inserirPalavras() {
    const frutas = this.palavras[this.stageNumber - 1];

    for (const palavra of frutas) {
      let x: number = 0;
      let y: number = 0;
      let orientation: number = 0;

      do {
        x = this.valueRandom(this.tamanho);
        y = this.valueRandom(this.tamanho);
        orientation = this.valueRandom(2);
      } while (!this.checkPoint(palavra, x, y, orientation));

      if (orientation === 0) {
        for (let i = 0; i < palavra.length; i++) {
          this.tabuleiro[x + i][y] = palavra[i];
        }
      }

      if (orientation === 1) {
        for (let i = 0; i < palavra.length; i++) {
          this.tabuleiro[x][y + i] = palavra[i];
        }
      }

    }
  }

  completarTabuleiro() {
    for (let y = 0; y < this.tamanho; y++) {
      for (let x = 0; x < this.tamanho; x++) {
        if (this.tabuleiro[x][y] === "0") {
          let num = this.valueRandom(this.letras.length);
          this.tabuleiro[x][y] = this.letras[num];
        }
      }
    }
  }

  // Função de chamada: Muda o lugar das palavras de forma randômica no tabuleiro
  update() {
    this.zerarTabuleiro();
    this.inserirPalavras();
    this.completarTabuleiro();
  }

  // Função de chamada: Muda as palavras e cria um novo tabuleiro
  nextGame() {
    if (this.stageNumber === this.palavras.length) {
      this.stageNumber = 1;
    } else {
      this.stageNumber++;
    }

    this.update();
  }
}
