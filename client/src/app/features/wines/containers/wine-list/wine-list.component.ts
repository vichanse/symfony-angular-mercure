import { WinesService } from './../../state/wines.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Wine } from '../../state/wine.model';
import { WinesQuery } from '../../state/wines.query';
import { MatDialog } from '@angular/material/dialog';
import { WineDetailComponent } from '../../components/wine-detail/wine-detail.component';

@Component({
    selector: 'app-wine-list-container',
    templateUrl: './wine-list.component.html',
    styleUrls: ['./wine-list.component.scss'],
})
export class WineListContainerComponent implements OnInit {
    isLoading$: Observable<boolean>;
    wines$: Observable<Wine[]>;
    constructor(
        private winesService: WinesService,
        private winesQuery: WinesQuery,
        private dialog: MatDialog,
    ) {}

    ngOnInit() {
        this.isLoading$ = this.winesQuery.selectLoading();
        this.wines$ = this.winesQuery.selectAll();

        this.winesService.getAll().subscribe();
    }

    viewWineDetails(wine: Wine) {
        const dialogRef = this.dialog.open(WineDetailComponent, {
            data: wine,
            width: '75%',
        });
    }

    onStockValueChanged(wine: Wine) {
        this.winesService
            .updateWine(wine.id, { stock: Number(wine.stock) })
            .subscribe({
                error(error) {
                    this.error = error;
                },
            });
    }
}
