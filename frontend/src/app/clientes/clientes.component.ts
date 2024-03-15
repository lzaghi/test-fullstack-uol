import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';
import { Cliente } from './clientes';
import { EventServiceService } from './event-service.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  constructor(private clientesService: ClientesService,
              private eventService: EventServiceService) { }

  ngOnInit(): void {
    this.recuperarClientes();
    this.eventService.alteracaoRegistros.subscribe(() => this.onAlteracaoRegistros());
  }

  isLoading: boolean = true;
  erro: string = '';
  clientes: Cliente[] = []

  recuperarClientes() {
    this.clientesService
      .recuperarClientes()
      .subscribe(
        (resposta) => {
          console.log(resposta)
          this.clientes = resposta
          this.isLoading = false
        },
        (error) => {
          console.error('aqui', error)
          this.erro = 'Algo deu errado.'
          this.isLoading = false
        }
      );
  }

  onAlteracaoRegistros(): void {
    this.recuperarClientes();
  }
}
