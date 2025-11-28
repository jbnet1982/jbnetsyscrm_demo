import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Interaction } from '../models/interaction.model';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  private interactions: Interaction[] = [
    { id: 1, interactionTypeId: 3, notes: 'Reunión inicial para discutir la renovación.', date: new Date('2025-11-10'), dealId: 1, contactId: 1 },
    { id: 2, interactionTypeId: 1, notes: 'Llamada de seguimiento sobre la propuesta.', date: new Date('2025-11-12'), dealId: 1, contactId: 1 },
    { id: 3, interactionTypeId: 2, notes: 'Correo de calificación enviado al cliente potencial.', date: new Date('2025-11-05'), contactId: 2 }
  ];

  constructor() { }

    // --- NUEVO MÉTODO NECESARIO PARA EL DASHBOARD ---
  // Obtiene TODAS las interacciones del sistema
  getInteractions(): Observable<Interaction[]> {
    return of([...this.interactions]); // Retorna una copia del array
  }
  // -----------------------------------------------
  
  /**
   * Obtiene todas las interacciones asociadas a un contacto.
   * @param contactId El ID del contacto.
   */
  getInteractionsByContactId(contactId: number): Observable<Interaction[]> {
    const contactInteractions = this.interactions.filter(i => i.contactId === contactId);
    return of(contactInteractions);
  }
  
  /**
   * Obtiene todas las interacciones asociadas a una oportunidad.
   * @param dealId El ID de la oportunidad.
   */
  getInteractionsByDealId(dealId: number): Observable<Interaction[]> {
    const dealInteractions = this.interactions.filter(i => i.dealId === dealId);
    return of(dealInteractions);
  }

  /**
   * Agrega una nueva interacción.
   * @param interaction La interacción a crear.
   */
  addInteraction(interaction: Omit<Interaction, 'id'>): Observable<Interaction> {
    const newId = this.interactions.length > 0 ? Math.max(...this.interactions.map(i => i.id)) + 1 : 1;
    const newInteraction = { id: newId, ...interaction };
    this.interactions.push(newInteraction);
    return of(newInteraction);
  }
}