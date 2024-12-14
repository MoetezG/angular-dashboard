import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent {
  profileImage: string | null = null; // Holds the uploaded image URL
  profile = {
    name: 20202020,
    email: 'admin@admin.com',
    phone: 20202020,
  };

  // Handle profile image upload
  onImageUpload(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result as string;
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  }

  // Handle profile image deletion
  deleteImage(): void {
    this.profileImage = null;
  }

  // Handle form submission
  onSubmit(): void {
    // Logic for saving changes (e.g., API call)
    console.log('Profile updated:', this.profile);
  }
}
