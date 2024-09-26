import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CupcakeService {
  private _http = inject(HttpClient);
  private _apiUrl = 'http://localhost:3000/api/cupcakes'; // Substitua pela URL real da sua API

  getCupcakes(): Observable<any[]> {
    return this._http.get<any[]>(this._apiUrl);
  }

  getCupcake(id: number): Observable<any> {
    return this._http.get<any>(`${this._apiUrl}/${id}`);
  }

  createCupcake(cupcake: any): Observable<any> {
    return this._http.post<any>(this._apiUrl, cupcake);
  }

  updateCupcake(id: number, cupcake: any): Observable<any> {
    return this._http.put<any>(`${this._apiUrl}/${id}`, cupcake);
  }

  deleteCupcake(id: number): Observable<any> {
    return this._http.delete<any>(`${this._apiUrl}/${id}`);
  }

  getSales(): Observable<any[]> {
    return this._http.get<any[]>(`${this._apiUrl}/sales`);
  }

  getSalesHistory(cupcakeId: number): Observable<any[]> {
    return this._http.get<any[]>(`${this._apiUrl}/${cupcakeId}/sales-history`);
  }

  getReviews(cupcakeId: number): Observable<any[]> {
    return this._http.get<any[]>(`${this._apiUrl}/${cupcakeId}/reviews`);
  }
}
