import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientesService } from '../../clientes.service';
import { EventServiceService } from '../../event-service.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private clientesService: ClientesService,
              private eventService: EventServiceService) { }

  isLoading: boolean = false;
  erro: string = '';
  nome: string = this.data.nome;
  id: number = this.data.id;

  @Output()
  alteracaoRegistros: EventEmitter<void> = new EventEmitter<void>();

  cancelarDelecao(): void {
    this.dialogRef.close();
  }

  confirmarDelecao(): void {
    this.isLoading = true;
    this.clientesService.deletarCliente(this.id)
      .subscribe(
        () => {
          this.isLoading = false;
          this.dialogRef.close();
          console.log('Cliente deletado com sucesso!');
          this.eventService.emitirAlteracaoRegistros();
        },
        (error) => {
          this.isLoading = false;
          console.error('Erro ao deletar cliente:', error);
          this.erro = 'Erro ao deletar cliente';
        }
      );
    
  }
}
