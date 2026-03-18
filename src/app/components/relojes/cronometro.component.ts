import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cronometro',
  template: `
    <app-header></app-header>
    
    <div style="max-width:1200px; margin:0 auto; padding:20px;">
      <div style="margin-bottom:20px; display:flex; justify-content:flex-end;">
        <app-dropdown (visualizadorCambiado)="cambiarVisualizador($event)"></app-dropdown>
      </div>
      
      <div style="background:linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%); padding:40px; border-radius:20px; color:white; text-align:center;">
        <h2 style="font-size:2em; margin-bottom:30px;">⏱️ Cronómetro</h2>
        
        <div style="font-size:5em; font-family:monospace; background:rgba(0,0,0,0.2); padding:30px; border-radius:15px; margin-bottom:30px;">
          {{ horas | number:'2.0' }}:{{ minutos | number:'2.0' }}:{{ segundos | number:'2.0' }}
        </div>
        
        <div style="display:flex; gap:15px; justify-content:center; margin-bottom:30px; flex-wrap:wrap;">
          <button (click)="iniciar()" [disabled]="corriendo" 
                  style="padding:15px 30px; background:#4caf50; color:white; border:none; border-radius:50px; font-size:1.2em; cursor:pointer; min-width:100px;">
            ▶ Iniciar
          </button>
          <button (click)="pausar()" [disabled]="!corriendo"
                  style="padding:15px 30px; background:#ff9800; color:white; border:none; border-radius:50px; font-size:1.2em; cursor:pointer; min-width:100px;">
            ⏸️ Pausar
          </button>
          <button (click)="reiniciar()"
                  style="padding:15px 30px; background:#f44336; color:white; border:none; border-radius:50px; font-size:1.2em; cursor:pointer; min-width:100px;">
            ↺ Reiniciar
          </button>
          <button (click)="vuelta()" [disabled]="!corriendo"
                  style="padding:15px 30px; background:#2196f3; color:white; border:none; border-radius:50px; font-size:1.2em; cursor:pointer; min-width:100px;">
            ⏱️ Vuelta
          </button>
        </div>
        
        <div *ngIf="vueltas.length > 0" style="background:rgba(255,255,255,0.2); padding:20px; border-radius:15px; max-height:250px; overflow-y:auto;">
          <h3 style="margin-bottom:15px;">Vueltas:</h3>
          <div *ngFor="let vuelta of vueltas; let i=index" 
               style="display:flex; justify-content:space-between; padding:8px; border-bottom:1px solid rgba(255,255,255,0.2); font-family:monospace; font-size:1.1em;">
            <span>Vuelta #{{ i+1 }}</span>
            <span>{{ vuelta }}</span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CronometroComponent {
  horas: number = 0;
  minutos: number = 0;
  segundos: number = 0;
  corriendo: boolean = false;
  vueltas: string[] = [];
  private intervalo: any;

  constructor(private router: Router) {}

  iniciar(): void {
    if (!this.corriendo) {
      this.corriendo = true;
      this.intervalo = setInterval(() => {
        this.segundos++;
        if (this.segundos === 60) {
          this.segundos = 0;
          this.minutos++;
        }
        if (this.minutos === 60) {
          this.minutos = 0;
          this.horas++;
        }
      }, 1000);
    }
  }

  pausar(): void {
    this.corriendo = false;
    if (this.intervalo) clearInterval(this.intervalo);
  }

  reiniciar(): void {
    this.pausar();
    this.horas = 0;
    this.minutos = 0;
    this.segundos = 0;
    this.vueltas = [];
  }

  vuelta(): void {
    const tiempo = `${this.horas.toString().padStart(2,'0')}:${this.minutos.toString().padStart(2,'0')}:${this.segundos.toString().padStart(2,'0')}`;
    this.vueltas.push(tiempo);
  }

  cambiarVisualizador(ruta: string): void {
    this.router.navigate([ruta]);
  }

  ngOnDestroy(): void {
    if (this.intervalo) clearInterval(this.intervalo);
  }
}