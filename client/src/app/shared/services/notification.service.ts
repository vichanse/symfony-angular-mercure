import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private _count: BehaviorSubject<number> = new BehaviorSubject(0);
    constructor() {}

    get count() {
        return this._count.asObservable();
    }

    add() {
        const count = this._count.getValue();
        this._count.next(count + 1);
    }

    reset() {
        this._count.next(0);
    }
}
