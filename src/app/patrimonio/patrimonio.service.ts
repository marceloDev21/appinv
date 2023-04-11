import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patrimonio } from '../models/patrimonio';
import { Posse } from '../models/posse';
import { Departamento } from '../models/departamento';


@Injectable({
  providedIn: 'root'
})
export class PatrimonioService {
  patrimonioURL: string = '';

  posseURL: string = '';
  constructor(
    private http: HttpClient
  ) { 
    this.patrimonioURL = `${environment.apiURl}/patrimonio`
    this.posseURL = `${environment.apiURl}/posse`

  }
  listar() {
    return this.http.get<Array<Patrimonio>>(this.patrimonioURL);
  }

  getById(id: number): Observable<Patrimonio> {
    return this.http.get<Patrimonio>(`${this.patrimonioURL}/${id}`);
  }

  getIncluir(request: Patrimonio) {
    return this.http.post<Patrimonio>(this.patrimonioURL, request);
  }

  getAlterar(id: Number | null, request: Patrimonio) {
    return this.http.put<Patrimonio>(`${this.patrimonioURL}/${id}`, request);
  }

  getExcluir(id: Number) {
    return this.http.delete<Patrimonio>(`${this.patrimonioURL}/${id}`);
  }

  getIncluirPosse(request: Posse) {
    return this.http.post<Posse>(this.posseURL, request);
  }

  getAlterarPosse(id: Number | null, request: Posse) {
    return this.http.put<Posse>(`${this.posseURL}/${id}`, request);
  }

  getByCode(codigo: number): Observable<Patrimonio>{
    return this.http.get<Patrimonio>(`${this.patrimonioURL}/codigo/${codigo}`);
  }

  getByDepartamento(departamento: string): Observable<Array<Patrimonio>>{
    return this.http.get<Patrimonio[]>(`${this.patrimonioURL}/departamento/${departamento}`);
  }

}
