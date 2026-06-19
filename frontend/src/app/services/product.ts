import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  private apiUrl =
    'http://localhost:8000';

  uploadProducts(file: File) {

    const formData =
      new FormData();

    formData.append(
      'file',
      file
    );

    return this.http.post<any>(
      `${this.apiUrl}/products/upload`,
      formData
    );

  }

  verifyProduct(
    wid: string,
    image: File
  ) {

    const formData =
      new FormData();

    formData.append(
      'wid',
      wid
    );

    formData.append(
      'image',
      image
    );

    const token =
      localStorage.getItem(
        'access_token'
      );

    const headers =
      new HttpHeaders({
        Authorization:
          `Bearer ${token}`
      });

    return this.http.post(
      `${this.apiUrl}/verification/`,
      formData,
      { headers }
    );
  }
}