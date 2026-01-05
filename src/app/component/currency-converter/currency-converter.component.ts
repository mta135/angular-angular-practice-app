import { Component, inject, OnInit } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { CurrencyDataService as CurrencyDataService } from '../../services/exchage-data-service';
import { firstValueFrom } from 'rxjs';
import { CurrencyServiceDataMapper } from '../../common/mapper/currency-converter-mapper/currency-data-mapper';
import { ExchangeProvider } from '../../enums/currencty-converter/currency-exchage-provider-enum';
import { ExchangeDataViewMode } from '../../models/currency-converter/exchange-data-view-model';
import { FormsModule } from '@angular/forms';
import { UserNotificationService } from '../../services/user-notification-service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-currency-converter',
  imports: [SelectModule, FormsModule, ButtonModule],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss'
})
export class CurrencyConverterComponent implements OnInit {

  constructor() { }

  private currencyService = inject(CurrencyDataService);

  private userNotification = inject(UserNotificationService);

  private mapper?: CurrencyServiceDataMapper;

  public viewModel: ExchangeDataViewMode = new ExchangeDataViewMode();

  public isDisabled: boolean = false;

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
        this.viewModel.CurrencyRates = mapper.GetDashboardRates(ExchangeProvider.Bnm);

        this.viewModel.DashBoardRates = this.mapper?.GetDashboardRates(ExchangeProvider.Bnm);

        console.log('Datele au fost încărcate și mapate cu succes.');
      }
      else {

        this.userNotification.ShowToast();
        this.isDisabled = true;
      }

    } catch (error) {
      console.error('Eroare:', error);
    }
  }


  public SelectedProviderOnChange(): void {

    const bankCode = this.viewModel.SelectedProvider?.code ?? '';
    this.viewModel.DashBoardRates = this.mapper?.GetDashboardRates(bankCode);


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
