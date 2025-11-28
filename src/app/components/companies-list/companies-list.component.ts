import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin, map } from 'rxjs';

// CoreUI Modules
import { ButtonModule, CardModule, TableModule, TooltipModule, GridModule } from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
// Iconos
import { cilBuilding, cilPlus, cilPencil, cilTrash, cilPhone, cilLocationPin, cilExternalLink } from '@coreui/icons';

// App Services and Models
import { Company } from '../../models/company.model';
import { CompanyService } from '../../services/company.service';
import { IndustryTypeService } from '../../services/industrytype.service';

@Component({
  selector: 'app-companies-list',
  standalone: true,
  imports: [CommonModule, RouterLink, CardModule, TableModule, ButtonModule, IconModule, TooltipModule, GridModule],
  providers: [IconSetService],
  templateUrl: './companies-list.component.html',
})
export class CompaniesListComponent implements OnInit {
  companies: Company[] = [];
  industryTypeMap = new Map<number, string>();

  constructor(
    private companyService: CompanyService,
    private industryTypeService: IndustryTypeService,
    public iconSet: IconSetService
  ) {
    // Registrar iconos visuales
    this.iconSet.icons = { cilBuilding, cilPlus, cilPencil, cilTrash, cilPhone, cilLocationPin, cilExternalLink };
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      types: this.industryTypeService.getIndustryTypes(),
      companies: this.companyService.getCompanies()
    }).pipe(
      map(response => {
        const { types, companies } = response;
        types.forEach(type => this.industryTypeMap.set(type.id, type.name));
        return companies;
      })
    ).subscribe(companies => {
      this.companies = companies;
    });
  }

  getIndustryName(id: number): string {
    return this.industryTypeMap.get(id) || 'N/A';
  }

  deleteCompany(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar esta empresa?')) {
      this.companyService.deleteCompany(id).subscribe(() => {
        this.companies = this.companies.filter(c => c.id !== id);
      });
    }
  }
}