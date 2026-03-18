import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-temporizador',
  template: `
    <app-header></app-header>
    
    <div style="max-width:1200px; margin:0 auto; padding:20px;">
      <div style="margin-bottom:20px; display:flex; justify-content:flex-end;">
        <app-dropdown (visualizadorCambiado)="cambiarVisualizador($event)"></app-dropdown>
      </div>
      
      <div style="background:linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%); padding:40px; border-radius:20px; text-align:center;">
        <h2 style="font-size:2em; margin-bottom:30px; color:#333;">⏲️ Temporizador</h2>
        
        <div *ngIf="!activo" style="max-width:300px; margin:0 auto;">
          <div style="margin-bottom:20px;">
            <label style="display:block; margin-bottom:5px; color:#555;">Minutos:</label>
            <input type="number" [(ngModel)]="minutosInput" min="0" max="60" 
                   style="width:100%; padding:10px; border:2px solid #ddd; border-radius:8px; font-size:1.2em;">
          </div>
          <div style="margin-bottom:30px;">
            <label style="display:block; margin-bottom:5px; color:#555;">Segundos:</label>
            <input type="number" [(ngModel)]="segundosInput" min="0" max="59"
                   style="width:100%; padding:10px; border:2px solid #ddd; border-radius:8px; font-size:1.2em;">
          </div>
          <button (click)="iniciar()" 
                  style="padding:15px 40px; background:#4caf50; color:white; border:none; border-radius:50px; font-size:1.2em; cursor:pointer;">
            ⏯️ Iniciar
          </button>
        </div>
        
        <div *ngIf="activo">
          <div style="font-size:5em; font-family:monospace; background:rgba(255,255,255,0.5); padding:30px; border-radius:15px; margin-bottom:20px;">
            {{ minutos | number:'2.0' }}:{{ segundos | number:'2.0' }}
          </div>
          
          <div style="width:100%; height:20px; background:rgba(255,255,255,0.5); border-radius:10px; margin:20px 0; overflow:hidden;">
            <div style="height:100%; background:#4caf50; width:{{ (tiempoRestante/tiempoTotal)*100 }}%; transition:width 0.1s;"></div>
          </div>
          
          <div style="display:flex; gap:10px; justify-content:center;">
            <button (click)="pausar()" *ngIf="corriendo"
                    style="padding:10px 20px; background:#ff9800; color:white; border:none; border-radius:25px; cursor:pointer;">
              ⏸️ Pausar
            </button>
            <button (click)="reanudar()" *ngIf="!corriendo"
                    style="padding:10px 20px; background:#4caf50; color:white; border:none; border-radius:25px; cursor:pointer;">
              ▶️ Reanudar
            </button>
            <button (click)="reiniciar()"
                    style="padding:10px 20px; background:#f44336; color:white; border:none; border-radius:25px; cursor:pointer;">
              ↺ Cancelar
            </button>
          </div>
        </div>
        
        <div *ngIf="alarmaActivada" style="margin-top:20px;">
          <div style="font-size:3em; animation:parpadeo 1s infinite;">⏰</div>
          <h3 style="color:#f44336;">¡TIEMPO TERMINADO!</h3>
          <button (click)="detenerAlarma()" 
                  style="margin-top:10px; padding:10px 30px; background:#4caf50; color:white; border:none; border-radius:25px; cursor:pointer;">
            OK
          </button>
        </div>
      </div>
    </div>
    <style>
      @keyframes parpadeo {
        0%, 50% { opacity: 1; transform: scale(1); }
        51%, 100% { opacity: 0; transform: scale(1.2); }
      }
    </style>
  `
})
export class TemporizadorComponent {
  minutosInput: number = 1;
  segundosInput: number = 0;
  minutos: number = 0;
  segundos: number = 0;
  tiempoTotal: number = 0;
  tiempoRestante: number = 0;
  activo: boolean = false;
  corriendo: boolean = false;
  alarmaActivada: boolean = false;
  private intervalo: any;

  constructor(private router: Router) {}

  iniciar(): void {
    this.tiempoTotal = this.minutosInput * 60 + this.segundosInput;
    this.tiempoRestante = this.tiempoTotal;
    this.minutos = this.minutosInput;
    this.segundos = this.segundosInput;
    this.activo = true;
    this.corriendo = true;
    this.alarmaActivada = false;

    this.intervalo = setInterval(() => {
      if (this.tiempoRestante > 0 && this.corriendo) {
        this.tiempoRestante--;
        this.minutos = Math.floor(this.tiempoRestante / 60);
        this.segundos = this.tiempoRestante % 60;
      } else if (this.tiempoRestante === 0) {
        this.pausar();
        this.alarmaActivada = true;
      }
    }, 1000);
  }

  pausar(): void {
    this.corriendo = false;
    if (this.intervalo) clearInterval(this.intervalo);
  }

  reanudar(): void {
    this.corriendo = true;
    this.iniciar();
  }

  reiniciar(): void {
    this.pausar();
    this.activo = false;
    this.alarmaActivada = false;
    this.minutosInput = 1;
    this.segundosInput = 0;
  }

  detenerAlarma(): void {
    this.alarmaActivada = false;
    this.activo = false;
  }

  cambiarVisualizador(ruta: string): void {
    this.router.navigate([ruta]);
  }

  ngOnDestroy(): void {
    if (this.intervalo) clearInterval(this.intervalo);
  }
}