import { ID } from '@datorama/akita';
import { Injectable, NgZone } from '@angular/core';
import { SseService } from '../../../shared/services/sse.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wine } from '../state/wine.model';
import { tap } from 'rxjs/operators';
import { APP_CONFIG } from '../../../app.config';

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
        return Observable.create(observer => {
            const eventSource = this.sseService.getEventSource(url);

            eventSource.onmessage = event => {
                this.zone.run(() => observer.next(event));
            };
        });
    }

    getAll(): Observable<Wine[]> {
        return this.http.get<Wine[]>(`${this.API_URL}`);
    }

    getWine(id: ID): Observable<Wine> {
        return this.http.get<Wine>(`${this.API_URL}/${id}`);
    }
}
