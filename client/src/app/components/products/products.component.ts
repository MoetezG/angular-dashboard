import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service'; // Adjust path as needed
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any[] = []; // Array to store products
  categories: any[] = []; // Array to store categories for dropdown
  isLoading = true; // Loading spinner toggle
  isModalOpen = false; // Toggle for modal
  isEditing = false; // Toggle for edit mode
  currentProduct = {
    _id: '',
    name: '',
    description: '',
    price: 0,
    stock: 0,
    categoryId: '',
    image: <File | null>null,
  }; // Placeholder for product being added/edited

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchCategories(); // Fetch categories for dropdown
  }

  // Fetch products from API
  fetchProducts(): void {
    this.isLoading = true;
    this.apiService.getProducts().subscribe(
      (response) => {
        this.products = response;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      }
    );
  }

  // Fetch categories for dropdown
  fetchCategories(): void {
    this.apiService.getCategories().subscribe(
      (response: any) => {
        this.categories = response;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  // Open modal to add a product
  openAddProductModal(): void {
    this.currentProduct = {
      _id: '',
      name: '',
      description: '',
      price: 0,
      stock: 0,
      categoryId: '',
      image: <File | null>null,
    };
    this.isEditing = false;
    this.isModalOpen = true;
  }

  // Open modal to edit a product
  editProduct(product: any): void {
    this.currentProduct = { ...product };
    this.isEditing = true;
    this.isModalOpen = true;
  }

  // Save product (add or edit)
  onImageChange(event: any): void {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      this.currentProduct.image = file;
    }
  }

  // Save product (add or edit)
  saveProduct(): void {
    const categoryId = this.currentProduct.categoryId;
    const formData = new FormData();

    // Append product fields to formData
    formData.append('name', this.currentProduct.name);
    formData.append('description', this.currentProduct.description);
    formData.append('price', this.currentProduct.price.toString());
    formData.append('stock', this.currentProduct.stock.toString());
    formData.append('categoryId', categoryId || '');

    // Check if the product has a valid image file
    if (
      this.currentProduct.image &&
      this.currentProduct.image instanceof File
    ) {
      formData.append(
        'image',
        this.currentProduct.image,
        this.currentProduct.image.name
      );
    } else {
      console.error('No valid image selected');
    }

    if (this.isEditing) {
      this.apiService
        .updateProduct(this.currentProduct._id, formData)
        .subscribe(
          (response) => {
            this.fetchProducts();
            this.closeModal();
          },
          (error) => console.error('Error updating product:', error)
        );
    } else {
      this.apiService.createProduct(formData).subscribe(
        (response) => {
          this.fetchProducts();
          this.closeModal();
        },
        (error) => console.error('Error creating product:', error)
      );
    }
  }

  // Close modal
  closeModal(): void {
    this.isModalOpen = false;
  }

  // Delete a product
  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.apiService.deleteProduct(productId).subscribe(
        () => this.fetchProducts(),
        (error) => console.error('Error deleting product:', error)
      );
    }
  }
}
