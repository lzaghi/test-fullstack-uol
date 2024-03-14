package br.com.backend.advice;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ApplicationExceptionHandler {
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleEntradaInvalida(MethodArgumentNotValidException exception) {
        Map<String, String> errorMap = new HashMap<>();
        exception.getBindingResult().getFieldErrors().forEach(erro ->
            errorMap.put("erro no campo '"+erro.getField()+"'", erro.getDefaultMessage())
        );
        return errorMap;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(DataIntegrityViolationException.class)
    public String handleEntradaRepetida(DataIntegrityViolationException exception) {
        if (exception.getMessage().contains("email_UNIQUE")) {
            return "Erro: email já cadastrado";
        } else if (exception.getMessage().contains("cpf_UNIQUE")) {
            return "Erro: CPF já cadastrado";
        } else {
            return "Erro: dados inválidos";
        }
    }
}
