import { Injectable } from '@angular/core';
import { QueryEntity, ID } from '@datorama/akita';
import { WinesStore, WinesState } from './wines.store';
import { RouterQuery } from '@datorama/akita-ng-router-store';

@Injectable({ providedIn: 'root' })
export class WinesQuery extends QueryEntity<WinesState> {
    constructor(protected store: WinesStore, private routerQuery: RouterQuery) {
        super(store);
    }

    hasWine(id: ID) {
        return this.hasEntity(id);
    }

    selectWine(id: ID) {
        return this.selectEntity(id);
    }
}
