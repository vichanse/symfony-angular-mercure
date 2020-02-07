import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WineListContainerComponent } from './containers/wine-list/wine-list.component';

const routes: Routes = [{ path: '', component: WineListContainerComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WinesRoutingModule {}
