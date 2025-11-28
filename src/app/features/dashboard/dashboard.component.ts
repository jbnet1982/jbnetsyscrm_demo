import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

// --- CoreUI Modules ---
import { 
  CardModule, 
  GridModule, 
  WidgetModule, 
  ProgressModule, 
  ListGroupModule, 
  ButtonModule, 
  ModalModule, 
  FormModule 
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
// Importamos todos los iconos necesarios para el Dashboard
import { 
  cilBuilding, 
  cilPeople, 
  cilGraph, 
  cilDollar, 
  cilList, 
  cilArrowRight, 
  cilDescription, 
  cilInfo 
} from '@coreui/icons';

// --- Componente Hijo (Formulario de Interacción) ---
import { InteractionFormComponent } from '../../components/interaction-form/interaction-form.component';

// --- Servicios y Modelos ---
import { CompanyService } from '../../services/company.service';
import { ContactService } from '../../services/contact.service';
import { DealService } from '../../services/deal.service';
import { InteractionService } from '../../services/interaction.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    CurrencyPipe, 
    DecimalPipe, 
    FormsModule,
    // Modules CoreUI
    CardModule, 
    GridModule, 
    WidgetModule, 
    ProgressModule, 
    ListGroupModule, 
    ButtonModule, 
    IconModule, 
    ModalModule, 
    FormModule,
    // Standalone Component
    InteractionFormComponent
  ],
  providers: [IconSetService],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  // --- Propiedades para los KPIs ---
  companyCount = 0;
  contactCount = 0;
  activeDealsCount = 0;
  activeDealsValue = 0;
  
  // --- Propiedades de Datos ---
  recentInteractions: any[] = [];
  contactsList: any[] = []; // Lista para el select del Modal

  // --- Propiedades del Modal ---
  public visibleModal = false;
  public selectedContactId: number | null = null; 

  constructor(
    private companyService: CompanyService,
    private contactService: ContactService,
    private dealService: DealService,
    private interactionService: InteractionService,
    public iconSet: IconSetService
  ) {
    // Registrar los iconos visuales que usa el HTML
    this.iconSet.icons = { 
      cilBuilding, 
      cilPeople, 
      cilGraph, 
      cilDollar, 
      cilList, 
      cilArrowRight, 
      cilDescription,
      cilInfo 
    };
  }

  ngOnInit(): void {
    this.loadKPIs();
    this.loadRecentActivity();
  }

  /**
   * Carga métricas principales (Empresas, Contactos, Pipeline)
   */
  loadKPIs(): void {
    forkJoin({
      companies: this.companyService.getCompanies(),
      contacts: this.contactService.getContacts(),
      deals: this.dealService.getDeals()
    }).subscribe({
      next: ({ companies, contacts, deals }) => {
        // Asignamos contadores
        this.companyCount = companies.length;
        this.contactCount = contacts.length;
        this.contactsList = contacts; // Guardamos lista para el modal

        // Lógica de Deals Activos (Excluyendo Won/Lost)
        const activeDeals = deals.filter((d: any) => d.stage !== 'Won' && d.stage !== 'Lost');
        this.activeDealsCount = activeDeals.length;
        
        // Suma del valor monetario
        this.activeDealsValue = activeDeals.reduce((sum: number, deal: any) => sum + (deal.value || 0), 0);
      },
      error: (err) => console.error('Error cargando KPIs:', err)
    });
  }

  /**
   * Carga las interacciones globales del sistema para el feed de actividad
   */
  loadRecentActivity(): void {
    // IMPORTANTE: Asegúrate de haber agregado el método getInteractions() en tu InteractionService
    // Si no lo tienes, revisa el paso anterior del chat para agregarlo.
    this.interactionService.getInteractions().subscribe({
      next: (interactions) => {
        // Ordenar por fecha descendente (la más reciente primero)
        this.recentInteractions = (interactions as any[])
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5); // Solo mostramos las últimas 5
      },
      error: (err) => {
        console.error('Error cargando actividad:', err);
        this.recentInteractions = [];
      }
    });
  }

  // --- Lógica del Modal ---

  toggleModal() {
    this.visibleModal = !this.visibleModal;
    // Si cerramos el modal, reseteamos la selección para la próxima vez
    if (!this.visibleModal) {
      this.selectedContactId = null; 
    }
  }

  handleModalChange(event: any) {
    this.visibleModal = event;
  }

  /**
   * Se ejecuta cuando el componente hijo (Formulario) guarda con éxito.
   * @param newInteraction El objeto de la interacción recién creada.
   */
  onInteractionSaved(newInteraction: any) {
    console.log('Interacción guardada:', newInteraction);
    
    // 1. Cerrar el modal
    this.toggleModal();

    // 2. ACTUALIZACIÓN OPTIMISTA (UI)
    // Agregamos manualmente el nuevo registro al inicio del array visual
    // para que el usuario lo vea inmediatamente sin esperar al backend.
    this.recentInteractions.unshift(newInteraction);

    // Mantenemos la lista limpia (solo 5 elementos)
    if (this.recentInteractions.length > 5) {
      this.recentInteractions = this.recentInteractions.slice(0, 5);
    }

    // 3. Opcional: Volver a cargar del backend para asegurar sincronización total
    // this.loadRecentActivity(); 
  }
}