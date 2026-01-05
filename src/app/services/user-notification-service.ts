import { Injectable } from "@angular/core";
import { HotToastService } from "@ngxpert/hot-toast";

@Injectable({ providedIn: 'root' })

export class UserNotificationService {

    constructor(private toast: HotToastService) { }

    public ShowToast(): void {
        // this.toast.show('Hello World!');
        // this.toast.loading('Lazyyy...');
        // this.toast.success('Yeah!!');
        // this.toast.warning('Boo!');
        // this.toast.error('Oh no!');
        // this.toast.info('Something...');

        this.toast.success('Look at my styles, and I also need more time!', {
            position: 'top-right', // Aici setezi poziția
            duration: 5000,
            style: {
                marginTop: '32px', // Adaugă spațiu deasupra acestui toast specific
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