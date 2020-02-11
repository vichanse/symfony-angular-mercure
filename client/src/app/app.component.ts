import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { WineService } from './features/wines/services/wine.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
    viewportMobileQuery: MediaQueryList;

    private _viewportQueryListener: () => void;

    constructor(
        private changeDetectionRef: ChangeDetectorRef,
        private media: MediaMatcher,
        private wineService: WineService,
    ) {
        this.viewportMobileQuery = media.matchMedia('(max-width: 600px)');
        this._viewportQueryListener = () => changeDetectionRef.detectChanges();
        this.viewportMobileQuery.addEventListener(
            'change',
            this._viewportQueryListener,
        );
    }

    ngOnDestroy(): void {
        this.viewportMobileQuery.removeEventListener(
            'change',
            this._viewportQueryListener,
        );
    }
}
