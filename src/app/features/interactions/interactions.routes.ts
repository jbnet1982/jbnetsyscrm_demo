import { Routes } from '@angular/router';

export const INTERACTION_ROUTES: Routes = [
  {
    path: '',
    title: 'Interacciones',
    loadComponent: () => import('../../components/interactions-list/interactions-list.component').then(m => m.InteractionsListComponent)
  },
  {
    path: 'new',
    title: 'Nueva Interacción',
    loadComponent: () => import('../../components/interaction-form/interaction-form.component').then(m => m.InteractionFormComponent)
  },
  {
    path: 'edit/:id',
    title: 'Editar Interacción',
    loadComponent: () => import('../../components/interaction-form/interaction-form.component').then(m => m.InteractionFormComponent)
  }
];