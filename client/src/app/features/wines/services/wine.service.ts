import { APP_CONFIG } from './../../../app.config';
import { ID } from '@datorama/akita';
import { Injectable, NgZone } from '@angular/core';
import { SseService } from '../../../shared/services/sse.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wine } from '../state/wine.model';

@Injectable({
    providedIn: 'root',
})
export class WineService {
    API_URL = APP_CONFIG.apiWineUrl;
    constructor(
        private zone: NgZone,
        private sseService: SseService,
        private http: HttpClient,
    ) {}

    getServerSentEvent(url: string): Observable<MessageEvent> {
        console.log(url);
        return Observable.create(observer => {
            const eventSource = this.sseService.getEventSource(url);

            eventSource.onmessage = event => {
                this.zone.run(() => observer.next(event));
            };

            eventSource.onerror = error => {
                console.log(error);
                this.zone.run(() => observer.next(error));
            };
        });
    }

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
