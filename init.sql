CREATE DATABASE IF NOT EXISTS db_gerenciamento_uol;

USE db_gerenciamento_uol;

DROP TABLE IF EXISTS `clientes`;

CREATE TABLE `clientes` (
    `id` INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    telefone VARCHAR(14) NOT NULL,
    status VARCHAR(20) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `email_UNIQUE` (`email`),
    UNIQUE KEY `cpf_UNIQUE` (`cpf`)
);