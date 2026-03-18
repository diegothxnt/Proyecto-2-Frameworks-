import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TiempoService } from '../../services/tiempo.service';

@Component({
  selector: 'app-fase-lunar',
  template: `
    <app-header></app-header>
    
    <div style="max-width:1200px; margin:0 auto; padding:20px;">
      <div style="margin-bottom:20px; display:flex; justify-content:flex-end;">
        <app-dropdown (visualizadorCambiado)="cambiarVisualizador($event)"></app-dropdown>
      </div>
      
      <div style="background:linear-gradient(135deg, #141E30 0%, #243B55 100%); padding:40px; border-radius:20px; color:white; text-align:center;">
        <h2 style="font-size:2em; margin-bottom:30px;">🌙 Fase Lunar</h2>
        
        <!-- Indicador de tiempo alterado -->
        <div *ngIf="offset !== 0" style="margin-bottom:20px; padding:10px; background:rgba(255,215,0,0.3); border-radius:20px;">
          ⚡ Tiempo alterado: {{ offset > 0 ? '+' : '' }}{{ offset }} seg
        </div>
        
        <div style="font-size:8em; margin-bottom:20px; animation:brillo 3s infinite;">
          {{ obtenerEmojiLunar() }}
        </div>
        
        <div style="font-size:2em; margin-bottom:30px; font-weight:bold;">
          {{ obtenerFaseLunar() }}
        </div>
        
        <div style="background:rgba(255,255,255,0.1); padding:20px; border-radius:15px; margin-bottom:20px;">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
            <div>
              <div style="font-size:0.9em; opacity:0.7;">Iluminación</div>
              <div style="font-size:1.5em;">{{ iluminacion }}%</div>
            </div>
            <div>
              <div style="font-size:0.9em; opacity:0.7;">Edad lunar</div>
              <div style="font-size:1.5em;">{{ edadLunar }} días</div>
            </div>
          </div>
        </div>
        
        <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:10px;">
          <div style="font-size:1.2em; margin-bottom:5px;">{{ hora.getDate() }} de {{ meses[hora.getMonth()] }} {{ hora.getFullYear() }}</div>
          <div style="font-size:1.5em; font-family:monospace;">{{ hora.getHours() | number:'2.0' }}:{{ hora.getMinutes() | number:'2.0' }}:{{ hora.getSeconds() | number:'2.0' }}</div>
        </div>
      </div>
    </div>
    <style>
      @keyframes brillo {
        0%, 100% { opacity: 0.8; transform: scale(1); text-shadow: 0 0 20px rgba(255,255,255,0.5); }
        50% { opacity: 1; transform: scale(1.05); text-shadow: 0 0 40px rgba(255,255,255,0.8); }
      }
    </style>
  `
})
export class FaseLunarComponent implements OnInit, OnDestroy {
  hora: Date = new Date();
  offset: number = 0;
  meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
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
  
  obtenerFaseLunar(): string {
    const year = this.hora.getFullYear();
    const month = this.hora.getMonth() + 1;
    const day = this.hora.getDate();
    
    const phase = ((year + month + day) % 8);
    const fases = [
      'Luna Nueva', 'Luna Creciente', 'Cuarto Creciente', 
      'Gibosa Creciente', 'Luna Llena', 'Gibosa Menguante',
      'Cuarto Menguante', 'Luna Menguante'
    ];
    return fases[phase];
  }

  obtenerEmojiLunar(): string {
    const year = this.hora.getFullYear();
    const month = this.hora.getMonth() + 1;
    const day = this.hora.getDate();
    
    const phase = ((year + month + day) % 8);
    const emojis = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
    return emojis[phase];
  }

  get iluminacion(): number {
    const day = this.hora.getDate();
    return Math.round((day / 30) * 100);
  }

  get edadLunar(): number {
    return this.hora.getDate() % 30;
  }

  cambiarVisualizador(ruta: string): void {
    this.router.navigate([ruta]);
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}