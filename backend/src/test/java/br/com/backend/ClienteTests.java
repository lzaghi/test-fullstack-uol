package br.com.backend;

import br.com.backend.entities.ClienteEntity;
import br.com.backend.services.ClienteService;
import com.google.gson.Gson;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.mockito.Mockito.reset;
import static org.mockito.Mockito.when;

@SpringBootTest
@AutoConfigureMockMvc
public class ClienteTests {
    @Autowired
    MockMvc mockMvc;

    @Test
    public void testeBuscarClientes() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.get("/clientes")
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testeAdicionarCliente() throws Exception {
        ClienteEntity cliente = new ClienteEntity();
        cliente.setNome("Teste");
        cliente.setEmail("teste@email.com");
        cliente.setCpf("00011122233");
        cliente.setTelefone("0099998888");
        cliente.setStatus("Ativo");

        String conteudoCliente = new Gson().toJson(cliente);
        mockMvc.perform(
                MockMvcRequestBuilders.post("/clientes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(conteudoCliente)
        ).andExpect(
                MockMvcResultMatchers.status().is2xxSuccessful()
        );
    }

    @Test
    public void testeAdicionarClienteComCampoVazio() throws Exception {
        ClienteEntity cliente1 = new ClienteEntity();
        cliente1.setNome("");
        cliente1.setEmail("fulano@email.com");
        cliente1.setCpf("00011122233");
        cliente1.setTelefone("0088887777");
        cliente1.setStatus("Ativo");

        String conteudoCliente = new Gson().toJson(cliente1);
        mockMvc.perform(
                MockMvcRequestBuilders.post("/clientes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(conteudoCliente)
        ).andExpect(
                MockMvcResultMatchers.status().is4xxClientError()
        );
    }

    @Test
    public void testeAdicionarClienteComCampoInvalido() throws Exception {
        ClienteEntity cliente1 = new ClienteEntity();
        cliente1.setNome("Fulanoooooooooooooooooooooooooooooooooooooooo");
        cliente1.setEmail("fulano@email.commmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
        cliente1.setCpf("00011122233");
        cliente1.setTelefone("0088887777");
        cliente1.setStatus("Ativo");

        String conteudoCliente = new Gson().toJson(cliente1);
        mockMvc.perform(
                MockMvcRequestBuilders.post("/clientes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(conteudoCliente)
        ).andExpect(
                MockMvcResultMatchers.status().is4xxClientError()
        );
    }

    @Test
    public void testeAtualizarClienteSemId() throws Exception {
        ClienteEntity cliente1 = new ClienteEntity();
        cliente1.setNome("Fulano");
        cliente1.setEmail("fulano@email.com");
        cliente1.setCpf("00011122233");
        cliente1.setTelefone("0088887777");
        cliente1.setStatus("Ativo");

        String conteudoCliente = new Gson().toJson(cliente1);
        mockMvc.perform(
                MockMvcRequestBuilders.put("/clientes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(conteudoCliente)
        ).andExpect(
                MockMvcResultMatchers.status().is4xxClientError()
        );
    }

    @Test
    public void testeAtualizarClienteComIdInexistente() throws Exception {
        ClienteEntity cliente1 = new ClienteEntity();
        cliente1.setId(100);
        cliente1.setNome("Fulano");
        cliente1.setEmail("fulano@email.com");
        cliente1.setCpf("00011122233");
        cliente1.setTelefone("0088887777");
        cliente1.setStatus("Ativo");

        String conteudoCliente = new Gson().toJson(cliente1);
        mockMvc.perform(
                MockMvcRequestBuilders.put("/clientes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(conteudoCliente)
        ).andExpect(
                MockMvcResultMatchers.status().is4xxClientError()
        );
    }

    @Test
    public void testeDeletarClienteComIdInexistente() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.delete("/clientes?id=100")
        ).andExpect(
                MockMvcResultMatchers.status().is4xxClientError()
        );
    }
}
