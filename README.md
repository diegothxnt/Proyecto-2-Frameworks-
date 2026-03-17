#  Visualizador de Tiempo - Angular

![Angular](https://img.shields.io/badge/Angular-15-red)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue)
![License](https://img.shields.io/badge/License-MIT-green)

##  Descripción

Proyecto Angular que implementa **12 formas diferentes** de visualizar el tiempo, con sistema de autenticación, slider para alterar el tiempo y navegación entre visualizadores. Cumple con todos los requisitos del proyecto.

##  Características

###  **12 Visualizadores de Tiempo**
| # | Visualizador | Descripción |
|---|--------------|-------------|
| 1 | **Reloj Digital** | Formato HH:MM:SS con fecha completa |
| 2 | **Reloj Analógico** | Manecillas animadas con hora actual |
| 3 | **Cronómetro** | Botones de inicio, pausa, reinicio y vueltas |
| 4 | **Temporizador** | Configurable con barra de progreso |
| 5 | **Cuenta Regresiva** | Para fecha objetivo seleccionable |
| 6 | **Reloj Mundial** | 8 ciudades con diferentes husos horarios |
| 7 | **Calendario** | Navegación mensual con día actual |
| 8 | **Fase Lunar** | Emoji, nombre y porcentaje de iluminación |
| 9 | **Línea de Tiempo** | Eventos del día con progreso |
| 10 | **Reloj de Arena** | Animación con duración configurable |
| 11 | **Reloj de Agua** | Clepsidra con velocidad ajustable |
| 12 | **Reloj de Sol** | Gnomon con ángulo y posición solar |

###  **Sistema de Autenticación**
-  Registro de nuevos usuarios
-  Inicio de sesión
-  Persistencia de sesión (localStorage)
-  Botón de cierre de sesión
-  Protección de rutas con AuthGuard

###  **Funcionalidades**
-  **Slider de tiempo**: Adelanta o atrasa el tiempo (-1h a +1h)
-  **Dropdown con buscador**: Cambia entre los 12 visualizadores
-  **Indicador visual**: Muestra cuando el tiempo está alterado
-  **Fecha completa**: Todos los relojes muestran día, mes y año
-  **Diseño responsive**: Adaptable a diferentes pantallas

##  **Cómo ejecutar el proyecto**

### Requisitos previos
- Node.js (v16 o superior)
- npm (v8 o superior)
- Angular CLI 15

### Pasos de instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU-USUARIO/tiempo-visualizaciones.git

# 2. Entrar a la carpeta
cd tiempo-visualizaciones

# 3. Instalar dependencias
npm install

# 4. Ejecutar el servidor
ng serve

# 5. Abrir navegador
http://localhost:4200
```
Elaborado por: Diego Rojas.


Materia: Manejo de Frameworks 2026.


