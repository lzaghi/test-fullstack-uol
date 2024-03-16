import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';
import { Cliente } from './clientes';
import { EventServiceService } from './event-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  constructor(private clientesService: ClientesService,
              private eventService: EventServiceService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.recuperarClientes();
    this.eventService.alteracaoRegistros.subscribe(() => this.onAlteracaoRegistros());
  }

  isLoading: boolean = true;
  clientes: Cliente[] = []

  recuperarClientes() {
    this.clientesService
      .recuperarClientes()
      .subscribe(
        (resposta) => {
          this.clientes = resposta
          this.isLoading = false
        },
        (_error) => {
          this.isLoading = false
          this.toastr.error('Erro ao recuperar clientes', 'Problemas com o servidor', {
            progressBar: true,
          });
        }
      );
  }

  onAlteracaoRegistros(): void {
    this.recuperarClientes();
  }
}
