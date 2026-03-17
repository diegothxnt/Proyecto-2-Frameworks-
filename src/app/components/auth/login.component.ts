import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div style="display:flex; justify-content:center; align-items:center; min-height:100vh; background:linear-gradient(135deg, #020d41 0%, #0a07a5 100%);">
      <div style="background:white; padding:40px; border-radius:20px; box-shadow:0 10px 30px rgba(0,0,0,0.2); width:100%; max-width:400px;">
        <h2 style="text-align:center; margin-bottom:30px; color:#333;">Iniciar Sesión</h2>
        
        <div style="margin-bottom:20px;">
          <label style="display:block; margin-bottom:5px; color:#666;">Email:</label>
          <input type="email" [(ngModel)]="email" placeholder=""
                 style="width:100%; padding:10px; border:2px solid #ddd; border-radius:8px; font-size:16px;">
        </div>
        
        <div style="margin-bottom:20px;">
          <label style="display:block; margin-bottom:5px; color:#666;">Contraseña:</label>
          <input type="password" [(ngModel)]="password" placeholder=""
                 style="width:100%; padding:10px; border:2px solid #ddd; border-radius:8px; font-size:16px;">
        </div>
        
        <div *ngIf="mensaje" style="text-align:center; padding:10px; margin:10px 0; border-radius:4px; 
                    background:{{ mensajeExito ? '#d4edda' : '#f8d7da' }}; color:{{ mensajeExito ? '#155724' : '#721c24' }};">
          {{ mensaje }}
        </div>
        
        <button (click)="login()" 
                style="width:100%; padding:12px; background:#1200ff; color:white; border:none; border-radius:8px; font-size:16px; cursor:pointer; margin-bottom:10px;">
          Iniciar Sesión
        </button>
        
        <button routerLink="/registro" 
                style="width:100%; padding:12px; background:#1200ff; color:white; border:none; border-radius:8px; font-size:16px; cursor:pointer;">
          Registrarse
        </button>
      </div>
    </div>
  `
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  mensaje: string = '';
  mensajeExito: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  login(): void {
    if (!this.email || !this.password) {
      this.mensaje = 'Complete todos los campos';
      this.mensajeExito = false;
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['/digital']);
        } else {
          this.mensaje = response.mensaje;
          this.mensajeExito = false;
        }
      }
    });
  }
}