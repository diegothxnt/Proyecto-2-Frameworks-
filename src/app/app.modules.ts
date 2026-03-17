import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header.component';
import { DropdownComponent } from './components/shared/dropdown.component';
import { LoginComponent } from './components/auth/login.component';
import { RegistroComponent } from './components/auth/registro.component';
import { RelojDigitalComponent } from './components/relojes/reloj-digital.component';
import { RelojAnalogicoComponent } from './components/relojes/reloj-analogico.component';
import { CronometroComponent } from './components/relojes/cronometro.component';
import { TemporizadorComponent } from './components/relojes/temporizador.component';
import { CuentaRegresivaComponent } from './components/relojes/cuenta-regresiva.component';
import { RelojMundialComponent } from './components/relojes/reloj-mundial.component';
import { CalendarioComponent } from './components/relojes/calendario.component';
import { FaseLunarComponent } from './components/relojes/fase-lunar.component';
import { LineaTiempoComponent } from './components/relojes/linea-tiempo.component';
import { RelojArenaComponent } from './components/relojes/reloj-arena.component';
import { RelojAguaComponent } from './components/relojes/reloj-agua.component';
import { RelojSolComponent } from './components/relojes/reloj-sol.component';

import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownComponent,
    LoginComponent,
    RegistroComponent,
    RelojDigitalComponent,
    RelojAnalogicoComponent,
    CronometroComponent,
    TemporizadorComponent,
    CuentaRegresivaComponent,
    RelojMundialComponent,
    CalendarioComponent,
    FaseLunarComponent,
    LineaTiempoComponent,
    RelojArenaComponent,
    RelojAguaComponent,
    RelojSolComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegistroComponent },
      { path: 'digital', component: RelojDigitalComponent, canActivate: [AuthGuard] },
      { path: 'analogico', component: RelojAnalogicoComponent, canActivate: [AuthGuard] },
      { path: 'cronometro', component: CronometroComponent, canActivate: [AuthGuard] },
      { path: 'temporizador', component: TemporizadorComponent, canActivate: [AuthGuard] },
      { path: 'regresiva', component: CuentaRegresivaComponent, canActivate: [AuthGuard] },
      { path: 'mundial', component: RelojMundialComponent, canActivate: [AuthGuard] },
      { path: 'calendario', component: CalendarioComponent, canActivate: [AuthGuard] },
      { path: 'lunar', component: FaseLunarComponent, canActivate: [AuthGuard] },
      { path: 'linea-tiempo', component: LineaTiempoComponent, canActivate: [AuthGuard] },
      { path: 'arena', component: RelojArenaComponent, canActivate: [AuthGuard] },
      { path: 'agua', component: RelojAguaComponent, canActivate: [AuthGuard] },
      { path: 'sol', component: RelojSolComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: '/login', pathMatch: 'full' }
    ])
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }