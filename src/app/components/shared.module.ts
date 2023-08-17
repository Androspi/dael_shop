import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const components: any[] = [
];

const modules = [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    FormsModule,
];

@NgModule({
    exports: [components, modules],
    declarations: [components],
    imports: [modules],
})
export class SharedModule { }
