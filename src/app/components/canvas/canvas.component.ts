import { AfterContentChecked, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css', './canvas.component.response.css']
})
export class CanvasComponent implements OnInit, AfterContentChecked {
  @ViewChild('boardGame', { static: true })
  canvas!: ElementRef;
  canvasListen!: Function;

  constructor(private renderer: Renderer2, public service: GameService) { }

  ngOnInit(): void {
    this.drawCanvas();
    this.clickEvents();
  }

  ngOnDestroy() {
    this.canvasListen();
  }

  ngAfterContentChecked(): void {
    this.drawCanvas();
  }

  drawCanvas() {
    const canvas: HTMLCanvasElement = this.canvas.nativeElement
    const context = canvas.getContext('2d');
    const tamanho = this.service.cacaPalavras.tamanho;
    const tabuleiro = this.service.cacaPalavras.tabuleiro;

    if (context) {
      const x = context.canvas.width / tamanho;
      const y = context.canvas.height / tamanho;

      for(let i = 0; i < tamanho; i++) {

        for(let j = 0; j < tamanho; j++) {
          let typeColor = this.service.table[j][i];
          let backgroundColor: string = "";
          let letterColor: string = "";

          if (typeColor === "0"){

            backgroundColor = "#FFFFFF";
            letterColor = "rgb(5, 5, 5)";

          } else if (typeColor === "1") {

            backgroundColor = "rgb(255, 0, 0)";
            letterColor = "rgb(255, 255, 255)";

          } else if (typeColor === "2") {

            backgroundColor = "rgb(0, 201, 0)";
            letterColor = "rgb(255, 255, 255)";

          }

          context.fillStyle = backgroundColor;
          context.fillRect(x * i, y * j, x, y);

          context.fillStyle = letterColor;
          context.font = "40px Times New Roman";
          let letra = tabuleiro[j][i];
          context.fillText(letra, (x * i) + 10, (y * j) + 35);

        }
      }
          
      for (let z = 0; z < tamanho; z++) {
        context.lineWidth = 1;
        context.strokeStyle = "#000000";
            
        context.beginPath();
        context.lineTo( x * z, 0);
        context.lineTo( x * z, context.canvas.height);
        context.stroke();
    
        context.beginPath();
        context.lineTo(0, y * z);
        context.lineTo(context.canvas.width, y * z);
        context.stroke();
      }
    }
  }

  clickEvents() {
    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    const tamanho = this.service.cacaPalavras.tamanho;

    this.canvasListen = this.renderer.listen(canvas, 'click', e => {
      const janela = window.innerWidth;
      let i;
      let j;

      if (janela < 500) {
        i = janela / tamanho;
        j = janela / tamanho;
      } else {
        i = canvas.width / tamanho;
        j = canvas.height / tamanho;
      }

      let coordenadaX = Math.floor(e.offsetX / i);
      let coordenadaY = Math.floor(e.offsetY / j);

      this.service.paintCell(coordenadaX, coordenadaY);
      this.service.checkWords();
      this.service.isWinner();
    });
  }

}
