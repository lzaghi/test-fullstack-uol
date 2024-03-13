package br.com.backend.controllers;

import br.com.backend.entities.ClienteEntity;
import br.com.backend.services.ClienteService;
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
    public ResponseEntity<List<ClienteEntity>> buscarTodosClientes() {
        List<ClienteEntity> clientes = clienteService.buscarTodosClientes();
        return ResponseEntity.status(HttpStatus.OK).body(clientes);
    }

    @PostMapping
    public ResponseEntity<ClienteEntity> adicionarCliente(@Valid @RequestBody ClienteEntity cliente) {
        ClienteEntity novoCliente = clienteService.adicionarCliente(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoCliente);
    }

    @DeleteMapping
    public ResponseEntity<String> deletarCategoria(@PathParam("id") Integer id) {
        Optional<ClienteEntity> cliente = clienteService.buscarClientePorId(id);
        if (cliente.isPresent()) {
            clienteService.deletarCliente(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado");
        }

    }
}
