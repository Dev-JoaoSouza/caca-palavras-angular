import { Component, OnInit } from '@angular/core';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  icon = faCircleInfo

  constructor( public service: GameService ) { }

  ngOnInit(): void {}

}
