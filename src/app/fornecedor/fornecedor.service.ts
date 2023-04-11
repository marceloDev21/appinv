import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fornecedor } from '../models/fornecedor';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  fornecedorURL: string = '';
  constructor(
    private http: HttpClient
  ) { 
    this.fornecedorURL = `${environment.apiURl}/fornecedor`
  }
  listar() {
    return this.http.get<Array<Fornecedor>>(this.fornecedorURL);
  }

  getById(id: number): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`${this.fornecedorURL}/${id}`);
  }

  getIncluir(request: Fornecedor) {
    return this.http.post<Fornecedor>(this.fornecedorURL, request);
  }

  getAlterar(id: Number | null, request: Fornecedor) {
    return this.http.put<Fornecedor>(`${this.fornecedorURL}/${id}`, request);
  }

  getExcluir(id: Number) {
    return this.http.delete<Fornecedor>(`${this.fornecedorURL}/${id}`);
  }
}
