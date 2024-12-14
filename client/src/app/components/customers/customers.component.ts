import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { Customer } from 'app/model/Customers';

@Component({
  selector: 'customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = []; // Array of customers
  isEditing = false; // Toggle for editing modal
  isAdding = false; // Toggle for adding modal
  editingCustomer: Customer = { _id: '', userName: '', email: '', phone: '' }; // Customer being edited/added
  isLoading = false; // Loader toggle
  error: string | null = null; // Error handling

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  // Fetch customers from the API
  loadCustomers(): void {
    this.isLoading = true;
    this.apiService.getUsers().subscribe(
      (data: Customer[]) => {
        this.customers = data;
        this.isLoading = false;
      },
      (error) => {
        this.error = 'Failed to load customers.';
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  // Open the modal for adding a customer
  openAddCustomerModal(): void {
    this.editingCustomer = { _id: '', userName: '', email: '', phone: '' }; // Reset form
    this.isAdding = true;
    this.isEditing = false;
  }

  // Open the modal for editing a customer
  editCustomer(customer: Customer): void {
    this.editingCustomer = { ...customer }; // Pre-fill form with customer data
    this.isEditing = true;
    this.isAdding = false;
  }

  // Save the customer (Add or Edit)
  saveCustomer(): void {
    if (this.isAdding) {
      this.addCustomer();
    } else if (this.isEditing) {
      this.updateCustomer();
    }
  }

  // Add a new customer
  private addCustomer(): void {
    this.apiService.createUser(this.editingCustomer).subscribe(
      (newCustomer: Customer) => {
        this.customers.push(newCustomer);
        this.isAdding = false;
      },
      (error) => {
        this.error = 'Failed to add customer.';
        console.error(error);
      }
    );
  }

  // Update an existing customer
  private updateCustomer(): void {
    const { _id, ...updatedData } = this.editingCustomer;
    console.log(this.editingCustomer);

    this.apiService.updateUser(_id, updatedData).subscribe(
      () => {
        this.customers = this.customers.map((c) =>
          c._id === _id ? { ...c, ...updatedData } : c
        );
        this.isEditing = false;
      },
      (error) => {
        this.error = 'Failed to update customer.';
        console.error(error);
      }
    );
  }

  // Delete a customer
  deleteCustomer(customerId: string): void {
    this.apiService.deleteUser(customerId).subscribe(
      () => {
        this.customers = this.customers.filter((c) => c._id !== customerId);
      },
      (error) => {
        this.error = 'Failed to delete customer.';
        console.error(error);
      }
    );
  }

  // Cancel modal
  cancelEdit(): void {
    this.isEditing = false;
    this.isAdding = false;
  }
}
