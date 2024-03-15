import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from './clientes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  constructor(private http: HttpClient) { }

  cliente: Cliente = {}
  private baseUrl = 'http://localhost:8080';

  setCliente(cliente: Cliente): void {
    this.cliente = cliente;
  }

  getCliente(): Cliente {
    return this.cliente;
  }

  public recuperarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/clientes`);
  }

  public adicionarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseUrl}/clientes`, cliente);
  }

  public atualizarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.baseUrl}/clientes`, cliente);
  }

  public deletarCliente(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/clientes?id=${id}`);
  }
}
