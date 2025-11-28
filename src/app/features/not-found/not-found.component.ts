import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// CoreUI Modules
import { ButtonModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [

    ButtonModule,
    IconModule
  ],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  constructor() {}
}