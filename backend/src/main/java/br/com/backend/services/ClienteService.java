package br.com.backend.services;

import br.com.backend.entities.ClienteEntity;
import br.com.backend.repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository clienteRepository;

    public List<ClienteEntity> buscarTodosClientes() {
        return clienteRepository.findAll();
    }

    public Optional<ClienteEntity> buscarClientePorId(Integer id) {
        return clienteRepository.findById(id);
    }

    public ClienteEntity adicionarOuAtualizarCliente(ClienteEntity cliente) {
        return clienteRepository.save(cliente);
    }

    public void deletarCliente(Integer id) {
        clienteRepository.deleteById(id);
    }
}
