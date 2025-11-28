import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// CoreUI Modules
import { ButtonModule, CardModule, TableModule, TooltipModule, GridModule } from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
// Iconos específicos
import { 
  cilPeople, cilUserPlus, cilPencil, cilTrash, cilEnvelopeClosed, cilBuilding 
} from '@coreui/icons';

// Services & Models
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    CardModule, TableModule, ButtonModule,
    IconModule, TooltipModule,
    GridModule
],
  providers: [IconSetService],
  templateUrl: './contacts-list.component.html',
})
export class ContactsListComponent implements OnInit {
  public contacts: Contact[] = [];
  private companyNames = new Map<number, string>();

  constructor(
    private contactService: ContactService,
    private companyService: CompanyService,
    public iconSet: IconSetService
  ) {
    // Registrar iconos visuales para la tabla
    this.iconSet.icons = { cilPeople, cilUserPlus, cilPencil, cilTrash, cilEnvelopeClosed, cilBuilding };
  }

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    // Primero cargamos empresas para mapear los nombres
    this.companyService.getCompanies().subscribe(companies => {
      companies.forEach(company => this.companyNames.set(company.id, company.name));
      
      // Luego los contactos
      this.contactService.getContacts().subscribe(data => {
        this.contacts = data;
      });
    });
  }

  getCompanyName(companyId: number): string {
    return this.companyNames.get(companyId) || 'Sin Empresa';
  }

  deleteContact(contactId: number): void {
    if (confirm('¿Está seguro de que desea eliminar este contacto?')) {
      this.contactService.deleteContact(contactId).subscribe(() => {
        this.contacts = this.contacts.filter(c => c.id !== contactId);
      });
    }
  }
}