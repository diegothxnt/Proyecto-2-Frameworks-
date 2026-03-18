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
# PASO 1: Clonar y descargar mi repositorio 
git clone https://github.com/diegothxnt/Proyecto-2-Frameworks-.git

# PASO 2: Crear una nueva carpeta en el escritorio (con el nombre que quieras)
cd ~/Desktop
mkdir mi-proyecto-final
cd mi-proyecto-final

# PASO 3: En VS Code, abrir la terminal bash y ejecutar este comando
npx @angular/cli@15 new tiempo-visualizaciones --skip-tests --style=css --routing
# Cuando pregunte: "Do you want to enable Server-Side Rendering (SSR)?" → Responde: N (no)

# PASO 4: Entrar al proyecto que se acaba de crear
cd tiempo-visualizaciones

# PASO 5: BORRAR la carpeta app que creó Angular automáticamente
rm -rf src/app/

# PASO 6: COPIAR mi carpeta app desde el repositorio clonado
# Reemplaza RUTA_DEL_REPO con la ubicación donde descargaste mi repositorio en el PASO 1
cp -r ~/Desktop/tiempo-visualizaciones/src/app ./src/

# PASO 7: Instalar dependencias
npm install

# PASO 8: Ejecutar el proyecto
ng serve

# PASO 9: Abrir el navegador
http://localhost:4200
```
Elaborado por: Diego Rojas.


Materia: Manejo de Frameworks 2026.


