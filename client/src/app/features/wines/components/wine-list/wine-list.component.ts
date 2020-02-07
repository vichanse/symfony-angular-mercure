import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { Wine } from '../../state/wine.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-wine-list',
    templateUrl: './wine-list.component.html',
    styleUrls: ['./wine-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WineListComponent implements OnInit {
    imageWidth = 50;
    imageMargin = 2;
    private _winesDataSource: MatTableDataSource<Wine> = new MatTableDataSource<
        Wine
    >();
    @Input()
    set wines(wines: Wine[]) {
        if (!this.isNullOrUndefined(wines)) {
            this.winesDataSource.data = wines;
        }
    }

    get winesDataSource(): MatTableDataSource<Wine> {
        return this._winesDataSource;
    }

    get columns(): string[] {
        return ['image', 'name', 'price', 'info'];
    }

    @Output()
    viewWineDetails: EventEmitter<Wine> = new EventEmitter<Wine>();
    constructor() {}

    ngOnInit() {}

    // adds tracking for the data source for faster filtering, and sorting
    trackByFn(wine: Wine) {
        return wine.id;
    }
    onViewWineDetails(wine: Wine) {
        this.viewWineDetails.emit(wine);
    }

    isNullOrUndefined(value): boolean {
        return null === value || undefined === value;
    }

    getImagePath(wine: Wine): string {
        return `assets/media/${wine.image.filePath}`;
    }
}
