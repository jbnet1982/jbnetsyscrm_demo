import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

// Core UI Modules
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { cilBriefcase, cilPencil, cilBuilding, cilSave } from '@coreui/icons';

import { CompanyService } from '../../services/company.service';
import { IndustryTypeService } from '../../services/industrytype.service';
import { IndustryType } from '../../models/industrytype.model';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, CardModule, FormModule, GridModule, ButtonModule, IconModule],
  providers: [IconSetService],
  templateUrl: './company-form.component.html',
})
export class CompanyFormComponent implements OnInit {
  companyForm: FormGroup;
  isEditMode = false;
  currentCompanyId: number | null = null;
  industryTypes: IndustryType[] = [];

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private industryTypeService: IndustryTypeService,
    private router: Router,
    private route: ActivatedRoute,
    public iconSet: IconSetService
  ) {
    // Registrar iconos necesarios
    this.iconSet.icons = { cilBriefcase, cilPencil, cilBuilding, cilSave };

    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      industryTypeId: [null, Validators.required],
      address: [''],
      phone: [''],
      website: ['', Validators.pattern(/^(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/)],
    });
  }

  ngOnInit(): void {
    this.loadIndustryTypes();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.currentCompanyId = +id;
        this.companyService.getCompanyById(this.currentCompanyId).subscribe(company => {
          if (company) {
            this.companyForm.patchValue(company);
          }
        });
      }
    });
  }

  loadIndustryTypes(): void {
    this.industryTypeService.getIndustryTypes().subscribe(data => {
      this.industryTypes = data;
    });
  }

  onSubmit(): void {
    if (this.companyForm.invalid) {
      this.companyForm.markAllAsTouched();
      return;
    }

    const companyData = this.companyForm.value;

    if (this.isEditMode && this.currentCompanyId) {
      this.companyService.updateCompany({ id: this.currentCompanyId, ...companyData }).subscribe(() => {
        this.router.navigate(['/companies']);
      });
    } else {
      this.companyService.addCompany(companyData).subscribe(() => {
        this.router.navigate(['/companies']);
      });
    }
  }
}