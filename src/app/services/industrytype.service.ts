import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IndustryType } from '../models/industrytype.model';

@Injectable({
  providedIn: 'root'
})
export class IndustryTypeService {
  private industryTypes: IndustryType[] = [
    { id: 1, name: 'Tecnología' },
    { id: 2, name: 'Finanzas' },
    { id: 3, name: 'Salud' },
    { id: 4, name: 'Comercio Minorista' },
    { id: 5, name: 'Educación' }
  ];

  constructor() { }

  /**
   * Obtiene todos los tipos de industria.
   * @returns Un Observable con el array de tipos de industria.
   */
  getIndustryTypes(): Observable<IndustryType[]> {
    return of(this.industryTypes);
  }
}