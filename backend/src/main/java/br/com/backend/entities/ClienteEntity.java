package br.com.backend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "clientes")
public class ClienteEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nome")
    @NotNull(message = "campo 'nome' é obrigatório")
    private String nome;

    @Column(name = "email")
    @NotNull(message = "campo 'email' é obrigatório")
    @Email(regexp = "^[a-z0-9.]+@[a-z0-9]+\\.[a-z]+(\\.[a-z]+)?$", message = "formato de email inválido")
    private String email;

    @Column(name = "cpf")
    @NotNull(message = "campo 'cpf' é obrigatório")
    @Pattern(regexp = "^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$", message = "formato de CPF inválido")
    private String cpf;

    @Column(name = "telefone")
    @NotNull(message = "campo 'telefone' é obrigatório")
    @Pattern(regexp = "^\\(\\d{2}\\)\\d{4,5}-\\d{4}$", message = "formato de telefone inválido")
    private String telefone;

    @Column(name = "status")
    @NotNull(message = "campo 'status' é obrigatório")
    @Pattern(regexp = "^(Ativo|Inativo|Aguardando ativação|Desativado)$", message = "valor de status inválido")
    private String status;
}
