import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CurrencyService } from '../../services/currency-service';
import { ApiResponseModel } from '../../models/api-response-model';
import { ExchangeSelection } from '../../models/exchange-selection-model';
import { DatePipe } from '@angular/common';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-currency',
  imports: [CardModule, FormsModule, InputTextModule, SelectModule, DatePipe],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss'
})

export class CurrencyComponent implements OnInit {

  private currencyService = inject(CurrencyService);

  public currencyData?: ApiResponseModel;

  public selection: ExchangeSelection = this.CreateEmptySelection();

  constructor() { }

  async ngOnInit(): Promise<void> {
    await this.LoadData();
  }

  LeftOnChange(): void {

  }

  SetCurrencyDescription(side: string): string {

    let description: string = "";

    if (side == "left") {

      if (!this.IsEmpty(this.selection.InputLeftValue)) {

        var value = this.currencyData?.currencyDescriptions.find(desc => desc.Code === this.selection.LeftSelectedRate?.Code)?.Description || '';
        description += this.selection.InputLeftValue + " ";

      }
      else {

        let currencyDescription: string = this.currencyData?.currencyDescriptions.find(x => x.Code === this.selection.LeftSelectedRate?.Code)?.Description || "";
        let LeftCode: string = this.selection.LeftSelectedRate?.Code || "";

        let RightCode: string = this.selection.RightSelectedRate?.Code || "";

        let result = this.Calculate("left");
        description += "1 " + LeftCode + " (" + currencyDescription + ") = " + result + " " + RightCode;

      }

    }


    if (side == "right") {

      if (!this.IsEmpty(this.selection.InputRightValue)) {

      }
      else {

        let currencyDescription: string = this.currencyData?.currencyDescriptions.find(x => x.Code === this.selection.RightSelectedRate?.Code)?.Description || "";
        let RightCode: string = this.selection.RightSelectedRate?.Code || "";

        let LeftCode: string = this.selection.LeftSelectedRate?.Code || "";

        let result = this.Calculate("right");

        description += "1 " + RightCode + " (" + currencyDescription + ") = " + result + " " + LeftCode;

      }

    }

    return description;
  }


  private Calculate(side: string): string {

    let result: string = "";
    let tempResult: number | undefined;

    if (side == "left") {

      if (!this.IsEmpty(this.selection.InputLeftValue)) {

      }

      else {

        var leftRate = this.currencyData?.rates.find(r => r.Code === this.selection.LeftSelectedRate?.Code)?.Value ?? 0;
        var rightRate = this.currencyData?.rates.find(r => r.Code === this.selection.RightSelectedRate?.Code)?.Value ?? 0;

        tempResult = rightRate / leftRate;
        result = tempResult.toFixed(6);
      }
    }

    if (side == "right") {

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

  private SetDescriptions(): void {

    this.selection.LeftDescription = this.SetCurrencyDescription("left");
    this.selection.RightDescription = this.SetCurrencyDescription("right");
  }



  async LoadData(): Promise<void> {

    try {

      var data = await lastValueFrom(this.currencyService.GetCompleteData());

      this.currencyData = data.exchangeData;
      console.log(this.currencyData);

      this.currencyData!.currencyDescriptions = data.descriptions;

      this.SetDefaultCurrencyRates();
      this.SetDescriptions();

      console.log('Date încărcate asincron cu succes!');
    }
    catch (error) {

      console.error('Eroare la încărcarea datelor:', error);
    }
  }

  SetDefaultCurrencyRates(): void {

    if (this.currencyData) {

      this.selection.LeftSelectedRate = this.currencyData.rates.find(rate => rate.Code === 'MDL') || null;
      this.selection.RightSelectedRate = this.currencyData.rates.find(rate => rate.Code === 'EUR') || null;
    }
  }

  private CreateEmptySelection(): ExchangeSelection {

    return {

      LeftSelectedRate: null,
      LeftDescription: '',

      RightSelectedRate: null,
      RightDescription: '',

      InputLeftValue: '',
      InputRightValue: ''

    };
  }


  private IsEmpty(str: string): boolean {
    return str.length === 0;
  }


}
