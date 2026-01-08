import { Component, inject, OnInit } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { CurrencyDataService as CurrencyDataService } from '../../../services/exchage-data-service';
import { firstValueFrom } from 'rxjs';
import { CurrencyServiceDataMapper } from '../../../common/mapper/currency-converter-mapper/currency-data-mapper';
import { ExchangeProvider } from '../../../enums/currencty-converter/currency-exchage-provider-enum';
import { ExchangeDataViewMode } from '../../../models/currency-converter/exchange-data-view-model';
import { FormsModule } from '@angular/forms';
import { UserNotificationService } from '../../../services/user-notification-service';
import { ButtonModule } from 'primeng/button';
import { CurrencyCode } from '../../../enums/currencty-converter/currency-code-enum';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-currency-converter',
  imports: [SelectModule, FormsModule, ButtonModule, RouterLink],
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

  ngOnInit(): void {
    this.GetCurrencyProviderData();
  }

  GetCurrencyProviderData(): void {

    this.currencyService.GetCurrencyProvidersData().subscribe({
      next: (data) => {

        let mapper = new CurrencyServiceDataMapper(data);
        this.mapper = mapper;

        this.viewModel.Providers = mapper.GetProviders();

        this.viewModel.SelectedProvider = mapper.GetSelectedProvider(ExchangeProvider.Bnm);
        this.viewModel.SelectedProviderLabel = this.viewModel.SelectedProvider.code;

        this.viewModel.CurrencyRates = mapper.GetCurrencyRates(ExchangeProvider.Bnm);
        this.viewModel.DashBoardRates = this.mapper?.GetDashboardRates(ExchangeProvider.Bnm);

        this.viewModel.LeftSelectedRate = this.mapper?.GetRateByCode(ExchangeProvider.Bnm, CurrencyCode.MDL);
        this.viewModel.RightSelectedRate = this.mapper?.GetRateByCode(ExchangeProvider.Bnm, CurrencyCode.EUR);

        console.log('Datele au fost încărcate și mapate cu succes.');

      }, error: (error) => {
        console.error('Error:', error); // Handle any errors

        this.userNotification.ShowToast();
        this.isDisabled = true;
      }
    });
  }


  public SelectedProviderOnChange(): void {

    const bankCode = this.viewModel.SelectedProvider?.code ?? '';
    this.viewModel.DashBoardRates = this.mapper?.GetDashboardRates(bankCode);

    this.viewModel.SelectedProviderLabel = bankCode;

  }



  public LeftSelectedOnChange(): void {

  }


  public RightSelectedOnChange(): void {

  }

  public LeftInputTextBoxEvent(): void {

  }

  public RightInputTextBoxEvent(): void {

  }


  public GetCurrencyIcon(code: string): string {

    let icons: Record<string, string> = {
      'EUR': 'images/euro-icon.png',
      'USD': 'images/dollar-icon.png',
      'RON': 'images/leu-icon.png',
      'GBP': 'images/coin-icon.png',
      'UAH': 'images/hryvnia-icon.png'
    };

    return icons[code] || 'images/default-icon.png';
  }

}
