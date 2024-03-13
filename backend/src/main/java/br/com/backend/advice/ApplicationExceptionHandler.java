package br.com.backend.advice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ApplicationExceptionHandler {

//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public ResponseEntity<String> handleEntradaInvalida(MethodArgumentNotValidException exception) {
//        String errorMessage = exception.getBindingResult().getFieldError().getDefaultMessage();
//        return ResponseEntity
//                .status(HttpStatus.BAD_REQUEST)
//                .body("Erro: " + errorMessage);
//    }
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleEntradaInvalida(MethodArgumentNotValidException exception) {
        Map<String, String> errorMap = new HashMap<>();
        exception.getBindingResult().getFieldErrors().forEach(erro ->
            errorMap.put("erro no campo '"+erro.getField()+"'", erro.getDefaultMessage())
        );
        return errorMap;
    }
}
