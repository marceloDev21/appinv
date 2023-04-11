import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Tipo } from '../models/tipo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoService {
  tipoURL: string = '';
  constructor(
    private http: HttpClient
  ) { 
    this.tipoURL = `${environment.apiURl}/tipo`
  }
  listar() {
    return this.http.get<Array<Tipo>>(this.tipoURL);
  }

  getById(id: number): Observable<Tipo> {
    return this.http.get<Tipo>(`${this.tipoURL}/${id}`);
  }

  getIncluir(request: Tipo) {
    return this.http.post<Tipo>(this.tipoURL, request);
  }

  getAlterar(id: Number | null, request: Tipo) {
    return this.http.put<Tipo>(`${this.tipoURL}/${id}`, request);
  }

  getExcluir(id: Number) {
    return this.http.delete<Tipo>(`${this.tipoURL}/${id}`);
  }
}
