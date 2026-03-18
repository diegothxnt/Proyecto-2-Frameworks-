import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TiempoService } from '../../services/tiempo.service';

@Component({
  selector: 'app-reloj-agua',
  template: `
    <app-header></app-header>
    
    <div style="max-width:1200px; margin:0 auto; padding:20px;">
      <div style="margin-bottom:20px; display:flex; justify-content:flex-end;">
        <app-dropdown (visualizadorCambiado)="cambiarVisualizador($event)"></app-dropdown>
      </div>
      
      <div style="background:linear-gradient(135deg, #00b4db 0%, #0083b0 100%); padding:40px; border-radius:20px; color:white; text-align:center;">
        <h2 style="font-size:2em; margin-bottom:30px;">💧 Reloj de Agua (Clepsidra)</h2>
        
        <!-- Indicador de tiempo alterado -->
        <div *ngIf="offset !== 0" style="margin-bottom:20px; padding:10px; background:rgba(255,215,0,0.3); border-radius:20px;">
          ⚡ Tiempo alterado: {{ offset > 0 ? '+' : '' }}{{ offset }} seg
        </div>
        
        <div style="display:flex; justify-content:center; gap:40px; margin-bottom:30px; flex-wrap:wrap;">
          <div style="text-align:center;">
            <div style="font-size:1.2em; margin-bottom:10px;">Superior</div>
            <div style="width:150px; height:250px; background:rgba(255,255,255,0.2); border:3px solid white; border-radius:0 0 50% 50%; position:relative; overflow:hidden;">
              <div style="position:absolute; bottom:0; width:100%; background:linear-gradient(180deg, #4facfe 0%, #00f2fe 100%); transition:height 0.1s linear;"
                   [style.height.%]="aguaSuperior">
                <div style="position:absolute; top:0; width:100%; text-align:center; color:white; font-weight:bold; padding:5px 0;">
                  {{ (aguaSuperior).toFixed(0) }}%
                </div>
              </div>
            </div>
          </div>
          
          <div style="text-align:center;">
            <div style="font-size:1.2em; margin-bottom:10px;">Inferior</div>
            <div style="width:150px; height:250px; background:rgba(255,255,255,0.2); border:3px solid white; border-radius:50% 50% 0 0; position:relative; overflow:hidden;">
              <div style="position:absolute; top:0; width:100%; background:linear-gradient(0deg, #4facfe 0%, #00f2fe 100%); transition:height 0.1s linear;"
                   [style.height.%]="aguaInferior">
                <div style="position:absolute; bottom:0; width:100%; text-align:center; color:white; font-weight:bold; padding:5px 0;">
                  {{ (aguaInferior).toFixed(0) }}%
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div style="position:relative; height:60px; margin:20px 0;">
          <div style="position:absolute; left:50%; transform:translateX(-50%); width:10px; height:100%; background:rgba(255,255,255,0.3);"></div>
          <div *ngFor="let gota of [1,2,3]" 
               style="position:absolute; left:50%; transform:translateX(-50%); width:6px; height:6px; background:#4facfe; border-radius:50%;"
               [style.top.px]="gota * 15"
               [style.animation]="'gotear 2s infinite ' + gota*0.5 + 's'">
          </div>
        </div>
        
        <div style="margin-top:30px;">
          <div style="display:flex; gap:10px; justify-content:center; margin-bottom:20px;">
            <button (click)="cambiarVelocidad(0.5)" 
                    style="padding:10px 20px; background:#4caf50; color:white; border:none; border-radius:25px; cursor:pointer;">🐢 Lento</button>
            <button (click)="cambiarVelocidad(1)" 
                    style="padding:10px 20px; background:#ff9800; color:white; border:none; border-radius:25px; cursor:pointer;">⚡ Normal</button>
            <button (click)="cambiarVelocidad(2)" 
                    style="padding:10px 20px; background:#f44336; color:white; border:none; border-radius:25px; cursor:pointer;">🐰 Rápido</button>
          </div>
          
          <button (click)="reiniciar()" *ngIf="aguaInferior > 99.9"
                  style="padding:15px 40px; background:#4caf50; color:white; border:none; border-radius:50px; font-size:1.2em; cursor:pointer;">
            🔄 Reiniciar Ciclo
          </button>
          
          <div style="margin-top:20px; font-size:2em; font-family:monospace;">
            {{ hora.getHours() | number:'2.0' }}:{{ hora.getMinutes() | number:'2.0' }}:{{ hora.getSeconds() | number:'2.0' }}
          </div>
        </div>
      </div>
    </div>
    <style>
      @keyframes gotear {
        0% { transform: translateX(-50%) translateY(-20px); opacity:1; }
        80% { opacity:1; }
        100% { transform: translateX(-50%) translateY(60px); opacity:0; }
      }
    </style>
  `
})
export class RelojAguaComponent implements OnInit, OnDestroy {
  hora: Date = new Date();
  offset: number = 0;
  aguaSuperior: number = 100;
  aguaInferior: number = 0;
  tiempoRestante: number = 60;
  velocidad: number = 1;
  private intervaloAgua: any;
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
    this.iniciarAgua();
  }

  iniciarAgua(): void {
    this.intervaloAgua = setInterval(() => {
      if (this.aguaSuperior > 0) {
        this.aguaSuperior -= 0.1 * this.velocidad;
        this.aguaInferior = 100 - this.aguaSuperior;
        this.tiempoRestante = Math.round(this.aguaSuperior * 0.6);
      }
    }, 100);
  }

  cambiarVelocidad(vel: number): void {
    this.velocidad = vel;
  }

  reiniciar(): void {
    this.aguaSuperior = 100;
    this.aguaInferior = 0;
    this.tiempoRestante = 60;
  }

  cambiarVisualizador(ruta: string): void {
    this.router.navigate([ruta]);
  }

  ngOnDestroy(): void {
    if (this.intervaloAgua) clearInterval(this.intervaloAgua);
    if (this.subscription) this.subscription.unsubscribe();
  }
}