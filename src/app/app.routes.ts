import { Routes } from '@angular/router';
import { SendEmailComponent } from './component/send-email/send-email.component';

export const routes: Routes = [

    { path: '', redirectTo: '/sendemail', pathMatch: 'full' },
    { path: 'sendemail', component: SendEmailComponent },
];
