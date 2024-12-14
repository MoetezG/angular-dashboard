import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api/api.service'; // Adjust the path as needed
import { Order } from '../../model/orders';
import { Customer } from '../../model/Customers';

@Component({
  selector: 'app-order',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  customers: Customer[] = [];
  selectedOrder: Order | null = null;
  orderForm: FormGroup;
  isEditing = false;
  isModalOpen = false;
  isLoading = false;
  errorMessage: string | null = null;
  statusColors: { [key: string]: string } = {
    pending: 'bg-orange-500',
    shipped: 'bg-blue-500',
    delivered: 'bg-green-500',
    cancelled: 'bg-red-500',
  };

  constructor(private orderService: ApiService, private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      totalAmount: ['', [Validators.required, Validators.min(0)]],
      userId: ['', Validators.required],
      status: ['pending', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCustomers();
    this.loadOrders();
  }

  loadCustomers() {
    this.orderService.getUsers().subscribe({
      next: (res) => {
        this.customers = res;
      },
      error: () => {
        this.errorMessage = 'Failed to load customers. Please try again later.';
      },
    });
  }

  // Fetch all orders
  loadOrders() {
    this.isLoading = true;
    this.orderService.getOrders().subscribe({
      next: (res) => {
        this.orders = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load orders. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  // Open the modal for adding or editing orders
  openAddOrderModal() {
    this.resetForm();
    this.isModalOpen = true;
  }

  editOrder(order: Order) {
    this.selectOrder(order);
    this.isModalOpen = true;
  }

  // Close the modal
  closeModal() {
    this.resetForm();
    this.isModalOpen = false;
  }

  // Select an order for editing
  selectOrder(order: Order) {
    this.selectedOrder = order;
    this.isEditing = true;
    this.orderForm.patchValue({
      userId: order.userId,
      totalAmount: order.totalAmount,
      status: order.status,
    });
  }

  // Create a new order
  saveOrder() {
    if (this.orderForm.valid) {
      this.orderService.createOrder(this.orderForm.value).subscribe({
        next: () => {
          this.loadOrders();
          this.closeModal();
        },
        error: () => {
          this.errorMessage = 'Failed to create order. Please try again.';
        },
      });
    }
  }

  // Update an existing order
  updateOrder() {
    if (this.selectedOrder && this.orderForm.valid) {
      this.orderService
        .updateOrder(this.selectedOrder._id, this.orderForm.value)
        .subscribe({
          next: () => {
            this.loadOrders();
            this.closeModal();
          },
          error: () => {
            this.errorMessage = 'Failed to update order. Please try again.';
          },
        });
    }
  }

  // Delete an order
  deleteOrder(orderId: string) {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(orderId).subscribe({
        next: () => {
          this.loadOrders();
        },
        error: () => {
          this.errorMessage = 'Failed to delete order. Please try again.';
        },
      });
    }
  }

  // Reset the form to its initial state
  resetForm() {
    this.orderForm.reset({
      userId: '',
      totalAmount: '',
      status: 'pending',
    });
    this.isEditing = false;
    this.selectedOrder = null;
    this.errorMessage = null;
  }
}
