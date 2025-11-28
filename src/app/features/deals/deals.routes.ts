import { Routes } from '@angular/router';

export const DEAL_ROUTES: Routes = [
  {
    path: '',
    title: 'Oportunidades',
    loadComponent: () => import('../../components/deals-list/deals-list.component').then(m => m.DealsListComponent)
  },
  {
    path: 'new',
    title: 'Nueva Oportunidad',
    loadComponent: () => import('../../components/deal-form/deal-form.component').then(m => m.DealFormComponent)
  },
  {
    path: 'edit/:id',
    title: 'Editar Oportunidad',
    loadComponent: () => import('../../components/deal-form/deal-form.component').then(m => m.DealFormComponent)
  }
];