import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { Category } from '../../model/categories'; // Adjust the path as needed

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  isModalOpen = false;
  isEditing = false;
  currentCategory: Category = { _id: '', name: '', description: '' };
  isLoading = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // Load categories from the API
  loadCategories(): void {
    this.isLoading = true;
    this.apiService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Failed to load categories', error);
        this.isLoading = false;
      }
    );
  }

  // Open modal to add a category
  openAddCategoryModal(): void {
    this.currentCategory = { _id: '', name: '', description: '' };
    this.isEditing = false;
    this.isModalOpen = true;
  }

  // Open modal to edit a category
  editCategory(category: Category): void {
    this.currentCategory = { ...category };
    this.isEditing = true;
    this.isModalOpen = true;
  }

  // Save category (add or edit)
  saveCategory(): void {
    if (this.isEditing) {
      this.apiService
        .updateCategory(this.currentCategory._id, this.currentCategory)
        .subscribe(
          () => {
            this.loadCategories(); // Refresh the list
            this.closeModal();
          },
          (error) => {
            console.error('Failed to update category', error);
          }
        );
    } else {
      this.apiService.createCategory(this.currentCategory).subscribe(
        () => {
          this.loadCategories(); // Refresh the list
          this.closeModal();
        },
        (error) => {
          console.error('Failed to create category', error);
        }
      );
    }
  }

  // Close modal
  closeModal(): void {
    this.isModalOpen = false;
  }

  // Delete a category
  deleteCategory(categoryId: string): void {
    this.apiService.deleteCategory(categoryId).subscribe(
      () => {
        this.loadCategories(); // Refresh the list
      },
      (error) => {
        console.error('Failed to delete category', error);
      }
    );
  }
}
