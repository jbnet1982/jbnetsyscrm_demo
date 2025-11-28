import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es'; // Importa la localización en español

import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

// Importa el proveedor de iconos de CoreUI
import { IconSetService } from '@coreui/icons-angular';

// Importa las rutas que definimos en el archivo app.routes.ts
import { routes } from './app.routes';

// Registra la data de localización para 'es' (español) en toda la aplicación.
// Esto debe hacerse una sola vez al inicio de la aplicación.
registerLocaleData(localeEs);

// Definición de la configuración principal de la aplicación
export const appConfig: ApplicationConfig = {
  // El array 'providers' es donde se registran los servicios y funcionalidades
  // que estarán disponibles en toda la aplicación.
  providers: [

    // 1. Proveedor para el sistema de enrutamiento
    provideRouter(routes),

    // 2. Proveedor para habilitar el servicio HttpClient
    // Esencial para que los servicios puedan comunicarse con una API
    provideHttpClient(),
    
    // 3. Proveedor para habilitar las animaciones del navegador
    // Mejora la experiencia de usuario con componentes de CoreUI (modales, transiciones, etc.)
    provideAnimations(),
    
    // 4. Proveedor del servicio de iconos de CoreUI
    // Necesario para que la directiva <svg cIcon> funcione correctamente
    IconSetService,
    
    // 5. Proveedor para establecer el idioma (Locale) por defecto en 'español'
    // Esto afecta a todos los pipes que dependen del idioma, como DatePipe y CurrencyPipe.
    // Ahora, `| date` usará el formato `dd/MM/yyyy` por defecto.
    { 
      provide: LOCALE_ID, 
      useValue: 'es' 
    }

  ]
};