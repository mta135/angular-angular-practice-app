import { Routes } from '@angular/router';
import { CurrencyConverterComponent } from './component/currency-converter/currency-converter-data/currency-converter.component';
import { ProviderCurrencyDetailsComponent } from './component/currency-converter/provider-currency-details/provider-currency-details.component';
import { LoginComponent } from './component/login/login.component';

export const routes: Routes = [

    // { path: '', redirectTo: '/currency-converter', pathMatch: 'full' },
    // { path: 'currency-converter', component: CurrencyConverterComponent },

    // { path: 'currency-details/:code', component: ProviderCurrencyDetailsComponent },


    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
];
