import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TiempoService } from '../../services/tiempo.service';

@Component({
  selector: 'app-reloj-analogico',
  template: `
    <app-header></app-header>
    
    <div style="max-width:1200px; margin:0 auto; padding:20px;">
      <div style="margin-bottom:20px; display:flex; justify-content:flex-end;">
        <app-dropdown (visualizadorCambiado)="cambiarVisualizador($event)"></app-dropdown>
      </div>
      
      <div style="background:linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding:30px; border-radius:20px; text-align:center;">
        <h2 style="font-size:2em; margin-bottom:20px; color:#333;">⏰ Reloj Analógico</h2>
        
        <svg width="300" height="300" viewBox="0 0 300 300" style="margin:0 auto; display:block;">
          <circle cx="150" cy="150" r="140" fill="white" stroke="#333" stroke-width="4"/>
          <text x="150" y="40" text-anchor="middle" fill="#333" font-size="16">12</text>
          <text x="260" y="160" text-anchor="middle" fill="#333" font-size="16">3</text>
          <text x="150" y="270" text-anchor="middle" fill="#333" font-size="16">6</text>
          <text x="40" y="160" text-anchor="middle" fill="#333" font-size="16">9</text>
          
          <line x1="150" y1="150" 
                [attr.x2]="150 + 70 * Math.sin(((hora.getHours() % 12) * 30 + hora.getMinutes() * 0.5) * Math.PI/180)"
                [attr.y2]="150 - 70 * Math.cos(((hora.getHours() % 12) * 30 + hora.getMinutes() * 0.5) * Math.PI/180)"
                stroke="#333" stroke-width="8" stroke-linecap="round"/>
          
          <line x1="150" y1="150" 
                [attr.x2]="150 + 100 * Math.sin(hora.getMinutes() * 6 * Math.PI/180)"
                [attr.y2]="150 - 100 * Math.cos(hora.getMinutes() * 6 * Math.PI/180)"
                stroke="#666" stroke-width="6" stroke-linecap="round"/>
          
          <line x1="150" y1="150" 
                [attr.x2]="150 + 120 * Math.sin(hora.getSeconds() * 6 * Math.PI/180)"
                [attr.y2]="150 - 120 * Math.cos(hora.getSeconds() * 6 * Math.PI/180)"
                stroke="red" stroke-width="2" stroke-linecap="round"/>
          
          <circle cx="150" cy="150" r="10" fill="#333"/>
        </svg>
        
        <div style="margin-top:20px; font-size:1.2em; color:#666;">
          {{ hora.getHours() | number:'2.0' }}:{{ hora.getMinutes() | number:'2.0' }}:{{ hora.getSeconds() | number:'2.0' }}
        </div>

        <div *ngIf="offset !== 0" style="margin-top:20px; padding:10px; background:rgba(255,215,0,0.3); border-radius:20px;">
          ⚡ Tiempo alterado: {{ offset > 0 ? '+' : '' }}{{ offset }} seg
        </div>
      </div>
    </div>
  `
})
export class RelojAnalogicoComponent implements OnInit, OnDestroy {
  hora: Date = new Date();
  offset: number = 0;
  Math = Math;
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