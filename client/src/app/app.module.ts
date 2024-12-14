import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NgChartsModule } from 'ng2-charts';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { LoginComponent } from './components/login/login.component';
import { ButtonComponent } from './shared/button/button.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ApiService } from './api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    ProductsComponent,
    CategoriesComponent,
    DashboardComponent,
    ProfileEditComponent,
    LoginComponent,
    CustomersComponent,
    ButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
