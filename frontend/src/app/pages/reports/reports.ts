import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReportService } from '../../services/reports';
import { AuthService } from '../../services/auth'; // Injecting your auth service


@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './reports.html',
  styleUrls: ['./reports.css']
})
export class Reports {
  private reportService = inject(ReportService);
  private authService = inject(AuthService); // Inject instance
  private cdr = inject(ChangeDetectorRef);

  startDate = '';
  endDate = '';

  generatedBy = '';
  totalRecords = 0;

  records: any[] = [];

  loading = false;
  error = '';

  generateReport() {
    this.error = '';

    // Guard Clause: Block operator role profiles from running reports
    const userRole = this.authService.getRole();
    if (userRole === 'operator') {
      this.error = 'You are not authorized to generate report data. Admin privileges required.';
      return;
    }

    if (!this.startDate || !this.endDate) {
      this.error = 'Please select both dates';
      return;
    }

    console.time('report');

    this.loading = true;

    this.reportService.getReport(this.startDate, this.endDate).subscribe({
      next: (response) => {
        this.generatedBy = response.generated_by;
        this.totalRecords = response.total_records;
        this.records = response.data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.timeEnd('report');
        this.loading = false;
        this.error =
          err?.error?.detail ||
          'Failed to generate report';
      }
    });
  }

  cancelReport() {
    // Reset date picker inputs
    this.startDate = '';
    this.endDate = '';

    // Clear previously generated dataset
    this.generatedBy = '';
    this.totalRecords = 0;
    this.records = [];

    // Clear active status/error indicators
    this.loading = false;
    this.error = '';
  }
}