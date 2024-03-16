import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cliente } from '../clientes';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss']
})
export class ListaClientesComponent implements OnInit {
  constructor(private clientesService: ClientesService,
              private router: Router,
              private dialog: MatDialog) { }

  @Input()
  clientes: Cliente[] = [];

  @Input()
  isLoading: boolean = true;

  @Output()
  alteracaoRegistros: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
    this.clientesService.setCliente({});
  }

  formatarCPF(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  formatarTelefone(telefone: string): string {
    return telefone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
  }
  
  editarCliente(cliente: Cliente): void {
    this.clientesService.setCliente(cliente);
    this.router.navigate(['/registro'])
  }

  openDeleteDialog(nome: string, id: number): void {
    this.dialog.open(DeleteDialogComponent, {
      data: { nome, id },
      height: '200px',
      width: '300px',
    });
  }
}
