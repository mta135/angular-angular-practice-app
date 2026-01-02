import { Routes } from '@angular/router';
import { CurrencyConverterComponent } from './component/currency-converter/currency-converter.component';

export const routes: Routes = [

    { path: '', redirectTo: '/currency-converter', pathMatch: 'full' },
    { path: 'currency-converter', component: CurrencyConverterComponent },
];
