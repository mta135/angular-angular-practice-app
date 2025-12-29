
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})

export class Session {

    private platformId = inject(PLATFORM_ID);

    public SetItem(key: string, value: string): void {

        if (isPlatformBrowser(this.platformId)) {
            sessionStorage.setItem(key, value);
        }
    }

    public GetItem(key: string): string | null {

        if (isPlatformBrowser(this.platformId)) {
            return sessionStorage.getItem(key);
        }
        return null;
    }

    public static Clear(): void {
        sessionStorage.clear();
    }
}