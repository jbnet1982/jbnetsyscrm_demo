import { Routes } from '@angular/router';

// Exporta una constante que contiene las rutas específicas para las empresas
export const COMPANY_ROUTES: Routes = [
  {
    // Ruta base para empresas ('/companies'): muestra la lista
    path: '',
    title: 'Empresas',
    loadComponent: () => import('../../components/companies-list/companies-list.component').then(m => m.CompaniesListComponent)
  },
  {
    // Ruta para crear una nueva empresa ('/companies/new')
    path: 'new',
    title: 'Nueva Empresa',
    loadComponent: () => import('../../components/company-form/company-form.component').then(m => m.CompanyFormComponent)
  },
  {
    // Ruta para editar una empresa existente ('/companies/edit/123')
    // :id es un parámetro dinámico que contendrá el ID de la empresa
    path: 'edit/:id',
    title: 'Editar Empresa',
    loadComponent: () => import('../../components/company-form/company-form.component').then(m => m.CompanyFormComponent)
  }
];