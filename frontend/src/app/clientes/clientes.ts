export class Cliente {
  id?: number;
  nome?: string;
  email?: string;
  cpf?: string;
  telefone?: string;
  status?: string;

  constructor(id?:number, nome?: string, email?: string, cpf?: string, telefone?: string, status?: string) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.cpf = cpf;
    this.telefone = telefone;
    this.status = status;
  }
}