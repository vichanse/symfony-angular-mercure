import { WineService } from './../services/wine.service';
import { Injectable } from '@angular/core';
import { WinesStore, WinesState } from './wines.store';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { tap } from 'rxjs/operators';
import { ID } from '@datorama/akita';
import { Wine } from './wine.model';

@Injectable({ providedIn: 'root' })
export class WinesService extends NgEntityService<WinesState> {
    constructor(protected store: WinesStore, private wineService: WineService) {
        super(store);
    }

    getAll() {
        return this.wineService
            .getAll()
            .pipe(tap(wines => this.store.set(wines)));
    }

    getWine(id: ID) {
        return this.wineService
            .getWine(id)
            .pipe(tap(wine => this.store.upsert(id, wine)));
    }

    updateWine(id: ID, wine: Partial<Wine>) {
        this.store.update(id, wine);
    }
}
