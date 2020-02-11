import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WinesRoutingModule } from './wines-routing.module';
import { WineListContainerComponent } from './containers/wine-list/wine-list.component';
import { WineDetailContainerComponent } from './containers/wine-detail/wine-detail.component';
import { WineListComponent } from './components/wine-list/wine-list.component';
import { WineDetailComponent } from './components/wine-detail/wine-detail.component';
import { WineStockUpdateDialogComponent } from './components/wine-stock-update-dialog/wine-stock-update-dialog.component';

@NgModule({
    declarations: [
        WineListContainerComponent,
        WineDetailContainerComponent,
        WineListComponent,
        WineDetailComponent,
        WineStockUpdateDialogComponent,
    ],
    imports: [CommonModule, WinesRoutingModule, SharedModule],
    entryComponents: [WineStockUpdateDialogComponent],
})
export class WinesModule {}
