import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientesService } from '../../clientes.service';
import { EventServiceService } from '../../event-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private clientesService: ClientesService,
              private eventService: EventServiceService,
              private toastr: ToastrService) { }

  isLoading: boolean = false;
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
          this.toastr.success('Cliente deletado com sucesso!', '', {
            progressBar: true,
          });
          this.eventService.emitirAlteracaoRegistros();
        },
        (_error) => {
          this.isLoading = false;
          this.toastr.error('Erro ao deletar cliente', 'Problemas com o servidor', {
            progressBar: true,
          });
        }
      );
    
  }
}
