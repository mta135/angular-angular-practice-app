import { Routes } from '@angular/router';
import { CurrencyComponent } from './component/currency/currency.component';

export const routes: Routes = [

    { path: '', redirectTo: '/currency', pathMatch: 'full' },
    { path: 'currency', component: CurrencyComponent },
];
