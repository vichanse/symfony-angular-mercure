import { WineStockUpdateDialogComponent } from './../wine-stock-update-dialog/wine-stock-update-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
        return ['image', 'name', 'price', 'info', 'edit'];
    }

    @Output()
    viewWineDetails: EventEmitter<Wine> = new EventEmitter<Wine>();
    @Output()
    stockValueChanged: EventEmitter<Wine> = new EventEmitter<Wine>();
    constructor(private dialog: MatDialog) {}

    ngOnInit() {}

    // adds tracking for the data source for faster filtering, and sorting
    trackByFn(wine: Wine) {
        return wine.id;
    }
    onViewWineDetails(wine: Wine) {
        this.viewWineDetails.emit(wine);
    }

    onStockEdit(wine: Wine) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            stock: wine.stock,
        };

        const dialogRef = this.dialog.open(
            WineStockUpdateDialogComponent,
            dialogConfig,
        );

        dialogRef.afterClosed().subscribe(data => {
            if (!this.isNullOrUndefined(data)) {
                this.onStockValueChanged({ ...wine, stock: data.stock });
            }
        });
    }

    onStockValueChanged(wine: Wine) {
        this.stockValueChanged.emit(wine);
    }

    isNullOrUndefined(value): boolean {
        return null === value || undefined === value;
    }

    getImagePath(wine: Wine): string {
        return `assets/media/${wine.image.filePath}`;
    }
}
