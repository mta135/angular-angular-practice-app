import { Routes } from '@angular/router';
import { SendEmailComponent } from './component/send-email/send-email.component';
import { HomeComponent } from './component/home/home.component';
import { InputComponent } from './component/input/input.component';

export const routes: Routes = [

    { path: '', redirectTo: '/sendemail', pathMatch: 'full' },
    { path: 'sendemail', component: SendEmailComponent },
];
