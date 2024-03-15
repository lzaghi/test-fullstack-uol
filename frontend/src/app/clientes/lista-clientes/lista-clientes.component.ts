import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cliente } from '../clientes';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss']
})
export class ListaClientesComponent {
  constructor(private dialog: MatDialog) { }

  @Input()
  clientes: Cliente[] = [];

  @Input()
  isLoading: boolean = true;

  @Input()
  erro: string = '';

  @Output()
  alteracaoRegistros: EventEmitter<void> = new EventEmitter<void>();

  formatarCPF(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  formatarTelefone(telefone: string): string {
    return telefone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
  }

  openDeleteDialog(nome: string, id: number): void {
    this.dialog.open(DeleteDialogComponent, {
      data: { nome, id },
      height: '200px',
      width: '300px',
    });
  }
}
