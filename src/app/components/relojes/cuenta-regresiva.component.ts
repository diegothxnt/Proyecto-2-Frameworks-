import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuenta-regresiva',
  template: `
    <app-header></app-header>
    
    <div style="max-width:1200px; margin:0 auto; padding:20px;">
      <div style="margin-bottom:20px; display:flex; justify-content:flex-end;">
        <app-dropdown (visualizadorCambiado)="cambiarVisualizador($event)"></app-dropdown>
      </div>
      
      <div style="background:linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding:40px; border-radius:20px; color:white; text-align:center;">
        <h2 style="font-size:2em; margin-bottom:30px;">⏳ Cuenta Regresiva</h2>
        
        <div *ngIf="!activo">
          <input type="datetime-local" [(ngModel)]="fechaObjetivo" 
                 [min]="fechaMinima"
                 style="padding:15px; font-size:1.2em; border:none; border-radius:10px; margin-bottom:20px; width:100%;">
          <button (click)="iniciar()" 
                  style="padding:15px 40px; background:#4caf50; color:white; border:none; border-radius:50px; font-size:1.2em; cursor:pointer;">
            Iniciar Cuenta Regresiva
          </button>
        </div>
        
        <div *ngIf="activo">
          <div style="display:flex; justify-content:center; gap:20px; margin:30px 0; flex-wrap:wrap;">
            <div style="text-align:center;">
              <div style="font-size:4em; font-weight:bold;">{{ dias }}</div>
              <div style="font-size:1.2em; opacity:0.8;">Días</div>
            </div>
            <div style="font-size:4em;">:</div>
            <div style="text-align:center;">
              <div style="font-size:4em; font-weight:bold;">{{ horas }}</div>
              <div style="font-size:1.2em; opacity:0.8;">Horas</div>
            </div>
            <div style="font-size:4em;">:</div>
            <div style="text-align:center;">
              <div style="font-size:4em; font-weight:bold;">{{ minutos }}</div>
              <div style="font-size:1.2em; opacity:0.8;">Minutos</div>
            </div>
            <div style="font-size:4em;">:</div>
            <div style="text-align:center;">
              <div style="font-size:4em; font-weight:bold;">{{ segundos }}</div>
              <div style="font-size:1.2em; opacity:0.8;">Segundos</div>
            </div>
          </div>
          
          <div style="background:rgba(255,255,255,0.2); padding:15px; border-radius:10px; margin:20px 0;">
            Objetivo: {{ fechaObjetivo }}
          </div>
          
          <button (click)="reiniciar()" 
                  style="padding:10px 30px; background:#f39c12; color:white; border:none; border-radius:25px; cursor:pointer;">
            Nueva Fecha
          </button>
        </div>
        
        <div *ngIf="finalizado" style="margin-top:30px;">
          <div style="font-size:4em; animation:salto 1s infinite;">🎉</div>
          <h2 style="color:#ffd700;">¡TIEMPO CUMPLIDO!</h2>
        </div>
      </div>
    </div>
    <style>
      @keyframes salto {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
    </style>
  `
})
export class CuentaRegresivaComponent implements OnInit, OnDestroy {
  fechaObjetivo: string = '';
  fechaMinima: string = '';
  dias: number = 0;
  horas: number = 0;
  minutos: number = 0;
  segundos: number = 0;
  activo: boolean = false;
  finalizado: boolean = false;
  private intervalo: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const ahora = new Date();
    ahora.setHours(ahora.getHours() + 1);
    this.fechaMinima = ahora.toISOString().slice(0, 16);
    this.fechaObjetivo = this.fechaMinima;
  }

  iniciar(): void {
    this.activo = true;
    this.finalizado = false;
    this.calcular();
    this.intervalo = setInterval(() => this.calcular(), 1000);
  }

  calcular(): void {
    const ahora = new Date().getTime();
    const objetivo = new Date(this.fechaObjetivo).getTime();
    const diferencia = objetivo - ahora;

    if (diferencia <= 0) {
      this.finalizado = true;
      this.activo = false;
      if (this.intervalo) clearInterval(this.intervalo);
      return;
    }

    this.dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    this.horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    this.segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
  }

  reiniciar(): void {
    if (this.intervalo) clearInterval(this.intervalo);
    this.activo = false;
    this.finalizado = false;
  }

  cambiarVisualizador(ruta: string): void {
    this.router.navigate([ruta]);
  }

  ngOnDestroy(): void {
    if (this.intervalo) clearInterval(this.intervalo);
  }
}