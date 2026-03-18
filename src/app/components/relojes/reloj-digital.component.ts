import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TiempoService } from '../../services/tiempo.service';

@Component({
  selector: 'app-reloj-digital',
  template: `
    <app-header></app-header>
    
    <div style="max-width:1200px; margin:0 auto; padding:20px;">
      <div style="margin-bottom:20px; display:flex; justify-content:flex-end;">
        <app-dropdown (visualizadorCambiado)="cambiarVisualizador($event)"></app-dropdown>
      </div>
      
      <div style="background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding:40px; border-radius:20px; color:white; text-align:center;">
        <h2 style="font-size:2em; margin-bottom:30px;">🕐 Reloj Digital</h2>
        
        <div style="font-size:5em; font-family:monospace; background:rgba(0,0,0,0.3); padding:30px; border-radius:15px; margin-bottom:20px;">
          {{ hora.getHours() | number:'2.0' }}:{{ hora.getMinutes() | number:'2.0' }}:{{ hora.getSeconds() | number:'2.0' }}
        </div>
        
        <div style="font-size:1.5em; text-transform:capitalize;">
          {{ hora.toLocaleDateString('es', { weekday:'long', year:'numeric', month:'long', day:'numeric' }) }}
        </div>

        <div *ngIf="offset !== 0" style="margin-top:20px; padding:10px; background:rgba(255,215,0,0.3); border-radius:20px;">
          ⚡ Tiempo alterado: {{ offset > 0 ? '+' : '' }}{{ offset }} seg
        </div>
      </div>
    </div>
  `
})
export class RelojDigitalComponent implements OnInit, OnDestroy {
  hora: Date = new Date();
  offset: number = 0;
  private subscription: any;

  constructor(
    private tiempoService: TiempoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.tiempoService.getTiempoActual().subscribe(
      tiempo => {
        this.hora = tiempo;
      }
    );
    this.offset = this.tiempoService.getOffset();
  }

  cambiarVisualizador(ruta: string): void {
    this.router.navigate([ruta]);
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}