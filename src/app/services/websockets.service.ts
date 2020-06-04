import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WebsocketsService {
  public socketStatus = false;
  public usuario: Usuario;

  constructor(private socket: Socket, private router: Router) {
    this.cargarStorage();
    this.checkStatus();
  }

  // chequea status del usuario
  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
      this.cargarStorage();
    });
    this.socket.on('disconnect', () => {
      console.log('Desconectado al servidor');
      this.socketStatus = false;
    });
  }
  // Emitiendo evento(mensaje)
  emit(evento: string, payload?: any, callback?: any) {
    console.log('Emitiendo Mensaje tipo socket desde websocket.service.ts');
    this.socket.emit(evento, payload, callback);
  }
  // Escuchado un evento(Mensaje)
  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }
  // login del Usuario
  loginWS(nombre: string) {
    return new Promise((resolve, reject) => {
      this.emit('configurar-usuario', { nombre }, (resp) => {
        this.usuario = new Usuario(nombre);
        this.guardarStorage();
        resolve();
      });
    });
  }

  // logout de usuario
  logoutWS() {
    this.usuario = null;
    localStorage.removeItem('usuario');

    const payload = {
      nombre: 'sin-nombre',
    };
    this.emit('configurar-usuario', payload, () => {});
    this.router.navigateByUrl('');
  }

  // verificar si hay usuario
  getUsuario() {
    return this.usuario;
  }

  // Guardar usuario en el Local Storage

  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  // Verifico si el usuario esta ingresado o no

  cargarStorage() {
    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.loginWS(this.usuario.nombre);
    }
  }
}
