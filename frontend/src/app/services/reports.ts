import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8000/reports';

  getReport(startDate: string, endDate: string) {

    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(
      `${this.apiUrl}?start_date=${startDate}&end_date=${endDate}`,
      { headers }
    );
  }
}