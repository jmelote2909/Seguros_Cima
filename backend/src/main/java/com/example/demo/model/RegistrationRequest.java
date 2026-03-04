package com.example.demo.model;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Solicitud de registro de nuevo usuario")
public class RegistrationRequest {

    @Schema(description = "Nombre de usuario deseado", example = "nuevoUser")
    private String username;

    @Schema(description = "Contraseña en texto plano (será encriptada automáticamente)", example = "123456")
    private String password;

    public RegistrationRequest() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
