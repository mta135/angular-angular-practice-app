import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Add this
import { providePrimeNG } from 'primeng/config'; // Add this
import Aura from '@primeng/themes/aura'; // Add this (or your preferred theme)


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideClientHydration(withEventReplay()),

  provideAnimationsAsync(), // Add this
  providePrimeNG({ // Add this
    theme: {
      preset: Aura, // Add this (or your preferred theme)
    },
  }),


  ]
};
