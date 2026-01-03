import { Component, inject, OnInit } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { CurrencyDataService as CurrencyDataService } from '../../services/exchage-data-service';
import { firstValueFrom } from 'rxjs';
import { CurrencyServiceDataMapper } from '../../common/mapper/currency-converter-mapper/currency-data-mapper';
import { CurrencyProvider } from '../../models/currency-converter/provider-mode';

@Component({
  selector: 'app-currency-converter',
  imports: [SelectModule],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss'
})
export class CurrencyConverterComponent implements OnInit {

  private currencyService = inject(CurrencyDataService);

  public providers: CurrencyProvider[] = [];


  async ngOnInit(): Promise<void> {
    this.GetCurrencyProviderData();
  }



  async GetCurrencyProviderData(): Promise<void> {
    try {

      let response = await firstValueFrom(this.currencyService.GetCurrencyProvidersData());

      if (response) {
        console.log(response);

        let currencyServiceDateMapper: CurrencyServiceDataMapper = new CurrencyServiceDataMapper(response);
        this.providers = currencyServiceDateMapper.GetProviders();


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
