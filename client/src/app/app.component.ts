import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
    viewportMobileQuery: MediaQueryList;

    private _viewportQueryListener: () => void;

    constructor(
        private changeDetectionRef: ChangeDetectorRef,
        private media: MediaMatcher
    ) {
        this.viewportMobileQuery = media.matchMedia('(max-width: 600px)');
        this._viewportQueryListener = () => changeDetectionRef.detectChanges();
        this.viewportMobileQuery.addEventListener(
            'change',
            this._viewportQueryListener
        );
    }

    ngOnDestroy(): void {
        this.viewportMobileQuery.removeEventListener(
            'change',
            this._viewportQueryListener
        );
    }

    /*ngOnInit() {
        const url = new URL(`http://localhost:3000/.well-known/mercure`);
        url.searchParams.append('topic', `http://localhost:8000/api/wines/1`);
        this.bookService.getServerSentEvent(`${url}`).subscribe(event => {
            const data = event.data;
            this.wine.stock = data.stock;
        });

        this.bookService
            .getWine(1)
            .pipe()
            .subscribe(wine => (this.wine = wine));
    }*/
}
