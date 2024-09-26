import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CupcakeService {
  private apiUrl = 'http://seu-backend-api.com/api/cupcakes'; // Substitua pela URL real da sua API

  constructor(private http: HttpClient) { }

  getCupcakes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCupcake(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createCupcake(cupcake: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, cupcake);
  }

  updateCupcake(id: number, cupcake: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, cupcake);
  }

  deleteCupcake(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }

  getSales(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sales`);
  }

  getSalesHistory(cupcakeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${cupcakeId}/sales-history`);
  }

  getReviews(cupcakeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${cupcakeId}/reviews`);
  }
}
