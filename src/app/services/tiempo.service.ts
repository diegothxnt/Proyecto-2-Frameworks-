import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiempoService implements OnDestroy {
  private tiempoSubject = new BehaviorSubject<Date>(new Date());
  private offsetSegundos: number = 0;
  private intervalo: any;

  constructor() {
    // Actualizar cada segundo
    this.intervalo = setInterval(() => {
      const nuevaFecha = new Date();
      if (this.offsetSegundos !== 0) {
        nuevaFecha.setSeconds(nuevaFecha.getSeconds() + this.offsetSegundos);
      }
      this.tiempoSubject.next(nuevaFecha);
    }, 1000);
  }

  getTiempoActual(): Observable<Date> {
    return this.tiempoSubject.asObservable();
  }

  setOffset(offset: number): void {
    this.offsetSegundos = offset;
  }

  getOffset(): number {
    return this.offsetSegundos;
  }

  getFaseLunar(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    const phase = ((year + month + day) % 8);
    const fases = [
      '🌑 Luna Nueva', '🌒 Luna Creciente', '🌓 Cuarto Creciente', 
      '🌔 Gibosa Creciente', '🌕 Luna Llena', '🌖 Gibosa Menguante',
      '🌗 Cuarto Menguante', '🌘 Luna Menguante'
    ];
    return fases[phase];
  }

  getHoraMundial(ciudad: string): Date {
    const horas: {[key: string]: number} = {
      'Nueva York': -4,
      'Londres': 1,
      'Tokio': 9,
      'Sidney': 11,
      'Dubai': 4
    };
    
    const fecha = new Date(this.tiempoSubject.value);
    fecha.setHours(fecha.getUTCHours() + (horas[ciudad] || 0));
    return fecha;
  }

  ngOnDestroy() {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }
}