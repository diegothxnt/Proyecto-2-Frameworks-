import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TiempoService } from '../../services/tiempo.service';

@Component({
  selector: 'app-linea-tiempo',
  template: `
    <app-header></app-header>
    
    <div style="max-width:1200px; margin:0 auto; padding:20px;">
      <div style="margin-bottom:20px; display:flex; justify-content:flex-end;">
        <app-dropdown (visualizadorCambiado)="cambiarVisualizador($event)"></app-dropdown>
      </div>
      
      <div style="background:linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding:40px; border-radius:20px; text-align:center;">
        <h2 style="font-size:2em; margin-bottom:30px; color:#333;">📊 Línea de Tiempo</h2>
        
        <!-- Indicador de tiempo alterado -->
        <div *ngIf="offset !== 0" style="margin-bottom:20px; padding:10px; background:rgba(255,215,0,0.3); border-radius:20px;">
          ⚡ Tiempo alterado: {{ offset > 0 ? '+' : '' }}{{ offset }} seg
        </div>
        
        <div style="margin-bottom:30px;">
          <div style="font-size:3em; font-family:monospace; color:#007bff; margin-bottom:10px;">
            {{ hora.getHours() | number:'2.0' }}:{{ hora.getMinutes() | number:'2.0' }}:{{ hora.getSeconds() | number:'2.0' }}
          </div>
          <div style="font-size:1.2em; color:#666;">
            {{ hora.toLocaleDateString('es', { weekday:'long', year:'numeric', month:'long', day:'numeric' }) }}
          </div>
        </div>
        
        <div style="position:relative; height:150px; margin:50px 0;">
          <div style="position:absolute; top:50%; left:0; right:0; height:4px; background:#ddd;"></div>
          
          <div *ngFor="let evento of eventos" 
               style="position:absolute; top:0; transform:translateX(-50%); text-align:center;"
               [style.left.%]="evento.posicion">
            <div style="width:12px; height:12px; background:{{ evento.color }}; border-radius:50%; margin:0 auto; cursor:pointer;"></div>
            <div style="margin-top:5px; font-size:0.8em; font-weight:bold;">{{ evento.hora }}</div>
            <div style="font-size:0.7em; color:#666;">{{ evento.descripcion }}</div>
          </div>
          
          <div style="position:absolute; top:50%; transform:translate(-50%, -50%); z-index:10;"
               [style.left.%]="progreso">
            <div style="width:16px; height:16px; background:#f44336; border:3px solid white; border-radius:50%; box-shadow:0 2px 5px rgba(0,0,0,0.2);"></div>
          </div>
          
          <div style="position:absolute; top:50%; left:0; height:4px; background:#4caf50; width:{{ progreso }}%;"></div>
        </div>
        
        <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin-top:30px;">
          <div *ngFor="let evento of eventos" 
               style="background:white; padding:10px; border-radius:8px; box-shadow:0 2px 5px rgba(0,0,0,0.1);">
            <div style="font-weight:bold; color:{{ evento.color }};">{{ evento.hora }}</div>
            <div style="font-size:0.9em;">{{ evento.descripcion }}</div>
          </div>
        </div>
        
        <div style="margin-top:20px; padding:10px; background:rgba(0,123,255,0.1); border-radius:8px; color:#007bff;">
          Progreso del día: {{ progreso.toFixed(1) }}%
        </div>
      </div>
    </div>
  `
})
export class LineaTiempoComponent implements OnInit, OnDestroy {
  hora: Date = new Date();
  offset: number = 0;
  private subscription: any;
  
  eventos = [
    { hora: '09:00', descripcion: 'Reunión', posicion: 37.5, color: '#007bff' },
    { hora: '12:00', descripcion: 'Almuerzo', posicion: 50, color: '#28a745' },
    { hora: '15:30', descripcion: 'Presentación', posicion: 64.6, color: '#dc3545' },
    { hora: '18:00', descripcion: 'Fin jornada', posicion: 75, color: '#ffc107' }
  ];

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

  get progreso(): number {
    const minutosTotales = this.hora.getHours() * 60 + this.hora.getMinutes();
    return (minutosTotales / 1440) * 100;
  }

  cambiarVisualizador(ruta: string): void {
    this.router.navigate([ruta]);
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}