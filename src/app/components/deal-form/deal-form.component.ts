import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// CoreUI & Icons
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { cilPencil, cilDollar, cilSave } from '@coreui/icons'; // Iconos nuevos

import { DealService } from '../../services/deal.service';
import { ContactService } from '../../services/contact.service';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company.model';
import { Contact } from '../../models/contact.model';
import { Deal } from '../../models/deal.model';

@Component({
  selector: 'app-deal-form',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule,
    CardModule, FormModule, GridModule, ButtonModule, IconModule
  ],
  providers: [IconSetService],
  templateUrl: './deal-form.component.html',
})
export class DealFormComponent implements OnInit {
  dealForm: FormGroup;
  isEditMode = false;
  currentDealId: number | null = null;
  
  companies: Company[] = [];
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];

  stages: Deal['stage'][] = ['Lead', 'Qualified', 'Proposal', 'Won', 'Lost'];

  constructor(
    private fb: FormBuilder,
    private dealService: DealService,
    private companyService: CompanyService,
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    public iconSet: IconSetService
  ) {
    // Registro iconos
    this.iconSet.icons = { cilPencil, cilDollar, cilSave };

    this.dealForm = this.fb.group({
      name: ['', Validators.required],
      stage: ['Lead', Validators.required],
      value: [0, [Validators.required, Validators.min(0)]],
      closeDate: ['', Validators.required],
      companyId: [null, Validators.required],
      contactId: [{ value: null, disabled: true }, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadInitialData();
    this.checkEditMode();
    this.setupCompanySelectionListener();
  }

  loadInitialData(): void {
    forkJoin({
      companies: this.companyService.getCompanies(),
      contacts: this.contactService.getContacts()
    }).subscribe(({ companies, contacts }) => {
      this.companies = companies;
      this.contacts = contacts;
      if (this.dealForm.get('companyId')?.value) {
        this.filterContacts(this.dealForm.get('companyId')?.value);
      }
    });
  }

  checkEditMode(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.currentDealId = +id;
        this.dealService.getDealById(this.currentDealId).subscribe(deal => {
          if (deal) {
            const formattedDeal = {...deal, closeDate: this.formatDateForInput(deal.closeDate)};
            this.dealForm.patchValue(formattedDeal);
            // Aseguramos filtrar contactos al cargar data de edición
            this.filterContacts(deal.companyId);
          }
        });
      }
    });
  }

  setupCompanySelectionListener(): void {
    this.dealForm.get('companyId')?.valueChanges.subscribe(companyId => {
      this.filterContacts(companyId);
    });
  }
  
  filterContacts(companyId: number | null) {
      const contactControl = this.dealForm.get('contactId');
      
      // Si estamos cargando datos, preservamos el valor actual si es válido
      const currentValue = contactControl?.value;

      if (companyId) {
        this.filteredContacts = this.contacts.filter(c => c.companyId === companyId);
        contactControl?.enable();
        
        // Verificamos si el contacto seleccionado aun pertenece a la empresa
        const isValid = this.filteredContacts.some(c => c.id == currentValue);
        if(!isValid) contactControl?.reset();

      } else {
        this.filteredContacts = [];
        contactControl?.disable();
        contactControl?.reset();
      }
  }

  onSubmit(): void {
    if (this.dealForm.invalid) {
      this.dealForm.markAllAsTouched();
      return;
    }

    if (this.isEditMode && this.currentDealId) {
      const updatedDeal: Deal = { id: this.currentDealId, ...this.dealForm.value };
      this.dealService.updateDeal(updatedDeal).subscribe(() => {
        this.router.navigate(['/deals']);
      });
    } else {
      this.dealService.addDeal(this.dealForm.value).subscribe(() => {
        this.router.navigate(['/deals']);
      });
    }
  }
  
  private formatDateForInput(date: Date): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}