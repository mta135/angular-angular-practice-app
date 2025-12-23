import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Add this
import { providePrimeNG } from 'primeng/config'; // Add this
import Aura from '@primeng/themes/aura'; // Add this (or your preferred theme)
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {
  providers: [

    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    provideHttpClient(withFetch()),



    provideAnimationsAsync(), // Add this
    providePrimeNG({ // Add this
      theme: {
        preset: Aura, // Add this (or your preferred theme)
      },
    }),

  ]
};
