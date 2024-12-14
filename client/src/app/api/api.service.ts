import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // User Endpoints
  createUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, data);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${userId}`);
  }

  getCustomersData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/data`);
  }

  updateUser(userId: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${userId}`, data);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${userId}`);
  }

  // Product Endpoints
  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`);
  }

  getProductById(productId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${productId}`);
  }

  getProductsData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/data`);
  }

  createProduct(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, data);
  }

  updateProduct(productId: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/products/${productId}`, data);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${productId}`);
  }

  getProductsByCategory(category: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/category/${category}`);
  }

  // Order Endpoints
  createOrder(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/orders`, data);
  }

  getOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/orders`);
  }

  getOrderById(orderId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/orders/${orderId}`);
  }

  getOrdersData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/orders/data`);
  }

  updateOrder(orderId: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/orders/${orderId}`, data);
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/orders/${orderId}`);
  }

  // Category Endpoints
  createCategory(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/categories`, data);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`);
  }

  getCategoryById(categoryId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories/${categoryId}`);
  }

  updateCategory(categoryId: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/categories/${categoryId}`, data);
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/categories/${categoryId}`);
  }
}
