import { Component, inject, OnInit } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { CurrencyDataService as CurrencyDataService } from '../../services/exchage-data-service';
import { firstValueFrom } from 'rxjs';
import { CurrencyServiceDataMapper } from '../../common/mapper/currency-converter-mapper/currency-data-mapper';
import { CurrencyProvider, CurrencyRates } from '../../models/currency-converter/provider-mode';
import { ExchangeProvider } from '../../enums/currencty-converter/currency-exchage-provider-enum';

@Component({
  selector: 'app-currency-converter',
  imports: [SelectModule],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss'
})
export class CurrencyConverterComponent implements OnInit {

  private currencyService = inject(CurrencyDataService);

  private mapper?: CurrencyServiceDataMapper;
  public providers: CurrencyProvider[] = [];
  public currencyRates: CurrencyRates[] = [];


  async ngOnInit(): Promise<void> {
    this.GetCurrencyProviderData();
  }



  async GetCurrencyProviderData(): Promise<void> {
    try {

      let response = await firstValueFrom(this.currencyService.GetCurrencyProvidersData());

      if (response) {
        console.log(response);

        this.mapper = new CurrencyServiceDataMapper(response);

        this.providers = this.mapper?.GetProviders();
        this.currencyRates = this.mapper?.GetCurrencyRates(ExchangeProvider.Bnm)

        console.log('Datele au fost încărcate și mapate cu succes.');
      }

    } catch (error) {
      console.error('A apărut o eroare la preluarea datelor valutare:', error);
    }
  }


  public ProviderSelectedChange(): void {

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
