import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  template: `
    <div style="display:flex; justify-content:center; align-items:center; min-height:100vh; background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <div style="background:white; padding:40px; border-radius:20px; box-shadow:0 10px 30px rgba(0,0,0,0.2); width:100%; max-width:400px;">
        <h2 style="text-align:center; margin-bottom:30px; color:#333;">Registro</h2>
        
        <div style="margin-bottom:20px;">
          <label style="display:block; margin-bottom:5px; color:#666;">Nombre:</label>
          <input type="text" [(ngModel)]="nombre" placeholder="Tu nombre"
                 style="width:100%; padding:10px; border:2px solid #ddd; border-radius:8px; font-size:16px;">
        </div>
        
        <div style="margin-bottom:20px;">
          <label style="display:block; margin-bottom:5px; color:#666;">Email:</label>
          <input type="email" [(ngModel)]="email" placeholder="correo@ejemplo.com"
                 style="width:100%; padding:10px; border:2px solid #ddd; border-radius:8px; font-size:16px;">
        </div>
        
        <div style="margin-bottom:20px;">
          <label style="display:block; margin-bottom:5px; color:#666;">Contraseña:</label>
          <input type="password" [(ngModel)]="password" placeholder="******"
                 style="width:100%; padding:10px; border:2px solid #ddd; border-radius:8px; font-size:16px;">
        </div>
        
        <div style="margin-bottom:20px;">
          <label style="display:block; margin-bottom:5px; color:#666;">Confirmar:</label>
          <input type="password" [(ngModel)]="confirmPassword" placeholder="******"
                 style="width:100%; padding:10px; border:2px solid #ddd; border-radius:8px; font-size:16px;">
        </div>
        
        <div *ngIf="mensaje" style="text-align:center; padding:10px; margin:10px 0; border-radius:4px; 
                    background:{{ mensajeExito ? '#d4edda' : '#f8d7da' }}; color:{{ mensajeExito ? '#155724' : '#721c24' }};">
          {{ mensaje }}
        </div>
        
        <button (click)="registrar()" 
                style="width:100%; padding:12px; background:#28a745; color:white; border:none; border-radius:8px; font-size:16px; cursor:pointer; margin-bottom:10px;">
          Registrarse
        </button>
        
        <button routerLink="/login" 
                style="width:100%; padding:12px; background:#6c757d; color:white; border:none; border-radius:8px; font-size:16px; cursor:pointer;">
          Volver al Login
        </button>
      </div>
    </div>
  `
})
export class RegistroComponent {
  nombre: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  mensaje: string = '';
  mensajeExito: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  registrar(): void {
    if (!this.nombre || !this.email || !this.password) {
      this.mensaje = 'Complete todos los campos';
      this.mensajeExito = false;
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.mensaje = 'Las contraseñas no coinciden';
      this.mensajeExito = false;
      return;
    }

    if (this.password.length < 6) {
      this.mensaje = 'Mínimo 6 caracteres';
      this.mensajeExito = false;
      return;
    }

    this.authService.registrar({
      nombre: this.nombre,
      email: this.email,
      password: this.password,
      fechaRegistro: new Date()
    }).subscribe({
      next: (response) => {
        if (response.success) {
          this.mensaje = '¡Registro exitoso!';
          this.mensajeExito = true;
          setTimeout(() => this.router.navigate(['/login']), 1500);
        } else {
          this.mensaje = response.mensaje;
          this.mensajeExito = false;
        }
      }
    });
  }
}