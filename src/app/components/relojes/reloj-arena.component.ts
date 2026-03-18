import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reloj-arena',
  template: `
    <app-header></app-header>
    
    <div style="max-width:1200px; margin:0 auto; padding:20px;">
      <div style="margin-bottom:20px; display:flex; justify-content:flex-end;">
        <app-dropdown (visualizadorCambiado)="cambiarVisualizador($event)"></app-dropdown>
      </div>
      
      <div style="background:linear-gradient(135deg, #f6d365 0%, #fda085 100%); padding:40px; border-radius:20px; text-align:center;">
        <h2 style="font-size:2em; margin-bottom:30px; color:#333;">⌛ Reloj de Arena</h2>
        
        <div style="width:200px; margin:0 auto; position:relative;">
          <div style="width:200px; height:200px; background:#e67e22; border-radius:50% 50% 0 0; overflow:hidden; position:relative;">
            <div style="position:absolute; bottom:0; width:100%; background:#f39c12; transition:height 0.1s linear;"
                 [style.height.%]="arenaSuperior"></div>
          </div>
          
          <div style="width:40px; height:40px; background:#8B4513; margin:0 auto;"></div>
          
          <div style="width:200px; height:200px; background:#e67e22; border-radius:0 0 50% 50%; overflow:hidden; position:relative;">
            <div style="position:absolute; top:0; width:100%; background:#f39c12; transition:height 0.1s linear;"
                 [style.height.%]="arenaInferior"></div>
          </div>
        </div>
        
        <div style="margin-top:30px;">
          <div style="display:flex; gap:10px; justify-content:center; margin-bottom:20px;">
            <button (click)="cambiarDuracion(30)" 
                    style="padding:10px 20px; background:#3498db; color:white; border:none; border-radius:25px; cursor:pointer;">30s</button>
            <button (click)="cambiarDuracion(60)" 
                    style="padding:10px 20px; background:#3498db; color:white; border:none; border-radius:25px; cursor:pointer;">60s</button>
            <button (click)="cambiarDuracion(120)" 
                    style="padding:10px 20px; background:#3498db; color:white; border:none; border-radius:25px; cursor:pointer;">2min</button>
          </div>
          
          <button (click)="reiniciar()" *ngIf="arenaInferior === 100"
                  style="padding:15px 40px; background:#4caf50; color:white; border:none; border-radius:50px; font-size:1.2em; cursor:pointer;">
            🔄 Reiniciar
          </button>
          
          <div style="margin-top:20px; font-size:2em; font-family:monospace;">
            {{ minutosRestantes | number:'2.0' }}:{{ segundosRestantes | number:'2.0' }}
          </div>
        </div>
      </div>
    </div>
  `
})
export class RelojArenaComponent implements OnInit, OnDestroy {
  arenaSuperior: number = 100;
  arenaInferior: number = 0;
  duracionTotal: number = 60;
  tiempoRestante: number = 60;
  private intervalo: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.iniciar();
  }

  get minutosRestantes(): number {
    return Math.floor(this.tiempoRestante / 60);
  }

  get segundosRestantes(): number {
    return this.tiempoRestante % 60;
  }

  iniciar(): void {
    this.intervalo = setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
        this.arenaSuperior = (this.tiempoRestante / this.duracionTotal) * 100;
        this.arenaInferior = 100 - this.arenaSuperior;
      }
    }, 1000);
  }

  cambiarDuracion(segundos: number): void {
    this.duracionTotal = segundos;
    this.reiniciar();
  }

  reiniciar(): void {
    this.tiempoRestante = this.duracionTotal;
    this.arenaSuperior = 100;
    this.arenaInferior = 0;
  }

  cambiarVisualizador(ruta: string): void {
    this.router.navigate([ruta]);
  }

  ngOnDestroy(): void {
    if (this.intervalo) clearInterval(this.intervalo);
  }
}