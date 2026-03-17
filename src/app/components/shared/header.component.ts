import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TiempoService } from '../../services/tiempo.service';

@Component({
  selector: 'app-header',
  template: `
    <header style="background:#050761; color:white; padding:1rem;">
      <div style="max-width:1200px; margin:0 auto;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h2 style="margin:0; cursor:pointer;" (click)="irAlInicio()">Visualizador de Tiempo</h2>
          
          <div style="display:flex; align-items:center; gap:20px;">
            <span> {{ usuario?.nombre }}</span>
            <button (click)="logout()" style="padding:8px 16px; background:#d11106; color:white; border:none; border-radius:4px; cursor:pointer;">
              Cerrar Sesión
            </button>
          </div>
        </div>
        
        <div style="display:flex; align-items:center; gap:20px; background:rgba(255,255,255,0.1); padding:10px; border-radius:8px; margin-top:1rem;">
          <label style="color:white;"> Ajustar tiempo:</label>
          <input 
            type="range" 
            min="-3600" 
            max="3600" 
            step="60"
            [value]="offset"
            (input)="cambiarTiempo($event)"
            style="flex:1; height:8px;">
          <span style="min-width:100px; font-family:monospace;">{{ offset > 0 ? '+' : '' }}{{ offset }} seg</span>
          <button (click)="reiniciarTiempo()" style="padding:5px 10px; background:#d11106; color:white; border:none; border-radius:4px; cursor:pointer;">
            Reiniciar
          </button>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent implements OnInit {
  usuario: any = null;
  offset: number = 0;

  constructor(
    private authService: AuthService,
    private tiempoService: TiempoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const sesion = this.authService.getSesionActual();
    this.usuario = sesion?.usuario;
    this.offset = this.tiempoService.getOffset();
  }

  irAlInicio(): void {
    this.router.navigate(['/digital']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  cambiarTiempo(event: any): void {
    this.offset = parseInt(event.target.value);
    this.tiempoService.setOffset(this.offset);
  }

  reiniciarTiempo(): void {
    this.offset = 0;
    this.tiempoService.setOffset(0);
  }
}