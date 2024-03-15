import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../clientes';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ClientesService } from '../clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.scss']
})
export class FormClientesComponent implements OnInit {
  constructor(private clientesService: ClientesService, private router: Router,) {
    this.formGroup = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9.]+@[a-z0-9]+\\.[a-z]+(\\.[a-z]+)?$')]),
      cpf: new FormControl('', [Validators.required, Validators.pattern('^\\d{11}$')]),
      telefone: new FormControl('', [Validators.required, Validators.pattern('^\\d{10,11}$')]),
      status: new FormControl('', [Validators.required])
    });
  }
  
  ngOnInit(): void {
    this.cliente = this.clientesService.getCliente()
    if (this.cliente.id) {
      this.editando = true;
      this.formGroup.setValue({
        nome: this.cliente.nome,
        email: this.cliente.email,
        cpf: this.cliente.cpf,
        telefone: this.cliente.telefone,
        status: this.cliente.status
      });
    }
  }

  formGroup: FormGroup;
  isLoading: boolean = false;
  erro: string = '';

  cliente: Cliente = {};
  editando: boolean = false;

  get emailFormControl() {
    return this.formGroup.get('email');
  }

  get cpfFormControl() {
    return this.formGroup.get('cpf');
  }

  get telefoneFormControl() {
    return this.formGroup.get('telefone');
  }

  @ViewChild(FormGroupDirective) directiveForm: FormGroupDirective | undefined;

  salvarCliente(): void {
    this.isLoading = true;
    this.erro = '';

    this.clientesService
      .adicionarCliente(this.formGroup.value)
      .subscribe(
        () => {
          this.isLoading = false;
          alert('Cliente cadastrado com sucesso!');
          if (this.directiveForm) {
            this.directiveForm.resetForm();
          }
        },
        (error) => {
          console.error('aquii', error);
          if (error.status === 400) {
            this.erro = error.error;
          } else {
            this.erro = 'Algo deu errado.';
          }
          this.isLoading = false;
        },
      );
  }

  editarCliente(): void {
    this.isLoading = true;
    this.erro = '';

    this.clientesService
      .atualizarCliente({id: this.cliente.id, ...this.formGroup.value})
      .subscribe(
        () => {
          this.isLoading = false;
          alert('Cliente atualizado com sucesso!');
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('aquii', error);
          if (error.status === 400) {
            this.erro = error.error;
          } else {
            this.erro = 'Algo deu errado.';
          }
          this.isLoading = false;
        },
      );
  }
}
