import { Injectable } from '@angular/core';
import { Wine } from './wine.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface WinesState extends EntityState<Wine> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'wines' })
export class WinesStore extends EntityStore<WinesState> {

  constructor() {
    super();
  }

}

