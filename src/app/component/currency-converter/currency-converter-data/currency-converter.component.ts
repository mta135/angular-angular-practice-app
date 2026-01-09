import { Component, inject, OnInit } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { ExchangeProvider } from '../../../enums/currencty-converter/currency-exchage-provider-enum';
import { ExchangeDataViewMode } from '../../../models/currency-converter/exchange-data-view-model';
import { FormsModule } from '@angular/forms';
import { UserNotificationService } from '../../../services/user-notification-service';
import { ButtonModule } from 'primeng/button';
import { CurrencyCode } from '../../../enums/currencty-converter/currency-code-enum';
import { RouterLink } from '@angular/router';
import { CurrencyDataService } from '../../../services/currency-data-service';

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

  public viewModel: ExchangeDataViewMode = new ExchangeDataViewMode();

  ngOnInit(): void {
    this.GetCurrencyProviderData();
  }

  GetCurrencyProviderData(): void {

    this.currencyService.loadCurrencyData().subscribe({
      next: () => {
        this.UpdateUI(ExchangeProvider.Bnm, CurrencyCode.MDL, CurrencyCode.EUR);
      },
      error: (err) => {
        console.log(err);

        this.userNotification.ShowToast();
        this.viewModel.IsDisabled = true;

      }
    });

  }


  private UpdateUI(providerCode: string, leftCurrencyCode: string, rigthCurrencyCode: string): void {

    let vm = this.viewModel;
    let service = this.currencyService;

    vm.Providers = service.GetProviders();

    vm.SelectedProvider = service.GetSelectedProvider(providerCode);
    vm.SelectedProviderLabel = vm.SelectedProvider.code;

    vm.CurrencyRates = service.GetCurrencyRates(providerCode);
    vm.DashBoardRates = service.GetDashboardRates(providerCode);

    vm.LeftSelectedRate = service.GetRateByCode(providerCode, leftCurrencyCode);
    vm.RightSelectedRate = service.GetRateByCode(providerCode, rigthCurrencyCode);

    console.log('Datele au fost încărcate și mapate cu succes.');
  }


  public SelectedProviderOnChange(): void {

    let bankCode = this.viewModel.SelectedProvider?.code ?? '';
    this.UpdateUI(bankCode, CurrencyCode.MDL, CurrencyCode.EUR);

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
