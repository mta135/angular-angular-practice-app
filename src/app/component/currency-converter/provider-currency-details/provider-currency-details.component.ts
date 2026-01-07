import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CurrencyDataService } from '../../../services/exchage-data-service';
import { firstValueFrom } from 'rxjs';
import { CurrencyServiceDataMapper } from '../../../common/mapper/currency-converter-mapper/currency-data-mapper';
import { ExchangeDataViewMode } from '../../../models/currency-converter/exchange-data-view-model';
import { TableModule } from 'primeng/table';
import { CurrencyRates } from '../../../models/currency-converter/provider-mode';



@Component({
  selector: 'app-provider-currency-details',
  standalone: true,
  imports: [TableModule],
  templateUrl: './provider-currency-details.component.html',
  styleUrl: './provider-currency-details.component.scss'
})
export class ProviderCurrencyDetailsComponent {

  public selectedProviderCode: string | null = null;

  private currencyService = inject(CurrencyDataService);

  private mapper?: CurrencyServiceDataMapper;
  public viewModel: ExchangeDataViewMode = new ExchangeDataViewMode();

  public currencyRates: CurrencyRates[] = [];;

  constructor(private route: ActivatedRoute) { }



  async GetCurrencyProviderData(): Promise<void> {

    let response = await firstValueFrom(this.currencyService.GetCurrencyProvidersData());
    if (response) {

      this.mapper = new CurrencyServiceDataMapper(response);
      this.selectedProviderCode = this.route.snapshot.paramMap.get('code');
      this.currencyRates = this.mapper.GetCurrencyRates(this.selectedProviderCode ?? "").filter(x => x.Code !== "MDL");

    }
    else {
      // error handler
    }

  }

  async ngOnInit(): Promise<void> {
    this.GetCurrencyProviderData();
  }

}
