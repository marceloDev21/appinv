import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pessoa } from '../models/pessoa';

@Injectable({
  providedIn: 'root'
})
export class ResponsavelService {
  responsavelURL: string = '';
  constructor(
    private http: HttpClient
  ) { 
    this.responsavelURL = `${environment.apiURl}/pessoa`
  }
  listar() {
    return this.http.get<Array<Pessoa>>(this.responsavelURL);
  }

  getById(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.responsavelURL}/${id}`);
  }

  getIncluir(request: Pessoa) {
    return this.http.post<Pessoa>(this.responsavelURL, request);
  }

  getAlterar(id: Number | null, request: Pessoa) {
    return this.http.put<Pessoa>(`${this.responsavelURL}/${id}`, request);
  }

  getExcluir(id: Number) {
    return this.http.delete<Pessoa>(`${this.responsavelURL}/${id}`);
  }
}
