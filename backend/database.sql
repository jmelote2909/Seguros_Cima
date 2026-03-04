-- 1. Crear la base de datos
CREATE DATABASE IF NOT EXISTS CIMA_seguros;
USE CIMA_seguros;

-- 2. Tabla de Seguros
CREATE TABLE IF NOT EXISTS seguros (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DOUBLE NOT NULL,
    descripcion TEXT,
    pdf_url VARCHAR(255)
);

-- 3. Tabla de Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- 4. Insertar usuarios por defecto (solo si no existen)
INSERT IGNORE INTO usuarios (id, username, password, role) VALUES 
(1, 'admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgNo3XvH/N0F6.HBaEVyVDeK.Kbe', 'ADMIN'),
(2, 'cliente', '$2a$10$8.UnS3Yv6V1o1uVGDqWZyuk0S.1B.S.I1B.S.I1B.S.I1B.S1B.S.', 'CLIENTE');
