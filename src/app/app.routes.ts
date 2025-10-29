import { Routes } from '@angular/router';
import { SendEmailComponent } from './component/send-email/send-email.component';
import { HomeComponent } from './component/home/home.component';
import { InputComponent } from './component/input/input.component';

export const routes: Routes = [

    { path: '', redirectTo: '/home', pathMatch: 'full' },

    { path: 'home', component: HomeComponent },
    { path: 'input', component: InputComponent },
    { path: 'send-email', component: SendEmailComponent },
];
