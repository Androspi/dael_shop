import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { registerLocaleData } from '@angular/common';

import localeCOLExtra from '@angular/common/locales/extra/es-CO';
import localeCOL from '@angular/common/locales/es-CO';

import { SharedModule } from './components/shared.module';

import { AppComponent } from './app.component';

registerLocaleData(localeCOL, 'es-CO', localeCOLExtra);

const routes: Routes = [
  { path: '', loadChildren: () => import('./components/public/public.module').then((m) => m.PublicModule), },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    SharedModule,
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'COP' },
    { provide: LOCALE_ID, useValue: 'es-CO' },
  ],
})
export class AppModule { }
