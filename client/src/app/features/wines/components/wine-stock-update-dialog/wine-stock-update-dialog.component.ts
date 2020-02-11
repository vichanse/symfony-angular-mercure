import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-wine-stock-update-dialog',
    templateUrl: './wine-stock-update-dialog.component.html',
    styleUrls: ['./wine-stock-update-dialog.component.scss'],
})
export class WineStockUpdateDialogComponent implements OnInit {
    current: number;
    value: number;
    form: FormGroup;
    stock: number;
    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<WineStockUpdateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data,
    ) {
        this.stock = data.stock;
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            stock: [this.stock],
        });
    }

    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }
}
