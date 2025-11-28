import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InteractionType } from '../models/interactiontype.model';

@Injectable({
  providedIn: 'root'
})
export class InteractionTypeService {
  private interactionTypes: InteractionType[] = [
    { id: 1, name: 'Llamada', icon: 'cil-phone' },
    { id: 2, name: 'Correo Electrónico', icon: 'cil-envelope-closed' },
    { id: 3, name: 'Reunión', icon: 'cil-people' }
  ];

  constructor() { }

  getInteractionTypes(): Observable<InteractionType[]> {
    return of(this.interactionTypes);
  }
}