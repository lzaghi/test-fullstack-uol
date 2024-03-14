import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';
import { Cliente } from './clientes';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  constructor(private clientesService: ClientesService) { }

  ngOnInit(): void {
    this.recuperarClientes();
  }

  isLoading = true;
  clientes: Cliente[] = []

  recuperarClientes() {
    this.clientesService
      .recuperarClientes()
      .subscribe(
        (resposta) => {
          console.log(resposta)
          this.clientes = resposta
        },
        (error) => console.error(error),
        () => this.isLoading = false
      );
  }
}
