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
    this.viewModel.LeftInputRate = this.CalculationRate(ExchangeSide.Right);

  }

  private CalculationRate(direction: string): string {

    let result: number = 0;
    let vm = this.viewModel;

    const leftCurrency = vm.LeftSelectedRate;
    const rightCurrency = vm.RightSelectedRate;
    const leftVal = Number(vm.LeftInputRate) || 0;
    const rightVal = Number(vm.RigthInputRate) || 0;

    if (direction === "LEFT") {

      if (leftCurrency.Code === "MDL") {

        let temp = Number(vm.LeftInputRate) / rightCurrency.Sell;
        result = temp;

      } else if (rightCurrency.Code == "MDL") {
        result = leftVal * leftCurrency.Buy;

      }
      else {

        let inMDL = leftVal * leftCurrency.Buy;
        result = inMDL / rightCurrency.Sell;
      }

    }

    else if (direction === "RIGHT") {

      if (rightCurrency.Code === "MDL") {
        result = rightVal / leftCurrency.Sell;

      } else if (leftCurrency.Code === "MDL") {

        result = rightVal * rightCurrency.Buy;

      } else {

        let inMDL = rightVal * rightCurrency.Buy;
        result = inMDL / leftCurrency.Sell;
      }

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
