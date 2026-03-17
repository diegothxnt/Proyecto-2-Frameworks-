import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario, Sesion } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarios: Usuario[] = [];
  private sesionActual: Sesion | null = null;

  constructor() {
    // Cargar usuarios del localStorage
    const stored = localStorage.getItem('usuarios');
    if (stored) {
      this.usuarios = JSON.parse(stored);
    }
    
    // RESTAURAR SESIÓN AL INICIAR
    const sesionGuardada = localStorage.getItem('sesion');
    if (sesionGuardada) {
      this.sesionActual = JSON.parse(sesionGuardada);
    }
  }

  registrar(usuario: Usuario): Observable<{success: boolean, mensaje: string}> {
    if (this.usuarios.find(u => u.email === usuario.email)) {
      return of({success: false, mensaje: 'El email ya está registrado'});
    }

    const nuevoUsuario = {
      ...usuario,
      id: this.usuarios.length + 1,
      fechaRegistro: new Date()
    };
    
    this.usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    
    return of({success: true, mensaje: 'Registro exitoso'});
  }

  login(email: string, password: string): Observable<{success: boolean, mensaje: string, usuario?: Usuario}> {
    const usuario = this.usuarios.find(u => u.email === email && u.password === password);
    
    if (usuario) {
      // Crear sesión
      this.sesionActual = {
        usuario,
        token: 'token-' + Math.random().toString(36).substring(2)
      };
      // Guardar en localStorage
      localStorage.setItem('sesion', JSON.stringify(this.sesionActual));
      return of({success: true, mensaje: 'Login exitoso', usuario});
    }
    
    return of({success: false, mensaje: 'Email o contraseña incorrectos'});
  }

  logout(): void {
    this.sesionActual = null;
    localStorage.removeItem('sesion');
  }

  getSesionActual(): Sesion | null {
    return this.sesionActual;
  }

  estaAutenticado(): boolean {
    return this.sesionActual !== null;
  }
}