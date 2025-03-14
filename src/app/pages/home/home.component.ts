import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './home.component.response.css']
})
export class HomeComponent implements OnInit {

  constructor(public service: GameService) {}

  ngOnInit(): void {}

}
