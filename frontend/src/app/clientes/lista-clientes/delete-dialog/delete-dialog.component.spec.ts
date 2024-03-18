import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogComponent } from './delete-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ClientesService } from '../../clientes.service';
import { EventServiceService } from '../../event-service.service';
import { of, throwError } from 'rxjs';

describe('DeleteDialogComponent', () => {
  let component: DeleteDialogComponent;
  let fixture: ComponentFixture<DeleteDialogComponent>;
  let mockDialogRef: MatDialogRef<DeleteDialogComponent>;
  let mockClientesService: jasmine.SpyObj<ClientesService>;
  let mockEventService: jasmine.SpyObj<EventServiceService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj(['close']);
    mockClientesService = jasmine.createSpyObj('ClientesService', ['deletarCliente']);
    mockEventService = jasmine.createSpyObj('EventServiceService', ['emitirAlteracaoRegistros']);
    mockToastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        MatDialogModule
      ],
      declarations: [ DeleteDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: ClientesService, useValue: mockClientesService },
        { provide: EventServiceService, useValue: mockEventService },
        { provide: ToastrService, useValue: mockToastrService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cancel the dialog', () => {
    component.cancelarDelecao();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should confirm the deletion', () => {
    const idCliente = 1;
    mockClientesService.deletarCliente.and.returnValue(of(null));
    component.id = idCliente;

    component.confirmarDelecao();

    expect(mockClientesService.deletarCliente).toHaveBeenCalledWith(idCliente);
    expect(mockDialogRef.close).toHaveBeenCalled();
    expect(mockToastrService.success).toHaveBeenCalledWith('Cliente deletado com sucesso!', '', {
      progressBar: true,
    });
    expect(mockEventService.emitirAlteracaoRegistros).toHaveBeenCalled();
  });

  it('should handle possible error', () => {
    const erro = { status: 500 };
    mockClientesService.deletarCliente.and.returnValue(throwError(erro));

    component.confirmarDelecao();

    expect(mockToastrService.error).toHaveBeenCalledWith('Erro ao deletar cliente', 'Problemas com o servidor', {
      progressBar: true,
    });
  });
});
