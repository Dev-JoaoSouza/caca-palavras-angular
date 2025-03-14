import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-winner-screen',
  templateUrl: './winner-screen.component.html',
  styleUrls: ['./winner-screen.component.css', './winner-screen.component.responsive.css']
})
export class WinnerScreenComponent implements OnInit {

  constructor(public service: GameService) { }

  ngOnInit(): void {
  }

}
