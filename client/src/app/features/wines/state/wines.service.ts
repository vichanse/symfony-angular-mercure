import { NotificationService } from './../../../shared/services/notification.service';
import { SseService } from './../../../shared/services/sse.service';
import { WinesEndpoint } from './../services/wines.endpoint';
import { Injectable } from '@angular/core';
import { WinesStore, WinesState } from './wines.store';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { runStoreAction, StoreActions } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { ID } from '@datorama/akita';
import { Wine } from './wine.model';
import { APP_CONFIG } from '../../../app.config';

@Injectable({ providedIn: 'root' })
export class WinesService extends NgEntityService<WinesState> {
    constructor(
        protected store: WinesStore,
        private endPoint: WinesEndpoint,
        private sseService: SseService,
        private notificationService: NotificationService,
    ) {
        super(store);
    }

    getAll() {
        return this.endPoint
            .getAll()
            .pipe(tap(wines => this.store.set(wines['hydra:member'])));
    }

    getWine(id: ID) {
        return this.endPoint
            .getWine(id)
            .pipe(tap(wine => this.store.upsert(id, wine)));
    }

    updateWine(id: ID, wine: Partial<Wine>) {
        return this.endPoint
            .updateWine(id, wine)
            .pipe(tap(() => this.store.update(id, wine)));
    }

    updateWineStore(id: ID, wine: Partial<Wine>) {
        this.store.update(id, wine);
    }

    sync() {
        const url = new URL(APP_CONFIG.merculeHubUrl);
        url.searchParams.append('topic', `${APP_CONFIG.apiWineUrl}/{id}`);

        return this.sseService.getServerSentEvent(`${url}`).pipe(
            tap(event => {
                const data = JSON.parse(event.data);
                const stock = data.stock;
                this.notificationService.add();
                runStoreAction('wines', StoreActions.UpdateEntities, {
                    payload: {
                        data: { stock },
                        entityIds: data.id,
                    },
                });
            }),
        );
    }
}
