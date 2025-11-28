import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Deal } from '../models/deal.model';

@Injectable({
  providedIn: 'root'
})
export class DealService {
  private deals: Deal[] = [
    { id: 1, name: 'Renovación de Licencia Innovatech', stage: 'Proposal', value: 15000, closeDate: new Date('2025-12-15'), contactId: 1, companyId: 1 },
    { id: 2, name: 'Consultoría Financiera SecureBank', stage: 'Qualified', value: 25000, closeDate: new Date('2026-01-20'), contactId: 2, companyId: 2 },
    { id: 3, name: 'Equipamiento Médico para HealthWell', stage: 'Lead', value: 75000, closeDate: new Date('2026-02-10'), contactId: 3, companyId: 3 }
  ];

  constructor() { }

  /**
   * Obtiene todas las oportunidades.
   */
  getDeals(): Observable<Deal[]> {
    return of(this.deals);
  }
  
   /**
   * Obtiene una oportunidad específica por su ID.
   * @param id El ID de la oportunidad a buscar.
   * @returns Un Observable con la oportunidad encontrada o undefined si no existe.
   */
  getDealById(id: number): Observable<Deal | undefined> {
    const deal = this.deals.find(d => d.id === id);
    return of(deal);
  }
  
  /**
   * Obtiene las oportunidades para una empresa específica.
   * @param companyId El ID de la empresa.
   */
  getDealsByCompanyId(companyId: number): Observable<Deal[]> {
    return of(this.deals.filter(d => d.companyId === companyId));
  }
  /**
   * Agrega una nueva oportunidad.
   * @param deal La oportunidad a crear.
   */
  addDeal(deal: Omit<Deal, 'id'>): Observable<Deal> {
    const newId = this.deals.length > 0 ? Math.max(...this.deals.map(d => d.id)) + 1 : 1;
    const newDeal = { id: newId, ...deal };
    this.deals.push(newDeal);
    return of(newDeal);
  }
   /**
   * Actualiza una oportunidad existente con nuevos datos.
   * @param updatedDeal El objeto completo de la oportunidad, incluyendo su 'id'.
   * @returns Un Observable con la oportunidad actualizada.
   */
  updateDeal(updatedDeal: Deal): Observable<Deal> {
    const index = this.deals.findIndex(d => d.id === updatedDeal.id);
    if (index !== -1) {
      // Reemplaza el objeto antiguo en el array con el nuevo
      this.deals[index] = { ...updatedDeal, closeDate: new Date(updatedDeal.closeDate) };
    }
    // Devuelve el objeto actualizado para confirmar la operación
    return of(updatedDeal);
  }
  
  /**
   * Actualiza el estado de una oportunidad.
   * @param dealId El ID de la oportunidad.
   * @param newStage El nuevo estado.
   */
  updateDealStage(dealId: number, newStage: Deal['stage']): Observable<Deal | undefined> {
    const deal = this.deals.find(d => d.id === dealId);
    if (deal) {
      deal.stage = newStage;
    }
    return of(deal);
  }
}