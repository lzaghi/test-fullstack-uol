import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesComponent } from './clientes.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ClientesService } from './clientes.service';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EventServiceService } from './event-service.service';
import { of, throwError } from 'rxjs';

describe('ClientesComponent', () => {
  let component: ClientesComponent;
  let fixture: ComponentFixture<ClientesComponent>;
  let mockClientesService: jasmine.SpyObj<ClientesService>;
  let mockEventService: jasmine.SpyObj<EventServiceService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;
  
  beforeEach(async () => {
    mockClientesService = jasmine.createSpyObj('ClientesService', {
      recuperarClientes: of([]),
      setCliente: of({})
    });
    mockToastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    mockEventService = jasmine.createSpyObj('EventServiceService', ['emitirAlteracaoRegistros']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        MatDialogModule,
        MatProgressSpinnerModule
      ],
      declarations: [ ClientesComponent, ListaClientesComponent ],
      providers: [
        { provide: ClientesService, useValue: mockClientesService },
        // { provide: EventServiceService, useValue: mockEventService },
        { provide: ToastrService, useValue: mockToastrService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render clientes', () => {
    const cliente1 = { id: 1, nome: 'Teste1', email: 'teste1@teste.com', cpf: '12345678900', telefone: '0012345678', status: 'Ativo' };
    const cliente2 = { id: 2, nome: 'Teste2', email: 'teste2@teste.com', cpf: '12345678999', telefone: '9912345678', status: 'Ativo' };
    const listaClientes =[cliente1, cliente2]

    mockClientesService.recuperarClientes.and.returnValue(of(listaClientes));

    fixture.detectChanges();

    component.recuperarClientes();
    expect(component.clientes).toEqual(listaClientes);
  });

  it('should handle possible error', () => {
    mockClientesService.recuperarClientes.and.returnValue(throwError('Erro ao recuperar clientes'));

    component.recuperarClientes();
    
    expect(mockToastrService.error).toHaveBeenCalledWith('Erro ao recuperar clientes', 'Problemas com o servidor', { progressBar: true });
  });
});
