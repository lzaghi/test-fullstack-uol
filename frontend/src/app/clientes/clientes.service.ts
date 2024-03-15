import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from './clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080';

  public recuperarClientes() {
    return this.http.get<Cliente[]>(`${this.baseUrl}/clientes`);
  }

  public adicionarCliente(cliente: Cliente) {
    return this.http.post<Cliente>(`${this.baseUrl}/clientes`, cliente);
  }
}
