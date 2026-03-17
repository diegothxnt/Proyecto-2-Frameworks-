import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div style="text-align:center; padding:50px;">
      <h1 style="font-size:3em; color:#333;">Bienvenido al Visualizador de Tiempo</h1>
      <p style="font-size:1.2em; color:#666; margin-top:20px;">
        Usa el menú desplegable para explorar las 14 formas diferentes de visualizar el tiempo.
      </p>
    </div>
  `
})
export class HomeComponent { }