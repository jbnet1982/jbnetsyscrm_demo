import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { BadgeModule, ButtonModule, CardModule, TableModule, TooltipModule, GridModule } from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
// Importamos iconos
import { cilGraph, cilPlus, cilPencil, cilBuilding, cilUser, cilCalendar, cilFolderOpen } from '@coreui/icons';

import { Deal } from '../../models/deal.model';
import { DealService } from '../../services/deal.service';
import { CompanyService } from '../../services/company.service';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-deals-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink, CurrencyPipe, DatePipe,
    CardModule, TableModule, ButtonModule, BadgeModule, IconModule, TooltipModule,
    GridModule
],
  providers: [IconSetService],
  templateUrl: './deals-list.component.html',
})
export class DealsListComponent implements OnInit {
  public deals: Deal[] = [];
  private companyNames = new Map<number, string>();
  private contactNames = new Map<number, string>();

  constructor(
    private dealService: DealService,
    private companyService: CompanyService,
    private contactService: ContactService,
    public iconSet: IconSetService
  ) {
    // Registrar iconos visuales
    this.iconSet.icons = { cilGraph, cilPlus, cilPencil, cilBuilding, cilUser, cilCalendar, cilFolderOpen };
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      companies: this.companyService.getCompanies(),
      contacts: this.contactService.getContacts(),
      deals: this.dealService.getDeals()
    }).subscribe(({ companies, contacts, deals }) => {
      companies.forEach(c => this.companyNames.set(c.id, c.name));
      contacts.forEach(c => this.contactNames.set(c.id, `${c.firstName} ${c.lastName}`));
      this.deals = deals;
    });
  }

  getCompanyName(id: number): string {
    return this.companyNames.get(id) || 'N/A';
  }

  getContactName(id: number): string {
    return this.contactNames.get(id) || 'N/A';
  }

  getBadgeColorForStage(stage: Deal['stage']): string {
    switch (stage) {
      case 'Won': return 'success';
      case 'Lost': return 'danger';
      case 'Proposal': return 'info';
      case 'Qualified': return 'warning';
      case 'Lead':
      default: return 'secondary'; // Light con texto oscuro
    }
  }
}