import { APP_CONFIG } from './../../../app.config';
import { ID } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wine } from '../state/wine.model';

@Injectable({
    providedIn: 'root',
})
export class WinesEndpoint {
    API_URL = APP_CONFIG.apiWineUrl;
    constructor(private http: HttpClient) {}

    getAll(): Observable<Wine[]> {
        return this.http.get<Wine[]>(`${this.API_URL}`, {
            responseType: 'json',
        });
    }

    getWine(id: ID): Observable<Wine> {
        return this.http.get<Wine>(`${this.API_URL}/${id}`);
    }

    updateWine(id: ID, wine: Partial<Wine>) {
        const headers = new HttpHeaders().set(
            'Content-Type',
            'application/ld+json',
        );
        return this.http.put(`${APP_CONFIG.apiWineUrl}/${id}`, wine, {
            headers,
        });
    }
}
