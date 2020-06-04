import { Component, OnInit } from '@angular/core';
import { WebsocketsService } from './services/websockets.service';
import { ChatService } from './services/chat.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    public wsServices: WebsocketsService,
    public chatservie: ChatService
  ) {}

  ngOnInit() {
    this.chatservie.getMessagesPrivate().subscribe((msg) => {
      console.log('El mensage privado que me regresa', msg);
    });
  }
}
