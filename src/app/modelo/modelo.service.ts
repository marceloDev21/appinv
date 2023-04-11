import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Modelo } from '../models/modelo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {
  modeloURL: string = '';
  constructor(
    private http: HttpClient
  ) { 
    this.modeloURL = `${environment.apiURl}/modelo`
  }
  listar() {
    return this.http.get<Array<Modelo>>(this.modeloURL);
  }

  getById(id: number): Observable<Modelo> {
    return this.http.get<Modelo>(`${this.modeloURL}/${id}`);
  }

  getIncluir(request: Modelo) {
    return this.http.post<Modelo>(this.modeloURL, request);
  }

  getAlterar(id: Number | null, request: Modelo) {
    return this.http.put<Modelo>(`${this.modeloURL}/${id}`, request);
  }

  getExcluir(id: Number) {
    return this.http.delete<Modelo>(`${this.modeloURL}/${id}`);
  }
}
