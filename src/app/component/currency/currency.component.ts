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
import { CurrencyDescription } from '../../models/currency-description-model';

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
    await this.loadData();
  }

  LeftOnChange(): void {

  }

  SetDescription(): void {

    let description: string = "";

    if (!this.IsEmpty(this.selection.InputLeftValue)) {

      var value = this.currencyData?.currencyDescriptions.find(desc => desc.Code === this.selection.LeftSelectedRate?.Code)?.Name || '';

      description += this.selection.InputLeftValue + " ";

    }
    else {
      description += this.currencyData?.currencyDescriptions.find(desc => desc.Code === this.selection.LeftSelectedRate?.Code)?.Name || '';
    }







  }

  async loadData(): Promise<void> {

    try {


      var data = await lastValueFrom(this.currencyService.GetCompleteData());

      this.currencyData = data.exchangeData;
      this.currencyData!.currencyDescriptions = data.descriptions;

      this.SetDefaultCurrencyRates();
      this.SetDescription();

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
