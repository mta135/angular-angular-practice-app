import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Add this
import { providePrimeNG } from 'primeng/config'; // Add this
import Aura from '@primeng/themes/aura'; // Add this (or your preferred theme)
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { definePreset } from '@primeuix/themes';
import { provideHotToastConfig } from '@ngxpert/hot-toast';


const MyPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        formField: {
          focusBorderColor: '#8a2be2' // Culoarea bordurii la focus
        },
        focusRing: {
          color: '#8a2be2', // Culoarea inelului (aura)
          // shadow: '0 0 0 0.2rem rgba(197, 34, 156, 0.2)' // Umbra la focus
        }
      },
      dark: {
        formField: {
          focusBorderColor: '#8a2be2'
        },
        focusRing: {
          color: '#8a2be2',
          shadow: '0 0 0 0.2rem rgba(197, 34, 156, 0.2)'
        }
      }
    }
  }
});


export const appConfig: ApplicationConfig = {
  providers: [

    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHotToastConfig(),

    provideHttpClient(withFetch()),



    provideAnimationsAsync(), // Add this
    providePrimeNG({ // Add this
      theme: {
        preset: MyPreset // Folosim presetul modificat
      },
    }), provideHotToastConfig(), provideHotToastConfig(),

  ]
};
