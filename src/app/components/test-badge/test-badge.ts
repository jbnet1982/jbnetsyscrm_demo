import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importamos BadgeModule aquí
import { BadgeModule } from '@coreui/angular';

@Component({
  selector: 'app-test-badge',
  standalone: true,
  imports: [
    CommonModule,
    BadgeModule // Lo añadimos a las importaciones
  ],
  // Vamos a poner el HTML directamente aquí para simplificar
  template: `
    <h2>Componente de Prueba de Badge</h2>
    <p>
      Si puedes ver el siguiente badge de color verde, ¡CoreUI funciona!
    </p>
    <span cBadge color="success">ÉXITO</span>
  `
})
export class TestBadgeComponent {}