import { Component, inject, OnInit } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { CurrencyDataService as CurrencyDataService } from '../../services/exchage-data-service';
import { firstValueFrom } from 'rxjs';
import { CurrencyServiceDataMapper } from '../../common/mapper/currency-converter-mapper/currency-data-mapper';
import { CurrencyProvider, CurrencyRates } from '../../models/currency-converter/provider-mode';
import { ExchangeProvider } from '../../enums/currencty-converter/currency-exchage-provider-enum';
import { ExchangeDataViewMode } from '../../models/currency-converter/exchange-data-view-model';
import { FormsModule } from '@angular/forms';
import { debug } from 'console';

@Component({
  selector: 'app-currency-converter',
  imports: [SelectModule, FormsModule],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss'
})
export class CurrencyConverterComponent implements OnInit {

  private currencyService = inject(CurrencyDataService);

  private mapper?: CurrencyServiceDataMapper;

  public viewModel: ExchangeDataViewMode = new ExchangeDataViewMode();


  async ngOnInit(): Promise<void> {
    this.GetCurrencyProviderData();
  }

  async GetCurrencyProviderData(): Promise<void> {
    try {

      let response = await firstValueFrom(this.currencyService.GetCurrencyProvidersData());

      if (response) {
        console.log(response);

        let mapper = new CurrencyServiceDataMapper(response);
        this.mapper = mapper;

        this.viewModel.Providers = mapper.GetProviders();

        this.viewModel.SelectedProvider = mapper.GetSelectedProvider(ExchangeProvider.Bnm);
        this.viewModel.CurrencyRates = mapper.GetCurrencyRates(ExchangeProvider.Bnm);

        console.log('Datele au fost încărcate și mapate cu succes.');
      }
      else {
        // error handler
      }

    } catch (error) {
      console.error('A apărut o eroare la preluarea datelor valutare:', error);
    }
  }


  public SelectedProviderOnChange(): void {

    const bankCode = this.viewModel.SelectedProvider?.code;

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
