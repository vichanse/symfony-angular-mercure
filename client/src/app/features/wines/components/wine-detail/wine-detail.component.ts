import { SseService } from './../../../../shared/services/sse.service';
import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Inject,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Wine } from '../../state/wine.model';
import { WinesService } from '../../state/wines.service';
import { WinesQuery } from '../../state/wines.query';

@Component({
    selector: 'app-wine-detail',
    templateUrl: './wine-detail.component.html',
    styleUrls: ['./wine-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WineDetailComponent implements OnInit {
    wines$ = this.winesQuery.selectWine(this.wine.id);
    imageWidth = 50;
    imageMargin = 2;
    constructor(
        private winesQuery: WinesQuery,
        private winesService: WinesService,
        // MatDialogRef of this dialog component
        // gives us ref access to the dialog so we can close it and return data as necessar
        // it contains its own set of lifecycle hooks for this dialog component
        private dialogRef: MatDialogRef<WineDetailComponent>,
        // when the dialog is opened it is passed an account object
        // this injects that data so we can view the Account details
        // this is an object and can be passed multiple pieces of data
        @Inject(MAT_DIALOG_DATA) public wine: Wine,
        private sseService: SseService,
    ) {}

    ngOnInit() {
        //this.winesService.connect(this.wine.id).subscribe();

        if (this.winesQuery.hasWine(this.wine.id) === false) {
            this.winesService.getWine(this.wine.id).subscribe({
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

    getImagePath(wine: Wine): string {
        return `assets/media/${wine.image.filePath}`;
    }
}
