package br.com.backend.controllers;

import br.com.backend.entities.ClienteEntity;
import br.com.backend.services.ClienteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("clientes")
@CrossOrigin(origins = "http://localhost:4200")
public class ClienteController {
    @Autowired
    private ClienteService clienteService;

    @GetMapping
    @Operation(summary = "Recuperar todos os clientes", description = "Endpoint para listar o registro completo dos clientes")
    public ResponseEntity<List<ClienteEntity>> buscarTodosClientes() {
        List<ClienteEntity> clientes = clienteService.buscarTodosClientes();
        return ResponseEntity.status(HttpStatus.OK).body(clientes);
    }

    @PostMapping
    @Operation(summary = "Inserir novo cliente", description = """
            Enpoint para criar novos clientes. Necessário passar um objeto com todos os campos obrigatórios (nome, email, cpf, telefone e status).<br />
            Restrições:<br />
            - nome: string até 45 caracteres<br />
            - email: string de formato válido e até 45 caracteres<br />
            - cpf: integer de exatos 11 dígitos<br />
            - telefone: integer de 10 ou 11 dígitos (ddd + número de 8 ou 9 dígitos<br />
            - status: string 'Ativo', 'Inativo', 'Desativado' ou 'Aguardando ativação'""")
    public ResponseEntity<ClienteEntity> adicionarCliente(@Valid @RequestBody ClienteEntity cliente) {
        ClienteEntity novoCliente = clienteService.adicionarOuAtualizarCliente(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoCliente);
    }

    @PutMapping
    @Operation(summary = "Atualizar um cliente", description = """
            Enpoint para alterar um cliente. Necessário passar um objeto com todos os campos obrigatórios (id, nome, email, cpf, telefone e status).<br />
            Restrições:<br />
            - id: integer existente no banco de dados<br />
            - nome: string até 45 caracteres<br />
            - email: string de formato válido e até 45 caracteres<br />
            - cpf: integer de exatos 11 dígitos<br />
            - telefone: integer de 10 ou 11 dígitos (ddd + número de 8 ou 9 dígitos<br />
            - status: string 'Ativo', 'Inativo', 'Desativado' ou 'Aguardando ativação'""")
    public ResponseEntity<Object> atualizarCliente(@Valid @RequestBody ClienteEntity cliente) {
        Integer idCliente = cliente.getId();
        if (idCliente == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("campo 'id' é obrigatório");
        } else {
            Optional<ClienteEntity> optionalCliente = clienteService.buscarClientePorId(idCliente);
            if (optionalCliente.isPresent()) {
                ClienteEntity clienteAtualizado= clienteService.adicionarOuAtualizarCliente(cliente);
                return ResponseEntity.status(HttpStatus.OK).body(clienteAtualizado);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado");
            }
        }
    }

    @DeleteMapping
    @Operation(summary = "Deletar um cliente", description = """
            Enpoint para remover um cliente dos registros. Necessário passar um id válido via query""")
    public ResponseEntity<String> deletarCliente(@PathParam("id") Integer id) {
        Optional<ClienteEntity> cliente = clienteService.buscarClientePorId(id);
        if (cliente.isPresent()) {
            clienteService.deletarCliente(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado");
        }
    }
}
