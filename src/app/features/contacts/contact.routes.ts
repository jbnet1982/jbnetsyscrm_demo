import { Routes } from '@angular/router';

export const CONTACT_ROUTES: Routes = [
  {
    path: '',
    title: 'Contactos',
    loadComponent: () => import('../../components/contacts-list/contacts-list.component').then(m => m.ContactsListComponent)
  },
  {
    path: 'new',
    title: 'Nuevo Contacto',
    loadComponent: () => import('../../components/contact-form/contact-form.component').then(m => m.ContactFormComponent)
  },
  {
    path: 'edit/:id',
    title: 'Editar Contacto',
    loadComponent: () => import('../../components/contact-form/contact-form.component').then(m => m.ContactFormComponent)
  }
];