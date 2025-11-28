import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [
    { id: 1, firstName: 'Ana', lastName: 'García', email: 'ana.garcia@innovatech.com', phone: '310-555-0104', companyId: 1 },
    { id: 2, firstName: 'Juan', lastName: 'Martinez', email: 'juan.martinez@securebank.com', phone: '310-555-0105', companyId: 2 },
    { id: 3, firstName: 'Lucía', lastName: 'Hernández', email: 'lucia.h@healthwell.com', phone: '310-555-0106', companyId: 3 }
  ];

  constructor() { }

  /**
   * Obtiene todos los contactos.
   */
  getContacts(): Observable<Contact[]> {
    return of(this.contacts);
  }

  /**
   * Obtiene un contacto por su ID.
   * @param id El ID del contacto.
   */
  getContactById(id: number): Observable<Contact | undefined> {
    return of(this.contacts.find(c => c.id === id));
  }
  
  /**
   * Obtiene todos los contactos asociados a una empresa.
   * @param companyId El ID de la empresa.
   */
  getContactsByCompanyId(companyId: number): Observable<Contact[]> {
    const companyContacts = this.contacts.filter(c => c.companyId === companyId);
    return of(companyContacts);
  }

  /**
   * Agrega un nuevo contacto.
   * @param contact El contacto a crear.
   */
  addContact(contact: Omit<Contact, 'id'>): Observable<Contact> {
    const newId = this.contacts.length > 0 ? Math.max(...this.contacts.map(c => c.id)) + 1 : 1;
    const newContact = { id: newId, ...contact };
    this.contacts.push(newContact);
    return of(newContact);
  }

  /**
   * Actualiza un contacto existente.
   * @param updatedContact El contacto con los datos actualizados.
   */
  updateContact(updatedContact: Contact): Observable<Contact> {
    const index = this.contacts.findIndex(c => c.id === updatedContact.id);
    if (index !== -1) {
      this.contacts[index] = updatedContact;
    }
    return of(updatedContact);
  }

  /**
   * Elimina un contacto por su ID.
   * @param id El ID del contacto a eliminar.
   */
  deleteContact(id: number): Observable<{}> {
    this.contacts = this.contacts.filter(c => c.id !== id);
    return of({});
  }
}