import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Departamento } from '../models/departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  departamentoURL: string = '';
  constructor(
    private http: HttpClient
  ) { 
    this.departamentoURL = `${environment.apiURl}/departamento`
  }
  listar() {
    return this.http.get<Array<Departamento>>(this.departamentoURL);
  }

  getById(id: number): Observable<Departamento> {
    return this.http.get<Departamento>(`${this.departamentoURL}/${id}`);
  }

  getIncluir(request: Departamento) {
    return this.http.post<Departamento>(this.departamentoURL, request);
  }

  getAlterar(id: Number | null, request: Departamento) {
    return this.http.put<Departamento>(`${this.departamentoURL}/${id}`, request);
  }

  getExcluir(id: Number) {
    return this.http.delete<Departamento>(`${this.departamentoURL}/${id}`);
  }
}
