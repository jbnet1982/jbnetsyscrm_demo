// src/app/features/companies/services/company.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private companies: Company[] = [
    { id: 1, name: 'Innovatech Solutions', industryTypeId: 1, address: '123 Tech Ave', phone: '555-0101', website: 'innovatech.com' },
    { id: 2, name: 'SecureBank Corp', industryTypeId: 2, address: '456 Finance Blvd', phone: '555-0102', website: 'securebank.com' },
    { id: 3, name: 'HealthWell Group', industryTypeId: 3, address: '789 Wellness Rd', phone: '555-0103', website: 'healthwell.com' }
  ];

  constructor() { }

  /**
   * Obtiene todas las empresas.
   */
  getCompanies(): Observable<Company[]> {
    return of(this.companies);
  }

  /**
   * Obtiene una empresa por su ID.
   * @param id El ID de la empresa.
   */
  getCompanyById(id: number): Observable<Company | undefined> {
    const company = this.companies.find(c => c.id === id);
    return of(company);
  }

  /**
   * Agrega una nueva empresa.
   * @param company La empresa a crear.
   */
  addCompany(company: Omit<Company, 'id'>): Observable<Company> {
    const newId = this.companies.length > 0 ? Math.max(...this.companies.map(c => c.id)) + 1 : 1;
    const newCompany = { id: newId, ...company };
    this.companies.push(newCompany);
    return of(newCompany);
  }

  /**
   * Actualiza una empresa existente.
   * @param updatedCompany La empresa con los datos actualizados.
   */
  updateCompany(updatedCompany: Company): Observable<Company> {
    const index = this.companies.findIndex(c => c.id === updatedCompany.id);
    if (index !== -1) {
      this.companies[index] = updatedCompany;
    }
    return of(updatedCompany);
  }

  /**
   * Elimina una empresa por su ID.
   * @param id El ID de la empresa a eliminar.
   */
  deleteCompany(id: number): Observable<{}> {
    this.companies = this.companies.filter(c => c.id !== id);
    return of({}); // Retorna un objeto vacío para simular éxito
  }
}