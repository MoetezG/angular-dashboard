import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () =>
      import('./components/customers/customers.module').then(
        (m) => m.CustomersModule
      ),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./components/orders/orders.module').then((m) => m.OrdersModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./components/products/products.module').then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./components/categories/categories.module').then(
        (m) => m.CategoriesModule
      ),
  },
  {
    path: 'profile',
    component: ProfileEditComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
