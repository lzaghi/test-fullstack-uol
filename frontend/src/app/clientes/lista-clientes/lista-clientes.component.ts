import { Component, Input } from '@angular/core';
import { Cliente } from '../clientes';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss']
})
export class ListaClientesComponent {
  @Input()
  clientes: Cliente[] = [];

  @Input()
  isLoading: boolean = true;
}
