import { WinesService } from './features/wines/state/wines.service';
import { NotificationService } from './shared/services/notification.service';
import { Component, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    viewportMobileQuery: MediaQueryList;

    notifications$ = this.notificationService.count;
    private _viewportQueryListener: () => void;

    constructor(
        private changeDetectionRef: ChangeDetectorRef,
        private media: MediaMatcher,
        private notificationService: NotificationService,
        private winesService: WinesService,
    ) {
        this.viewportMobileQuery = media.matchMedia('(max-width: 600px)');
        this._viewportQueryListener = () => changeDetectionRef.detectChanges();
        this.viewportMobileQuery.addEventListener(
            'change',
            this._viewportQueryListener,
        );
    }

    ngOnInit() {
        this.winesService.sync().subscribe();
    }

    resetNotifications() {
        this.notificationService.reset();
    }

    ngOnDestroy(): void {
        this.viewportMobileQuery.removeEventListener(
            'change',
            this._viewportQueryListener,
        );
    }
}
