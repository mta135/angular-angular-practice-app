import { Component, inject, OnInit } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { CurrencyDataService as CurrencyDataService } from '../../services/currency-data-service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-currency-converter',
  imports: [SelectModule],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss'
})
export class CurrencyConverterComponent implements OnInit {

  private currencyService = inject(CurrencyDataService);


  async ngOnInit(): Promise<void> {
    this.GetCurrencyProviderData();
  }



  async GetCurrencyProviderData(): Promise<void> {

    try {

      debugger;
      this.currencyService.GetCurrencyProvidersData().subscribe((response) => {
        console.log(response);
      });




      console.log('Date încărcate asincron cu succes!');
    }
    catch (error) {
      console.error('Eroare la încărcarea datelor:', error);
    }
  }



  public LeftSelectedOnChange(): void {

  }


  public RightSelectedOnChange(): void {

  }

  public LeftInputTextBoxEvent(): void {

  }

  public RightInputTextBoxEvent(): void {

  }

}
