import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  template: `
    <div style="position:relative; display:inline-block;">
      <button 
        (click)="toggleDropdown()"
        style="background:#031573; color:white; padding:10px 20px; border:none; border-radius:4px; cursor:pointer; min-width:250px; font-size:16px;">
        {{ visualizadorActual }} ⌄
      </button>
      
      <div *ngIf="mostrar" style="position:absolute; top:100%; left:0; background:white; border:1px solid #ddd; border-radius:4px; width:100%; max-height:400px; overflow-y:auto; z-index:1000;">
        <div style="padding:10px; border-bottom:1px solid #ddd;">
          <input 
            type="text" 
            [(ngModel)]="filtro" 
            (keyup)="filtrarOpciones()"
            placeholder="Buscar visualizador..."
            style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px;">
        </div>
        
        <div>
          <div 
            *ngFor="let opcion of opcionesFiltradas"
            (click)="seleccionar(opcion)"
            style="padding:10px; cursor:pointer; border-bottom:1px solid #eee;">
            {{ opcion.nombre }}
          </div>
        </div>
      </div>
    </div>
  `
})
export class DropdownComponent {
  mostrar: boolean = false;
  filtro: string = '';
  visualizadorActual: string = 'Seleccionar visualizador';
  
  opciones: any[] = [
    { ruta: '/digital', nombre: '🕐 Reloj Digital' },
    { ruta: '/analogico', nombre: '⏰ Reloj Analógico' },
    { ruta: '/cronometro', nombre: '⏱️ Cronómetro' },
    { ruta: '/temporizador', nombre: '⏲️ Temporizador' },
    { ruta: '/regresiva', nombre: '⏳ Cuenta Regresiva' },
    { ruta: '/mundial', nombre: '🌍 Reloj Mundial' },
    { ruta: '/calendario', nombre: '📅 Calendario' },
    { ruta: '/lunar', nombre: '🌙 Fase Lunar' },
    { ruta: '/linea-tiempo', nombre: '📊 Línea de Tiempo' },
    { ruta: '/arena', nombre: '⌛ Reloj de Arena' },
    { ruta: '/agua', nombre: '💧 Reloj de Agua' },
    { ruta: '/sol', nombre: '☀️ Reloj de Sol' }
  ];
  
  opcionesFiltradas: any[] = this.opciones;
  @Output() visualizadorCambiado = new EventEmitter<string>();

  toggleDropdown(): void {
    this.mostrar = !this.mostrar;
  }

  filtrarOpciones(): void {
    this.opcionesFiltradas = this.opciones.filter(op => 
      op.nombre.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  seleccionar(opcion: any): void {
    this.visualizadorActual = opcion.nombre;
    this.visualizadorCambiado.emit(opcion.ruta);
    this.mostrar = false;
    this.filtro = '';
    this.opcionesFiltradas = this.opciones;
  }
}