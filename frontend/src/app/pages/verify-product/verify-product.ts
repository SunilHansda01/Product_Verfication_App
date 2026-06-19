import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProductService } from '../../services/product';

@Component({
  selector: 'app-verify-product',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './verify-product.html',
  styleUrl: './verify-product.css'
})
export class VerifyProduct {

  private productService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);

  wid = '';
  selectedFile: File | null = null;
  verification: any = null;
  errorMessage = '';

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  verify() {
    this.errorMessage = '';
    this.verification = null;

    if (!this.wid.trim()) {
      this.errorMessage = 'Please enter a WID';
      return;
    }

    if (!this.selectedFile) {
      this.errorMessage = 'Please select an image';
      return;
    }

    this.productService
      .verifyProduct(this.wid, this.selectedFile)
      .subscribe({
        next: (response: any) => {
          console.log('Backend response payload:', response);

          const data = response.data ? response.data : response;

          // 1. Wrap the state mutation inside a fresh Macro-Task event loop
          setTimeout(() => {
            // 2. Use the Spread Operator {...} to break old object tracking references
            this.verification = {
              ...{
                message: data.message || 'Product verified successfully',
                verified_by: data.verified_by || data.verifiedBy || 'N/A',
                wid: data.wid || this.wid,
                ean: data.ean || data.eanCode || 'N/A',
                manufacturing_date: data.manufacturing_date || data.manufacturingDate || 'N/A',
                expiry_date: data.expiry_date || data.expiryDate || 'N/A'
              }
            };

            // 3. Trigger manual re-evaluating run
            this.cdr.markForCheck();
            this.cdr.detectChanges();
          }, 0);
        },
        error: (error) => {
          console.error(error);

          setTimeout(() => {
            this.verification = null;
            if (error.status === 404) {
              this.errorMessage = 'INVALID PRODUCT';
            } else if (error.status === 401) {
              this.errorMessage = 'Session expired. Please login again';
            } else if (error.status === 403) {
              this.errorMessage = 'Access denied';
            } else {
              this.errorMessage = 'Verification failed';
            }
            this.cdr.detectChanges();
          }, 0);
        }
      });
  }
}