import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Seguro {
  id?: number;
  nombre: string;
  precio: number;
  descripcion: string;
  pdfUrl: string;
  poliza?: string;
  tipoSeguro?: string;
  compania?: string;
  tomador?: string;
  fechaInicio?: string;
  fechaRenovacion?: string;
  totalDiario?: number;
  totalMensual?: number;
  totalAnual?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SeguroService {
  private apiUrl = 'http://localhost:8080/api/seguros';

  constructor(private http: HttpClient) { }

  getSeguros(): Observable<Seguro[]> {
    return this.http.get<Seguro[]>(this.apiUrl);
  }

  createSeguro(seguro: Seguro): Observable<Seguro> {
    return this.http.post<Seguro>(this.apiUrl, seguro);
  }

  updateSeguro(id: number, seguro: Seguro): Observable<Seguro> {
    return this.http.put<Seguro>(`${this.apiUrl}/${id}`, seguro);
  }

  deleteSeguro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadPdf(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/upload`, formData, { responseType: 'text' });
  }

  getFileUrl(path: string): string {
    const filename = path.startsWith('uploads/') ? path.replace('uploads/', '') : path;
    return `${this.apiUrl}/files/${filename}`;
  }
}
