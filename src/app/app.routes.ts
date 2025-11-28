import { Routes } from '@angular/router';

export const routes: Routes = [
  // --- RUTAS DE LA APLICACIÓN ---

  // Ruta para el Dashboard (si tienes uno)
  {
    path: 'dashboard',
    title: 'Dashboard', // Título que puede aparecer en la pestaña del navegador
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },

  // Ruta para Empresas: Carga perezosa de sus rutas anidadas
  {
    path: 'companies',
    loadChildren: () => import('./features/companies/company.routes').then(m => m.COMPANY_ROUTES)
  },
  
  // Ruta para Contactos: Carga perezosa de sus rutas anidadas
  {
    path: 'contacts',
    loadChildren: () => import('./features/contacts/contact.routes').then(m => m.CONTACT_ROUTES)
  },

  // Ruta para Oportunidades (Deals): Carga perezosa de sus rutas anidadas
  {
    path: 'deals',
    loadChildren: () => import('./features/deals/deals.routes').then(m => m.DEAL_ROUTES)
  },
  {
    path: 'interactions',
    loadChildren: () => import('./features/interactions/interactions.routes').then(m => m.INTERACTION_ROUTES)
  },


  // --- RUTAS DE REDIRECCIÓN Y PREDETERMINADAS ---

  // Si el usuario visita la raíz ('http://localhost:4200/'), redirige al dashboard
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full' // Importante: 'full' asegura que solo redirija si la ruta está completamente vacía
  },
  
  // Wildcard Route: Si la URL no coincide con ninguna ruta anterior, muestra un componente "Página no encontrada"
  {
    path: '**',
    title: 'Página no encontrada',
    loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];