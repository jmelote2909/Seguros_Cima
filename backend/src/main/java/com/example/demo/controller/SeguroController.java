package com.example.demo.controller;

import com.example.demo.model.Seguro;
import com.example.demo.repository.SeguroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/seguros")
@CrossOrigin(origins = "*") // For development
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

    @GetMapping
    public List<Seguro> getAllSeguros() {
        return seguroRepository.findAll();
    }

    @PostMapping
    public Seguro createSeguro(@RequestBody Seguro seguro) {
        return seguroRepository.save(seguro);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Seguro> updateSeguro(@PathVariable Long id, @RequestBody Seguro seguro) {
        return seguroRepository.findById(id)
                .map(existingSeguro -> {
                    seguro.setId(id);
                    return ResponseEntity.ok(seguroRepository.save(seguro));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeguro(@PathVariable Long id) {
        if (seguroRepository.existsById(id)) {
            seguroRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Files.copy(file.getInputStream(), this.root.resolve(filename));
            return ResponseEntity.status(HttpStatus.OK).body("uploads/" + filename);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
                    .body("Could not upload the file: " + file.getOriginalFilename() + "!");
        }
    }

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
