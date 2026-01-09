import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { HotToastService } from "@ngxpert/hot-toast";

@Injectable({ providedIn: 'root' })

export class UserNotificationService {

    constructor(private toast: HotToastService, @Inject(PLATFORM_ID) private platformId: object) { }

    public ShowToast(): void {
        // this.toast.show('Hello World!');
        // this.toast.loading('Lazyyy...');
        // this.toast.success('Yeah!!');
        // this.toast.warning('Boo!');
        // this.toast.error('Oh no!');
        // this.toast.info('Something...');

        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        this.toast.success('Look at my styles, and I also need more time!', {
            position: 'top-right', // Aici setezi poziția
            duration: 5000,
            style: {
                marginTop: '10px', // Adaugă spațiu deasupra acestui toast specific
                border: '1px solid #713200',
                padding: '24px',        // Mărește spațiul interior
                color: '#713200',
                fontSize: '20px',       // Mărește textul
                minWidth: '400px',      // Setează o lățime minimă
                maxWidth: '600px',      // Permite extinderea
            },
            iconTheme: {
                primary: '#713200',
                secondary: '#FFFAEE',
            },
        });

    }

}