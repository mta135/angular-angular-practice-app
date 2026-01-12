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
import { NumbersOnlyDirective } from '../../../directive/input-only-numbers-directive';
import { ExchangeSide } from '../../../enums/currency/exchenge-side-enum';
import { Session } from '../../../utils/session-storage';
import e from 'express';

@Component({
  selector: 'app-currency-converter',
  imports: [SelectModule, FormsModule, ButtonModule, RouterLink, NumbersOnlyDirective],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss'
})
export class CurrencyConverterComponent implements OnInit {

  constructor() { }

  private currencyService = inject(CurrencyDataService);

  private userNotification = inject(UserNotificationService);

  private session = inject(Session);

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

    this.session.SetItem(ExchangeSide.Left, this.viewModel.LeftSelectedRate?.Code ?? "");
    this.session.SetItem(ExchangeSide.Right, this.viewModel.RightSelectedRate?.Code ?? "");

    console.log('Datele au fost încărcate și mapate cu succes.');
  }

  public SelectedProviderOnChange(): void {

    let bankCode = this.viewModel.SelectedProvider?.code ?? '';
    this.UpdateUI(bankCode, CurrencyCode.MDL, CurrencyCode.EUR);

  }

  public LeftSelectedOnChange(): void {

    let vm = this.viewModel;
    let previousLeftCode = this.session.GetItem(ExchangeSide.Left) ?? "";

    this.session.SetItem(ExchangeSide.Left, this.viewModel.LeftSelectedRate?.Code ?? "");

    if (vm.LeftSelectedRate?.Code == vm.RightSelectedRate?.Code) {

      let providerCode = this.viewModel.SelectedProvider?.code;

      this.UpdateSelectedRates(providerCode ?? "", vm.LeftSelectedRate?.Code ?? "", previousLeftCode);
      this.session.SetItem(ExchangeSide.Right, previousLeftCode);

    }
  }

  private UpdateSelectedRates(providerCode: string, left: string, right: string): void {

    let service = this.currencyService;

    this.viewModel.LeftSelectedRate = service.GetRateByCode(providerCode, left);
    this.viewModel.RightSelectedRate = service.GetRateByCode(providerCode, right);
  }

  public RightSelectedOnChange(): void {

    let vm = this.viewModel;

    let lastCode = this.session.GetItem(ExchangeSide.Right) ?? "";
    this.session.SetItem(ExchangeSide.Right, vm.RightSelectedRate?.Code ?? "");

    if (vm.LeftSelectedRate?.Code == vm.RightSelectedRate?.Code) {

      let providerCode = vm.SelectedProvider?.code;
      this.UpdateSelectedRates(providerCode ?? "", lastCode, vm.LeftSelectedRate?.Code ?? "");

      this.session.SetItem(ExchangeSide.Left, lastCode);
    }

  }

  public LeftInputTextBoxEvent(): void {

    this.viewModel.RigthInputRate = this.CalculationRate(ExchangeSide.Left);

  }

  public RightInputTextBoxEvent(): void {

  }

  private CalculationRate(direction: string): string {

    let result: number = 0;
    let vm = this.viewModel;

    if (direction === "LEFT") {

      let leftCurrency = vm.LeftSelectedRate;
      let rightCurrency = vm.RightSelectedRate

      if (leftCurrency.Code === "MDL") {

        let temp = Number(vm.LeftInputRate) / rightCurrency.Sell;
        result = temp;

      } else {

        let tempBuy = Number(vm.LeftInputRate) * leftCurrency.Buy;
        let tempSell = tempBuy / rightCurrency.Sell;

        result = tempSell;
      }

    }

    else if (direction === "RIGHT") {

      let rightCurrency = vm.RightSelectedRate
      let leftCurrency = vm.LeftSelectedRate;

    }

    return result.toFixed(2);

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
