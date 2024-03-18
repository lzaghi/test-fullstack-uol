import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaClientesComponent } from './lista-clientes.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClientesService } from '../clientes.service';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

describe('ListaClientesComponent', () => {
  let component: ListaClientesComponent;
  let fixture: ComponentFixture<ListaClientesComponent>;
  let mockClientesService: jasmine.SpyObj<ClientesService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockClientesService = jasmine.createSpyObj('ClientesService', ['setCliente']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatProgressSpinnerModule
      ],
      declarations: [ ListaClientesComponent ],
      providers: [
        { provide: ClientesService, useValue: mockClientesService },
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog, useValue: mockMatDialog }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format CPF', () => {
    const cpf = '12345678900';
    const cpfFormatado = component.formatarCPF(cpf);
    expect(cpfFormatado).toBe('123.456.789-00');
  });

  it('should format phone', () => {
    const telefone = '0012345678';
    const telefoneFormatado = component.formatarTelefone(telefone);
    expect(telefoneFormatado).toBe('(00) 1234-5678');
  });

  it('should set client and navigate to /registro on editarCliente', () => {
    const cliente = { id: 1, nome: 'Teste', email: 'teste@teste.com', cpf: '12345678900', telefone: '0012345678', status: 'Ativo' };
    component.editarCliente(cliente);
    expect(mockClientesService.setCliente).toHaveBeenCalledWith(cliente);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/registro']);
  });

  it('should open delete dialog', () => {
    const nome = 'Teste';
    const id = 1;
    component.openDeleteDialog(nome, id);
    expect(mockMatDialog.open).toHaveBeenCalledWith(DeleteDialogComponent, {
      data: { nome, id }
    });
  });
});
