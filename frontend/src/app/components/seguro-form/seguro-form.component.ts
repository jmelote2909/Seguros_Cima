import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguroService, Seguro } from '../../services/seguro.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-seguro-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './seguro-form.component.html',
    styleUrls: ['./seguro-form.component.css']
})
export class SeguroFormComponent implements OnInit {
    @Input() seguroToEdit: Seguro | null = null;
    @Output() onCancel = new EventEmitter<void>();
    @Output() onSubmitSuccess = new EventEmitter<void>();

    seguroForm: FormGroup;
    pdfPreviewUrl: SafeResourceUrl | null = null;
    uploadedFileName: string | null = null;
    isUploading = false;
    isSaving = false;
    successMessage: string | null = null;

    constructor(
        private fb: FormBuilder,
        private seguroService: SeguroService,
        private sanitizer: DomSanitizer
    ) {
        this.seguroForm = this.fb.group({
            nombre: ['', Validators.required],
            precio: ['', [Validators.required, Validators.min(0)]],
            descripcion: ['', Validators.required],
            pdfUrl: ['', Validators.required],
            poliza: [''],
            tipoSeguro: [''],
            compania: [''],
            tomador: [''],
            fechaInicio: [''],
            fechaRenovacion: [''],
            totalDiario: [0],
            totalMensual: [0],
            totalAnual: [0]
        });
    }

    ngOnInit(): void {
        if (this.seguroToEdit) {
            this.seguroForm.patchValue(this.seguroToEdit);
            if (this.seguroToEdit.pdfUrl) {
                const url = this.seguroService.getFileUrl(this.seguroToEdit.pdfUrl);
                this.pdfPreviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
                this.uploadedFileName = this.seguroToEdit.pdfUrl;
            }
        }
    }

    cancel() {
        this.onCancel.emit();
    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            this.isUploading = true;
            this.seguroService.uploadPdf(file).subscribe({
                next: (filename) => {
                    this.uploadedFileName = filename;
                    const url = this.seguroService.getFileUrl(filename);
                    this.pdfPreviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
                    this.seguroForm.patchValue({ pdfUrl: filename });
                    this.isUploading = false;
                },
                error: (err) => {
                    console.error('Upload failed', err);
                    alert('Error al subir el PDF. Es posible que el archivo sea demasiado grande (Máx 10MB) o que el servidor no responda.');
                    this.isUploading = false;
                }
            });
        }
    }

    onSubmit() {
        if (this.seguroForm.valid) {
            this.isSaving = true;
            const seguroData: Seguro = this.seguroForm.value;

            const request = this.seguroToEdit
                ? this.seguroService.updateSeguro(this.seguroToEdit.id!, seguroData)
                : this.seguroService.createSeguro(seguroData);

            request.subscribe({
                next: (res) => {
                    this.isSaving = false;
                    this.successMessage = this.seguroToEdit ? 'Seguro actualizado correctamente' : 'Seguro guardado correctamente';
                    this.seguroForm.reset();
                    this.pdfPreviewUrl = null;
                    setTimeout(() => {
                        this.successMessage = null;
                        this.onSubmitSuccess.emit();
                    }, 1500);
                },
                error: (err) => {
                    console.error('Operation failed', err);
                    this.isSaving = false;
                }
            });
        }
    }
}
