import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Marca } from '../models/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  marcaURL: string = '';
  constructor(
    private http: HttpClient
  ) { 
    this.marcaURL = `${environment.apiURl}/marca`
  }
  listar() {
    return this.http.get<Array<Marca>>(this.marcaURL);
  }

  getById(id: number): Observable<Marca> {
    return this.http.get<Marca>(`${this.marcaURL}/${id}`);
  }

  getIncluir(request: Marca) {
    return this.http.post<Marca>(this.marcaURL, request);
  }

  getAlterar(id: Number | null, request: Marca) {
    return this.http.put<Marca>(`${this.marcaURL}/${id}`, request);
  }

  getExcluir(id: Number) {
    return this.http.delete<Marca>(`${this.marcaURL}/${id}`);
  }
}
