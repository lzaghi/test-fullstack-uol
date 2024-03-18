import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormClientesComponent } from './form-clientes.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientesService } from '../clientes.service';
import { of, throwError } from 'rxjs';

describe('FormClientesComponent', () => {
  let component: FormClientesComponent;
  let fixture: ComponentFixture<FormClientesComponent>;
  let mockClientesService: jasmine.SpyObj<ClientesService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    mockClientesService = jasmine.createSpyObj('ClientesService', {
      getCliente: { id: 1, nome: 'Teste', email: 'teste@teste.com', cpf: '12345678900', telefone: '0012345678', status: 'Ativo' },
      adicionarCliente: of({}),
      atualizarCliente: of({})
    });
    mockToastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      declarations: [ FormClientesComponent ],
      providers: [
        { provide: ClientesService, useValue: mockClientesService },
        { provide: ToastrService, useValue: mockToastrService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add cliente', () => {
    const novoCliente = { nome: 'Teste', email: 'teste@teste.com', cpf: '12345678900', telefone: '0012345678', status: 'Ativo' };
    component.formGroup.setValue(novoCliente);

    mockClientesService.adicionarCliente.and.returnValue(of(novoCliente));
    component.salvarCliente();

    expect(mockToastrService.success).toHaveBeenCalledWith('Cliente cadastrado com sucesso!', '', { progressBar: true });
  });

  it('should handle invalid insert data error', () => {
    const novoCliente = { nome: 'Teste', email: 'teste@teste.com', cpf: '12345678900', telefone: '0012345678', status: 'Ativo' };
    component.formGroup.setValue(novoCliente);

    const errorResponse = { status: 400, error: 'Erro: CPF já cadastrado' };

    mockClientesService.adicionarCliente.and.returnValue(throwError(errorResponse));
    component.salvarCliente();

    expect(mockToastrService.error).toHaveBeenCalledWith('Erro: CPF já cadastrado', '', { progressBar: true });
  });

  it('should handle internal insert error', () => {
    const novoCliente = { nome: 'Teste', email: 'teste@teste.com', cpf: '12345678900', telefone: '0012345678', status: 'Ativo' };
    component.formGroup.setValue(novoCliente);

    const errorResponse = { status: 500, error: '' };

    mockClientesService.adicionarCliente.and.returnValue(throwError(errorResponse));
    component.salvarCliente();

    expect(mockToastrService.error).toHaveBeenCalledWith('Erro ao cadastrar cliente', 'Problemas com o servidor', { progressBar: true });
  });

  it('should present filled form when cliente is set', async () => {
    const clienteSemId = { nome: 'Teste', email: 'teste@teste.com', cpf: '12345678900', telefone: '0012345678', status: 'Ativo' }
    const cliente = { id: 1, ...clienteSemId };

    mockClientesService.getCliente.and.returnValue(cliente);
    
    fixture.detectChanges();

    expect(component.editando).toBe(true);
    expect(component.formGroup.value).toEqual(clienteSemId);
  });

  it('should update cliente', () => {
    const cliente = { id: 1, nome: 'Teste', email: 'teste@teste.com', cpf: '12345678900', telefone: '0012345678', status: 'Ativo' }

    mockClientesService.atualizarCliente.and.returnValue(of(cliente));
    component.editarCliente();

    expect(mockToastrService.success).toHaveBeenCalledWith('Cliente atualizado com sucesso!', '', { progressBar: true });
  });

  it('should handle invalid update data error', () => {
    const errorResponse = { status: 400, error: 'Erro: CPF já cadastrado' };

    mockClientesService.atualizarCliente.and.returnValue(throwError(errorResponse));
    component.editarCliente();

    expect(mockToastrService.error).toHaveBeenCalledWith('Erro: CPF já cadastrado', '', { progressBar: true });
  });

  it('should handle internal update error', () => {
    const errorResponse = { status: 500, error: '' };

    mockClientesService.atualizarCliente.and.returnValue(throwError(errorResponse));
    component.editarCliente();

    expect(mockToastrService.error).toHaveBeenCalledWith('Erro ao atualizar cliente', 'Problemas com o servidor', { progressBar: true });
  });
});
