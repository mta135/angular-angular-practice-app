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

  public isDisabled: boolean = false;

  ngOnInit(): void {
    this.GetCurrencyProviderData();
  }

  GetCurrencyProviderData(): void {

    this.currencyService.loadCurrencyData().subscribe({

      next: () => {
        this.UpdateUI();
      },
      error: (err) => {
        console.log(err);

        this.userNotification.ShowToast();
        this.isDisabled = true;
      }
    });

  }


  private UpdateUI(): void {

    let vm = this.viewModel;
    let service = this.currencyService;

    vm.Providers = service.GetProviders();

    vm.SelectedProvider = service.GetSelectedProvider(ExchangeProvider.Bnm);
    vm.SelectedProviderLabel = vm.SelectedProvider.code;

    vm.CurrencyRates = service.GetCurrencyRates(ExchangeProvider.Bnm);
    vm.DashBoardRates = service.GetDashboardRates(ExchangeProvider.Bnm);


    vm.LeftSelectedRate = service.GetRateByCode(ExchangeProvider.Bnm, CurrencyCode.MDL);
    vm.RightSelectedRate = service.GetRateByCode(ExchangeProvider.Bnm, CurrencyCode.EUR);

    console.log('Datele au fost încărcate și mapate cu succes.');
  }


  public SelectedProviderOnChange(): void {

    let bankCode = this.viewModel.SelectedProvider?.code ?? '';
    let service = this.currencyService;

    this.viewModel.DashBoardRates = service.GetDashboardRates(bankCode);
    this.viewModel.SelectedProviderLabel = bankCode;

    this.viewModel.LeftSelectedRate = service.GetRateByCode(bankCode, CurrencyCode.MDL);
    this.viewModel.RightSelectedRate = service.GetRateByCode(bankCode, CurrencyCode.EUR);

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
