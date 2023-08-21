import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared.module';

import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
    { path: 'product/:id', loadComponent: () => import('./product/product.component').then(c => c.ProductComponent) },
    { path: 'shop', loadComponent: () => import('./shop/shop.component').then(c => c.ShopComponent) },
    { path: '', component: LandingComponent },
    { path: '**', redirectTo: '/' },
];

@NgModule({
    declarations: [
        LandingComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        SharedModule
    ],
})
export class PublicModule { }