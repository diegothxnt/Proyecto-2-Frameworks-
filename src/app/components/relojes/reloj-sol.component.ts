import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TiempoService } from '../../services/tiempo.service';

@Component({
  selector: 'app-reloj-sol',
  template: `
    <app-header></app-header>
    
    <div style="max-width:1200px; margin:0 auto; padding:20px;">
      <div style="margin-bottom:20px; display:flex; justify-content:flex-end;">
        <app-dropdown (visualizadorCambiado)="cambiarVisualizador($event)"></app-dropdown>
      </div>
      
      <div style="background:linear-gradient(135deg, #ffd89b 0%, #ffb347 100%); padding:40px; border-radius:20px; text-align:center;">
        <h2 style="font-size:2em; margin-bottom:30px; color:#333;">☀️ Reloj de Sol</h2>
        
        <!-- Indicador de tiempo alterado -->
        <div *ngIf="offset !== 0" style="margin-bottom:20px; padding:10px; background:rgba(255,215,0,0.3); border-radius:20px;">
          ⚡ Tiempo alterado: {{ offset > 0 ? '+' : '' }}{{ offset }} seg
        </div>
        
        <div style="position:relative; width:350px; height:350px; margin:0 auto;">
          <svg width="350" height="350" viewBox="0 0 350 350">
            <circle cx="175" cy="175" r="150" fill="#f4e4c1" stroke="#8B4513" stroke-width="4"/>
            
            <text x="175" y="50" text-anchor="middle" fill="#8B4513" font-size="20">XII</text>
            <text x="290" y="185" text-anchor="middle" fill="#8B4513" font-size="20">III</text>
            <text x="175" y="310" text-anchor="middle" fill="#8B4513" font-size="20">VI</text>
            <text x="60" y="185" text-anchor="middle" fill="#8B4513" font-size="20">IX</text>
            
            <line *ngFor="let h of [1,2,3,4,5,6,7,8,9,10,11,12]" 
                  x1="175" y1="175" 
                  [attr.x2]="175 + 130 * Math.sin(h * 30 * Math.PI/180)"
                  [attr.y2]="175 - 130 * Math.cos(h * 30 * Math.PI/180)"
                  stroke="#8B4513" stroke-width="1" stroke-dasharray="5,5"/>
            
            <line x1="175" y1="175" 
                  [attr.x2]="175 + 140 * Math.sin((hora.getHours() % 12) * 30 * Math.PI/180)"
                  [attr.y2]="175 - 140 * Math.cos((hora.getHours() % 12) * 30 * Math.PI/180)"
                  stroke="#333" stroke-width="4" stroke-linecap="round"/>
            
            <circle cx="175" cy="175" r="8" fill="#8B4513"/>
            <circle cx="175" cy="175" r="4" fill="#FFD700"/>
          </svg>
          
          <div style="position:absolute; top:20px; right:20px; font-size:3em; animation:rotarSol 10s linear infinite;">
            ☀️
          </div>
        </div>
        
        <div style="margin-top:30px; display:grid; grid-template-columns:1fr 1fr; gap:20px;">
          <div style="background:rgba(255,255,255,0.3); padding:15px; border-radius:10px;">
            <div style="font-size:1.2em; margin-bottom:5px;">Hora solar</div>
            <div style="font-size:2em; font-family:monospace;">{{ hora.getHours() | number:'2.0' }}:{{ hora.getMinutes() | number:'2.0' }}:{{ hora.getSeconds() | number:'2.0' }}</div>
          </div>
          
          <div style="background:rgba(255,255,255,0.3); padding:15px; border-radius:10px;">
            <div style="font-size:1.2em; margin-bottom:5px;">Ángulo</div>
            <div style="font-size:2em;">{{ anguloSol }}°</div>
          </div>
          
          <div style="background:rgba(255,255,255,0.3); padding:15px; border-radius:10px; grid-column:span 2;">
            <div style="font-size:1.2em; margin-bottom:5px;">Posición del sol</div>
            <div style="font-size:1.5em;">{{ posicionSol }}</div>
          </div>
        </div>
        
        <div style="margin-top:20px; font-size:1.2em; color:#8B4513;">
          {{ hora.toLocaleDateString('es', { weekday:'long', year:'numeric', month:'long', day:'numeric' }) }}
        </div>
      </div>
    </div>
    <style>
      @keyframes rotarSol {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    </style>
  `
})
export class RelojSolComponent implements OnInit, OnDestroy {
  hora: Date = new Date();
  offset: number = 0;
  Math = Math;
  private subscription: any;

  constructor(
    private tiempoService: TiempoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Suscribirse a los cambios de tiempo
    this.subscription = this.tiempoService.getTiempoActual().subscribe(
      tiempo => {
        this.hora = tiempo;
      }
    );
    this.offset = this.tiempoService.getOffset();
  }

  get anguloSol(): number {
    return (this.hora.getHours() % 12) * 30 + this.hora.getMinutes() * 0.5;
  }

  get posicionSol(): string {
    const hora = this.hora.getHours();
    if (hora < 6) return '🌙 Noche';
    if (hora < 12) return '🌅 Mañana';
    if (hora < 18) return '☀️ Tarde';
    return '🌇 Atardecer';
  }

  cambiarVisualizador(ruta: string): void {
    this.router.navigate([ruta]);
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}