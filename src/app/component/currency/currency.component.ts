import { Component, inject, input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CurrencyService } from '../../services/currency-service';
import { ApiResponseModel, ExchangeRatesModel } from '../../models/api-response-model';
import { ExchangeSelection } from '../../models/exchange-selection-model';
import { DatePipe } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { ExchangeSide } from '../../enums/calculation-type-enum';
import { NumbersOnlyDirective } from '../../directive/input-only-numbers-directive';
import { Session } from '../../utils/session-storage';

@Component({
  selector: 'app-currency',
  imports: [CardModule, FormsModule, InputTextModule, SelectModule, DatePipe, NumbersOnlyDirective],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss'
})

export class CurrencyComponent implements OnInit {

  private currencyService = inject(CurrencyService);

  private session = inject(Session);

  public currencyData?: ApiResponseModel;

  public selection: ExchangeSelection = this.CreateEmptySelection();

  constructor() { }

  async ngOnInit(): Promise<void> {
    await this.LoadData();

  }

  public LeftSelectedOnChange(): void {

    let previousLeftCode = this.session.GetItem(ExchangeSide.Left) ?? "";
    this.session.SetItem(ExchangeSide.Left, this.selection.LeftSelectedRate?.Code ?? "");

    this.RefreshOrUpdateRateLabels(ExchangeSide.Left, ExchangeSide.Right);

    if (this.selection.LeftSelectedRate?.Code == this.selection.RightSelectedRate?.Code) {

      this.UpdateSelectedRates(this.selection.LeftSelectedRate?.Code ?? "", previousLeftCode);
      this.session.SetItem(ExchangeSide.Right, previousLeftCode);

    }



  }


  public InputLeftValueOnChange(): void {

    this.selection.InputRightValue = this.CalculatRate(ExchangeSide.Left).toString();

  }

  public RightSelectedOnChange(): void {

    let lastCode = this.session.GetItem(ExchangeSide.Right) ?? "";
    this.session.SetItem(ExchangeSide.Right, this.selection.RightSelectedRate?.Code ?? "");

    this.selection.RightExchangeRateLabel = this.FormatExchangeRateLabel(ExchangeSide.Right);

    if (this.selection.LeftSelectedRate?.Code == this.selection.RightSelectedRate?.Code) {

      this.UpdateSelectedRates(lastCode, this.selection.LeftSelectedRate?.Code ?? "");
      this.session.SetItem(ExchangeSide.Left, lastCode);

    }

  }

  public InputRightValueOnChange(): void {

  }

  FormatExchangeRateLabel(side: string): string {

    let description: string = "";

    let LeftCode: string = this.selection.LeftSelectedRate?.Code || "";
    let RightCode: string = this.selection.RightSelectedRate?.Code || "";

    let currencyDescription = this.GetCurrencyDescription(side);
    let result = this.CalculateExchangeRateLabel(side);

    switch (side) {

      case ExchangeSide.Left:
        description += "1 " + LeftCode + " (" + currencyDescription + ") = " + result + " " + RightCode;

        break;

      case ExchangeSide.Right:
        description += "1 " + RightCode + " (" + currencyDescription + ") = " + result + " " + LeftCode;

        break
    }

    return description;
  }


  private GetCurrencyDescription(exchangeSide: string): string | null {

    const selectRate = exchangeSide === ExchangeSide.Left ? this.selection.LeftSelectedRate : this.selection.RightSelectedRate;

    return this.currencyData?.currencyDescriptions.find(x => x.Code === selectRate?.Code)?.Description || "";

  }

  private CalculateExchangeRateLabel(side: string): string {

    let result: string = "";
    let tempResult: number | undefined;

    if (side == ExchangeSide.Left) {

      if (!this.IsEmpty(this.selection.InputLeftValue)) {

      }

      else {

        var leftRate = this.currencyData?.rates.find(r => r.Code === this.selection.LeftSelectedRate?.Code)?.Value ?? 0;
        var rightRate = this.currencyData?.rates.find(r => r.Code === this.selection.RightSelectedRate?.Code)?.Value ?? 0;

        tempResult = rightRate / leftRate;
        result = tempResult.toFixed(6);
      }
    }

    if (side == ExchangeSide.Right) {

      if (!this.IsEmpty(this.selection.InputLeftValue)) {

      }
      else {

        var rightRate = this.currencyData?.rates.find(r => r.Code === this.selection.RightSelectedRate?.Code)?.Value ?? 0;
        var leftRate = this.currencyData?.rates.find(r => r.Code === this.selection.LeftSelectedRate?.Code)?.Value ?? 0;

        tempResult = leftRate / rightRate;
        result = tempResult.toFixed(6);
      }
    }
    return result;
  }

  private CalculatRate(direction: string): string {

    let leftRate: number = this.selection.LeftSelectedRate?.Value ?? 0;
    let rightRate: number = this.selection.RightSelectedRate?.Value ?? 0;

    const input = direction === ExchangeSide.Left ? this.selection.InputLeftValue : this.selection.InputRightValue;

    if (this.IsEmpty(input) || input.trim() === "") return ''

    let result: number = 0;
    let intputValue = Number(input);

    switch (direction) {

      case ExchangeSide.Left:

        result = intputValue * (rightRate / leftRate);
        break;

      case ExchangeSide.Right:
        // TODO must implement
        let rightInputValue: number = Number(this.selection.InputRightValue);
        break;
    }

    return result.toFixed(4);

  }

  async LoadData(): Promise<void> {

    try {

      var data = await lastValueFrom(this.currencyService.GetCompleteData());

      this.currencyData = data.exchangeData;
      console.log(this.currencyData);

      this.currencyData!.currencyDescriptions = data.descriptions;

      this.UpdateSelectedRates("MDL", "EUR");
      this.RefreshOrUpdateRateLabels(ExchangeSide.Left, ExchangeSide.Right);

      this.session.SetItem(ExchangeSide.Left, this.selection.LeftSelectedRate?.Code ?? "");
      this.session.SetItem(ExchangeSide.Right, this.selection.RightSelectedRate?.Code ?? "");

      console.log('Date încărcate asincron cu succes!');
    }
    catch (error) {
      console.error('Eroare la încărcarea datelor:', error);
    }
  }

  private UpdateSelectedRates(left: string, right: string): void {

    if (!this.currencyData) return;

    this.selection.LeftSelectedRate = this.currencyData.rates.find(rate => rate.Code === left) || null;
    this.selection.RightSelectedRate = this.currencyData.rates.find(rate => rate.Code === right) || null;

  }

  private CreateEmptySelection(): ExchangeSelection {

    return {

      LeftSelectedRate: null,
      LeftExchangeRateLabel: '',

      RightSelectedRate: null,
      RightExchangeRateLabel: '',

      InputLeftValue: '',
      InputRightValue: ''

    };
  }

  private IsEmpty(str: string): boolean {
    return str.length === 0;
  }


  private RefreshOrUpdateRateLabels(leftExchangeSide: string, rightExchangeSide: string): void {

    this.selection.LeftExchangeRateLabel = this.FormatExchangeRateLabel(leftExchangeSide);
    this.selection.RightExchangeRateLabel = this.FormatExchangeRateLabel(rightExchangeSide);
  }

}


