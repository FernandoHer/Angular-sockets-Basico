import { Injectable } from '@angular/core';
import { WebsocketsService } from './websockets.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(public wsService: WebsocketsService) {}

  // Enviando mensaje desde la terminal
  sendMessage(mensaje: string) {
    const payload = {
      de: this.wsService.getUsuario().nombre,
      cuerpo: mensaje,
    };
    this.wsService.emit('mensaje', payload);
  }

  // Escuchando mensaje
  getMessages() {
    return this.wsService.listen('mensaje-nuevo');
  }

  // Escuchando mensaje Privado
  getMessagesPrivate() {
    return this.wsService.listen('mensaje-privado');
  }

  // Listado de usuarios activos
  getUsuariosActivos() {
    return this.wsService.listen('usuarios-activos');
  }

  // emitir usuarios activos
  emitirUsuariosActivos() {
    this.wsService.emit('obtener-usuarios');
  }
}
