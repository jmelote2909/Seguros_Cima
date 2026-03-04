package com.example.demo.controller;

import com.example.demo.model.Seguro;
import com.example.demo.repository.SeguroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/seguros")
@CrossOrigin(origins = "*") // For development
@Tag(name = "Seguros", description = "Gestión de las pólizas de seguros y archivos PDF")
public class SeguroController {

    @Autowired
    private SeguroRepository seguroRepository;

    private final Path root = Paths.get("uploads");

    public SeguroController() {
        try {
            if (!Files.exists(root)) {
                Files.createDirectory(root);
            }
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }
    }

    @Operation(summary = "Obtener todos los seguros", description = "Devuelve una lista con todos los seguros registrados en la base de datos")
    @ApiResponse(responseCode = "200", description = "Lista de seguros obtenida correctamente")
    @GetMapping
    public List<Seguro> getAllSeguros() {
        return seguroRepository.findAll();
    }

    @Operation(summary = "Obtener seguro por ID", description = "Devuelve los datos de un seguro específico dado su identificador")
    @ApiResponse(responseCode = "200", description = "Seguro encontrado")
    @ApiResponse(responseCode = "404", description = "Seguro no encontrado")
    @GetMapping("/{id}")
    public ResponseEntity<Seguro> getSeguroById(
            @Parameter(description = "ID del seguro a consultar") @PathVariable Long id) {
        return seguroRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Crear nuevo seguro", description = "Guarda un nuevo registro de seguro en la base de datos")
    @ApiResponse(responseCode = "200", description = "Seguro creado exitosamente")
    @PostMapping
    public Seguro createSeguro(@RequestBody Seguro seguro) {
        return seguroRepository.save(seguro);
    }

    @Operation(summary = "Actualizar seguro existente", description = "Modifica los datos de un seguro identificado por su ID")
    @ApiResponse(responseCode = "200", description = "Seguro actualizado correctamente")
    @ApiResponse(responseCode = "404", description = "Seguro no encontrado")
    @PutMapping("/{id}")
    public ResponseEntity<Seguro> updateSeguro(
            @Parameter(description = "ID del seguro a actualizar") @PathVariable Long id, @RequestBody Seguro seguro) {
        return seguroRepository.findById(id)
                .map(existingSeguro -> {
                    seguro.setId(id);
                    return ResponseEntity.ok(seguroRepository.save(seguro));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Eliminar un seguro", description = "Borra permanentemente un seguro de la base de datos")
    @ApiResponse(responseCode = "204", description = "Seguro eliminado")
    @ApiResponse(responseCode = "404", description = "Seguro no encontrado")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeguro(
            @Parameter(description = "ID del seguro a eliminar") @PathVariable Long id) {
        if (seguroRepository.existsById(id)) {
            seguroRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(summary = "Subir archivo PDF", description = "Sube un archivo al servidor y devuelve la ruta relativa del archivo guardado")
    @ApiResponse(responseCode = "200", description = "Archivo subido correctamente")
    @ApiResponse(responseCode = "417", description = "Error en la subida del archivo")
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(
            @Parameter(description = "Archivo PDF a subir") @RequestParam("file") MultipartFile file) {
        try {
            String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Files.copy(file.getInputStream(), this.root.resolve(filename));
            return ResponseEntity.status(HttpStatus.OK).body("uploads/" + filename);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
                    .body("Could not upload the file: " + file.getOriginalFilename() + "!");
        }
    }

    @io.swagger.v3.oas.annotations.Hidden // Oculto en Swagger, solo para uso interno del frontend
    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<org.springframework.core.io.Resource> getFile(@PathVariable String filename) {
        try {
            Path file = root.resolve(filename);
            org.springframework.core.io.Resource resource = new org.springframework.core.io.UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(org.springframework.http.HttpHeaders.CONTENT_DISPOSITION,
                                "inline; filename=\"" + resource.getFilename() + "\"")
                        .contentType(org.springframework.http.MediaType.APPLICATION_PDF)
                        .body(resource);
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

}
