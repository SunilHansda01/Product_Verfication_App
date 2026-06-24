import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { AuthService } from '../../services/auth'; 

@Component({
  selector: 'app-upload-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-products.html',
  styleUrl: './upload-products.css'
})
export class UploadProducts {
  selectedFile: File | null = null;
  successMessage = '';
  errorMessage = '';

  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile() {
    this.successMessage = '';
    this.errorMessage = '';

    // Guard Clause: Assert Role Clearances Prior to Submission Execution
    const userRole = this.authService.getRole();
    if (userRole === 'operator') {
      this.errorMessage = 'You are not authorized to upload product records. This activity requires an Administrative role.';
      return;
    }

    if (!this.selectedFile) {
      this.errorMessage = 'Please select a CSV file';
      return;
    }

    this.productService
      .uploadProducts(this.selectedFile)
      .subscribe({
        next: (response) => {
          this.successMessage = response.message || 'Products uploaded successfully';
          this.cdr.markForCheck();
        },
        error: (error) => {
          this.errorMessage = error.error?.detail || 'Upload failed';
        }
      });
  }
}