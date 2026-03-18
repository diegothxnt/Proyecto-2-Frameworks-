import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TiempoService } from '../../services/tiempo.service';

@Component({
  selector: 'app-calendario',
  template: `
    <app-header></app-header>
    
    <div style="max-width:1200px; margin:0 auto; padding:20px;">
      <div style="margin-bottom:20px; display:flex; justify-content:flex-end;">
        <app-dropdown (visualizadorCambiado)="cambiarVisualizador($event)"></app-dropdown>
      </div>
      
      <div style="background:white; padding:30px; border-radius:20px; box-shadow:0 10px 30px rgba(0,0,0,0.2);">
        <h2 style="font-size:2em; margin-bottom:30px; text-align:center; color:#333;">📅 Calendario</h2>
        
        <!-- Indicador de tiempo alterado -->
        <div *ngIf="offset !== 0" style="text-align:center; margin-bottom:20px; padding:10px; background:rgba(255,215,0,0.3); border-radius:20px;">
          ⚡ Tiempo alterado: {{ offset > 0 ? '+' : '' }}{{ offset }} seg
        </div>
        
        <div style="max-width:500px; margin:0 auto;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
            <button (click)="mesAnterior()" style="background:none; border:none; font-size:2em; cursor:pointer;">◀</button>
            <h3 style="font-size:1.5em; margin:0; text-transform:capitalize;">{{ meses[mesActual] }} {{ anioActual }}</h3>
            <button (click)="mesSiguiente()" style="background:none; border:none; font-size:2em; cursor:pointer;">▶</button>
          </div>
          
          <div style="display:grid; grid-template-columns:repeat(7,1fr); gap:5px; margin-bottom:10px;">
            <div *ngFor="let dia of diasSemana" style="text-align:center; font-weight:bold; color:#666;">{{ dia }}</div>
          </div>
          
          <div style="display:grid; grid-template-columns:repeat(7,1fr); gap:5px;">
            <div *ngFor="let dia of dias" 
                 style="aspect-ratio:1; display:flex; align-items:center; justify-content:center; 
                        background:{{ dia === 0 ? 'transparent' : (esHoy(dia) ? '#007bff' : '#f8f9fa') }};
                        color:{{ esHoy(dia) ? 'white' : '#333' }};
                        border-radius:5px; cursor:{{ dia === 0 ? 'default' : 'pointer' }};
                        font-weight:{{ esHoy(dia) ? 'bold' : 'normal' }};
                        transition:transform 0.2s;">
              {{ dia !== 0 ? dia : '' }}
            </div>
          </div>
          
          <div style="margin-top:30px; padding:20px; background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius:10px; color:white;">
            <div style="font-size:1.3em; margin-bottom:10px;">{{ hora.toLocaleDateString('es', { weekday:'long', year:'numeric', month:'long', day:'numeric' }) }}</div>
            <div style="font-size:2em; font-family:monospace;">{{ hora.getHours() | number:'2.0' }}:{{ hora.getMinutes() | number:'2.0' }}:{{ hora.getSeconds() | number:'2.0' }}</div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CalendarioComponent implements OnInit, OnDestroy {
  hora: Date = new Date();
  offset: number = 0;
  fechaSeleccionada: Date = new Date();
  mesActual: number = new Date().getMonth();
  anioActual: number = new Date().getFullYear();
  dias: number[] = [];
  meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  diasSemana: string[] = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
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
    this.actualizarCalendario();
  }

  actualizarCalendario(): void {
    this.mesActual = this.fechaSeleccionada.getMonth();
    this.anioActual = this.fechaSeleccionada.getFullYear();
    this.generarDias();
  }

  generarDias(): void {
    const primerDia = new Date(this.anioActual, this.mesActual, 1);
    const ultimoDia = new Date(this.anioActual, this.mesActual + 1, 0);
    
    this.dias = [];
    
    for (let i = 0; i < primerDia.getDay(); i++) {
      this.dias.push(0);
    }
    
    for (let i = 1; i <= ultimoDia.getDate(); i++) {
      this.dias.push(i);
    }
  }

  mesAnterior(): void {
    this.fechaSeleccionada.setMonth(this.fechaSeleccionada.getMonth() - 1);
    this.actualizarCalendario();
  }

  mesSiguiente(): void {
    this.fechaSeleccionada.setMonth(this.fechaSeleccionada.getMonth() + 1);
    this.actualizarCalendario();
  }

  esHoy(dia: number): boolean {
    const hoy = new Date();
    return dia === hoy.getDate() && 
           this.mesActual === hoy.getMonth() && 
           this.anioActual === hoy.getFullYear();
  }

  cambiarVisualizador(ruta: string): void {
    this.router.navigate([ruta]);
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}