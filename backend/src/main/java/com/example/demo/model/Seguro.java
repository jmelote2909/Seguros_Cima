package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import io.swagger.v3.oas.annotations.media.Schema;

@Entity
@Table(name = "seguros")
@Schema(description = "Representa una póliza de seguro en el sistema")
public class Seguro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "ID único del seguro", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;

    @Schema(description = "Nombre descriptivo del seguro", example = "Seguro Todo Riesgo Hogar")
    private String nombre;

    @Schema(description = "Importe total bruto del seguro", example = "450.50")
    private Double precio;

    @Schema(description = "Descripción detallada del seguro", example = "Seguro integral para vivienda principal con cobertura ante incendios y robos")
    private String descripcion;

    @Schema(description = "Ruta o URL del archivo PDF asociado", example = "uploads/poliza_hogar_101.pdf")
    private String pdfUrl;

    @Schema(description = "Número o referencia de la póliza", example = "CIMA-2026-0001")
    private String poliza;

    @Schema(description = "Categoría o tipo de seguro", example = "Hogar")
    private String tipoSeguro;

    @Schema(description = "Empresa aseguradora", example = "Seguros Cima S.A.")
    private String compania;

    @Schema(description = "Persona o entidad a nombre de quien está el seguro", example = "Manuel García")
    private String tomador;

    @Schema(description = "Fecha de alta o inicio de cobertura (formato ISO o descriptivo)", example = "2026-01-01")
    private String fechaInicio;

    @Schema(description = "Fecha de vencimiento o renovación", example = "2027-01-01")
    private String fechaRenovacion;

    @Schema(description = "Cálculo del coste proporcional diario", example = "1.23", accessMode = Schema.AccessMode.READ_ONLY)
    private Double totalDiario;

    @Schema(description = "Cálculo del coste proporcional mensual", example = "37.54", accessMode = Schema.AccessMode.READ_ONLY)
    private Double totalMensual;

    @Schema(description = "Cálculo del coste proporcional anual", example = "450.50", accessMode = Schema.AccessMode.READ_ONLY)
    private Double totalAnual;

    public Seguro() {
    }

    public Seguro(String nombre, Double precio, String descripcion, String pdfUrl) {
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.pdfUrl = pdfUrl;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getPdfUrl() {
        return pdfUrl;
    }

    public void setPdfUrl(String pdfUrl) {
        this.pdfUrl = pdfUrl;
    }

    public String getPoliza() {
        return poliza;
    }

    public void setPoliza(String poliza) {
        this.poliza = poliza;
    }

    public String getTipoSeguro() {
        return tipoSeguro;
    }

    public void setTipoSeguro(String tipoSeguro) {
        this.tipoSeguro = tipoSeguro;
    }

    public String getCompania() {
        return compania;
    }

    public void setCompania(String compania) {
        this.compania = compania;
    }

    public String getTomador() {
        return tomador;
    }

    public void setTomador(String tomador) {
        this.tomador = tomador;
    }

    public String getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(String fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public String getFechaRenovacion() {
        return fechaRenovacion;
    }

    public void setFechaRenovacion(String fechaRenovacion) {
        this.fechaRenovacion = fechaRenovacion;
    }

    public Double getTotalDiario() {
        return totalDiario;
    }

    public void setTotalDiario(Double totalDiario) {
        this.totalDiario = totalDiario;
    }

    public Double getTotalMensual() {
        return totalMensual;
    }

    public void setTotalMensual(Double totalMensual) {
        this.totalMensual = totalMensual;
    }

    public Double getTotalAnual() {
        return totalAnual;
    }

    public void setTotalAnual(Double totalAnual) {
        this.totalAnual = totalAnual;
    }
}
