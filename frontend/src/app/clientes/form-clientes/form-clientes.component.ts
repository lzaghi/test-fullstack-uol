import { Component, ViewChild } from '@angular/core';
import { Cliente } from '../clientes';
import { Form, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.scss']
})
export class FormClientesComponent {
  isLoading: boolean = false;
  erro: string = '';
  formGroup: FormGroup;

  constructor(private clientesService: ClientesService) {
    this.formGroup = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9.]+@[a-z0-9]+\\.[a-z]+(\\.[a-z]+)?$')]),
      cpf: new FormControl('', [Validators.required, Validators.pattern('^\\d{11}$')]),
      telefone: new FormControl('', [Validators.required, Validators.pattern('^\\d{10,11}$')]),
      status: new FormControl('', [Validators.required])
    });
  }

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
}
