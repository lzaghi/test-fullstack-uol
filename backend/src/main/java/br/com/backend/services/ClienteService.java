package br.com.backend.services;

import br.com.backend.entities.ClienteEntity;
import br.com.backend.repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository clienteRepository;

    public List<ClienteEntity> buscarTodosClientes() {
        return clienteRepository.findAll();
    }
}
