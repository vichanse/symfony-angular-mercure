import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Inject,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Wine } from '../../state/wine.model';
import { WineService } from '../../services/wine.service';
import { WinesService } from '../../state/wines.service';
import { WinesQuery } from '../../state/wines.query';
import { APP_CONFIG } from '../../../../app.config';

@Component({
    selector: 'app-wine-detail',
    templateUrl: './wine-detail.component.html',
    styleUrls: ['./wine-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WineDetailComponent implements OnInit {
    wines$ = this.winesQuery.selectWine(this.wine.id);
    constructor(
        private winesQuery: WinesQuery,
        private wineService: WineService,
        private wineStoreService: WinesService,
        // MatDialogRef of this dialog component
        // gives us ref access to the dialog so we can close it and return data as necessar
        // it contains its own set of lifecycle hooks for this dialog component
        private dialogRef: MatDialogRef<WineDetailComponent>,
        // when the dialog is opened it is passed an account object
        // this injects that data so we can view the Account details
        // this is an object and can be passed multiple pieces of data
        @Inject(MAT_DIALOG_DATA) public wine: Wine,
    ) {}

    ngOnInit() {
        const url = new URL(APP_CONFIG.merculeHubUrl);
        url.searchParams.append(
            'topic',
            `${APP_CONFIG.apiWineUrl}/${this.wine.id}`,
        );

        this.wineService.getServerSentEvent(`${url}`).subscribe(
            event => {
                const data = JSON.parse(event.data);
                const stock = data.stock;

                this.wineStoreService.updateWineStore(data.id, { stock });
            },
            error => console.log(error),
        );

        if (this.winesQuery.hasWine(this.wine.id) === false) {
            this.wineStoreService.getWine(this.wine.id).subscribe({
                error() {
                    // show error
                },
            });
        }
    }

    onCloseClick() {
        // close the dialog
        // if you need to pass data back to the calling component,
        // you pass it to the close method
        this.dialogRef.close();
    }
}
