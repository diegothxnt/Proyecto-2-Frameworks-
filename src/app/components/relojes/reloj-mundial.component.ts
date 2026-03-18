import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TiempoService } from '../../services/tiempo.service';

@Component({
  selector: 'app-reloj-mundial',
  template: `
    <app-header></app-header>
    
    <div style="max-width:1200px; margin:0 auto; padding:20px;">
      <div style="margin-bottom:20px; display:flex; justify-content:flex-end;">
        <app-dropdown (visualizadorCambiado)="cambiarVisualizador($event)"></app-dropdown>
      </div>
      
      <div style="background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding:40px; border-radius:20px; color:white;">
        <h2 style="font-size:2em; margin-bottom:30px; text-align:center;">🌍 Reloj Mundial</h2>
        
        <!-- Indicador de tiempo alterado -->
        <div *ngIf="offset !== 0" style="text-align:center; margin-bottom:20px; padding:10px; background:rgba(255,215,0,0.3); border-radius:20px;">
          ⚡ Tiempo alterado: {{ offset > 0 ? '+' : '' }}{{ offset }} seg
        </div>
        
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px,1fr)); gap:20px;">
          <div *ngFor="let ciudad of ciudades" 
               style="background:rgba(255,255,255,0.2); backdrop-filter:blur(10px); padding:20px; border-radius:15px; text-align:center;">
            <h3 style="margin:0 0 10px 0; font-size:1.3em;">{{ ciudad }}</h3>
            <div style="font-size:2em; font-family:monospace; margin:10px 0;">
              {{ horas[ciudad].getHours() | number:'2.0' }}:{{ horas[ciudad].getMinutes() | number:'2.0' }}:{{ horas[ciudad].getSeconds() | number:'2.0' }}
            </div>
            <div style="font-size:1em; opacity:0.8;">
              {{ horas[ciudad].toLocaleDateString() }}
            </div>
          </div>
        </div>
        
        <div style="margin-top:20px; text-align:center; font-size:1.2em; background:rgba(0,0,0,0.2); padding:10px; border-radius:10px;">
          Hora base: {{ hora.getHours() | number:'2.0' }}:{{ hora.getMinutes() | number:'2.0' }}:{{ hora.getSeconds() | number:'2.0' }}
        </div>
      </div>
    </div>
  `
})
export class RelojMundialComponent implements OnInit, OnDestroy {
  hora: Date = new Date();
  offset: number = 0;
  ciudades: string[] = ['Nueva York', 'Londres', 'Tokio', 'Sidney', 'Dubai', 'Moscú', 'Pekín', 'Río'];
  horas: {[key: string]: Date} = {};
  private subscription: any;

  constructor(
    private tiempoService: TiempoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Inicializar horas
    this.ciudades.forEach(ciudad => {
      this.horas[ciudad] = new Date();
    });
    
    // Suscribirse a los cambios de tiempo
    this.subscription = this.tiempoService.getTiempoActual().subscribe(
      tiempo => {
        this.hora = tiempo;
        this.actualizarHoras();
      }
    );
    this.offset = this.tiempoService.getOffset();
  }

  actualizarHoras(): void {
    const offsets: {[key: string]: number} = {
      'Nueva York': -4,
      'Londres': 1,
      'Tokio': 9,
      'Sidney': 11,
      'Dubai': 4,
      'Moscú': 3,
      'Pekín': 8,
      'Río': -3
    };

    this.ciudades.forEach(ciudad => {
      const fecha = new Date(this.hora);
      fecha.setHours(fecha.getUTCHours() + (offsets[ciudad] || 0));
      this.horas[ciudad] = fecha;
    });
  }

  cambiarVisualizador(ruta: string): void {
    this.router.navigate([ruta]);
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}