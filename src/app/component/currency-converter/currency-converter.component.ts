import { Component, inject, OnInit } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { CurrencyConverterDataService as CurrencyProviderDataService } from '../../services/currency-converter-data-service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-currency-converter',
  imports: [SelectModule],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss'
})
export class CurrencyConverterComponent implements OnInit {

  private currencyService = inject(CurrencyProviderDataService);


  ngOnInit(): void {

  }



  async GetCurrencyProviderData(): Promise<void> {

    try {

      debugger;
      var data = await lastValueFrom(this.currencyService.GetCurrencyProvidersData());


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
