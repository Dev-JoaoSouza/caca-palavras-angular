import { Component, OnInit } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css', './modal.component.response.css']
})
export class ModalComponent implements OnInit {
  icon = faXmark

  constructor(public service: GameService) {}

  ngOnInit(): void {}

}
