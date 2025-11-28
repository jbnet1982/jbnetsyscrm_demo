import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

// CoreUI & Icons
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { cilUser, cilPencil, cilSave, cilEnvelopeClosed, cilPhone } from '@coreui/icons';

import { ContactService } from '../../services/contact.service';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule, 
    CardModule, FormModule, GridModule, ButtonModule, IconModule
  ],
  providers: [IconSetService],
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  isEditMode = false;
  currentContactId: number | null = null;
  companies: Company[] = [];

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
    public iconSet: IconSetService
  ) {
    // Registrar Iconos del formulario
    this.iconSet.icons = { cilUser, cilPencil, cilSave, cilEnvelopeClosed, cilPhone };

    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      companyId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCompanies();
    
    // Verificar si es edición (Check route ID)
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.currentContactId = +id;
        
        // Cargar datos del contacto para editar
        this.contactService.getContactById(this.currentContactId).subscribe(contact => {
          if (contact) {
            this.contactForm.patchValue(contact);
          }
        });
      }
    });
  }

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe(data => {
      this.companies = data;
    });
  }
  
  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    if (this.isEditMode && this.currentContactId) {
       this.contactService.updateContact({ id: this.currentContactId, ...this.contactForm.value }).subscribe(() => {
         this.router.navigate(['/contacts']);
       });
    } else {
       this.contactService.addContact(this.contactForm.value).subscribe(() => {
         this.router.navigate(['/contacts']);
       });
    }
  }
}