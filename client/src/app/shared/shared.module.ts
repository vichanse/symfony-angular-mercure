import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [],
    imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
    exports: [MaterialModule, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}
