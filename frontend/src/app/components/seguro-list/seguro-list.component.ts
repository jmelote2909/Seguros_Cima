import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeguroService, Seguro } from '../../services/seguro.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-seguro-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './seguro-list.component.html',
    styleUrls: ['./seguro-list.component.css']
})
export class SeguroListComponent implements OnInit {
    @Output() onEdit = new EventEmitter<Seguro>();

    seguros: Seguro[] = [];
    selectedPdfUrl: SafeResourceUrl | null = null;
    selectedSeguro: Seguro | null = null;
    isLoading = true;

    constructor(
        private seguroService: SeguroService,
        private sanitizer: DomSanitizer,
        public authService: AuthService
    ) { }

    ngOnInit(): void {
        this.loadSeguros();
    }

    loadSeguros(): void {
        this.isLoading = true;
        this.seguroService.getSeguros().subscribe({
            next: (data) => {
                this.seguros = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error loading seguros', err);
                this.isLoading = false;
            }
        });
    }

    openDetail(seguro: Seguro): void {
        this.selectedSeguro = seguro;
    }

    closeDetail(): void {
        this.selectedSeguro = null;
    }

    downloadPdf(pdfUrl: string, event: Event): void {
        event.stopPropagation();
        const url = this.seguroService.getFileUrl(pdfUrl);
        const link = document.createElement('a');
        link.href = url;
        link.download = pdfUrl.split('/').pop() || 'seguro.pdf';
        link.target = '_blank';
        link.click();
    }

    viewPdf(pdfUrl: string): void {
        const url = this.seguroService.getFileUrl(pdfUrl);
        this.selectedPdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    closePdf(): void {
        this.selectedPdfUrl = null;
    }

    editSeguro(seguro: Seguro, event: Event): void {
        event.stopPropagation();
        this.onEdit.emit(seguro);
    }

    deleteSeguro(id: number | undefined, event: Event): void {
        event.stopPropagation();
        if (!id) return;

        if (confirm('¿Estás seguro de que quieres eliminar este seguro?')) {
            this.seguroService.deleteSeguro(id).subscribe({
                next: () => {
                    this.loadSeguros();
                },
                error: (err) => {
                    console.error('Error deleting seguro', err);
                    alert('Error al eliminar el seguro');
                }
            });
        }
    }

    downloadList(): void {
        if (this.seguros.length === 0) return;

        const date = new Date().toLocaleDateString('es-ES');
        const title = `LISTADO DE SEGUROS - GENERADO EL ${date}`;
        const total = this.calculateTotal();

        const headers = ['Nombre', 'Póliza', 'Tipo', 'Compañía', 'Tomador', 'Fecha Inicio', 'Fecha Renovación', 'Precio (€)'];

        const rows = this.seguros.map(s => [
            s.nombre,
            s.poliza || '',
            s.tipoSeguro || '',
            s.compania || '',
            s.tomador || '',
            s.fechaInicio || '',
            s.fechaRenovacion || '',
            s.precio.toString().replace('.', ',') // Formato decimal para Excel en español
        ].join(';'));

        const csvContent = [
            title,
            '', // Línea vacía para separar
            headers.join(';'),
            ...rows,
            '', // Línea vacía antes del total
            `;;;;;;COSTE TOTAL;${total.toString().replace('.', ',')} €`
        ].join('\n');

        // Añadir BOM para que Excel reconozca correctamente los caracteres especiales (tildes, ñ)
        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');

        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `Listado_Seguros_CIMA_${date.replace(/\//g, '-')}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    calculateTotal(): number {
        return this.seguros.reduce((acc, seguro) => acc + (seguro.precio || 0), 0);
    }
}
