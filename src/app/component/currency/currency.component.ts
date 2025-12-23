import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CurrencyService } from '../../services/currency-service';
import { ApiResponseModel } from '../../models/api-response-model';
import { ExchangeSelection } from '../../models/exchange-selection-model';


interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-currency',
  imports: [CardModule, FormsModule, InputTextModule, SelectModule],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss'
})



export class CurrencyComponent {

  constructor() {
    this.GetFullData();
  }

  private currencyService = inject(CurrencyService);

  currencyData?: ApiResponseModel;
  selection: ExchangeSelection = { LeftSelectedRate: null, RightSelectedRate: null, };
  value: string | undefined;


  GetFullData() {
    this.currencyService.GetFullData().subscribe((response) => {

      this.currencyData = response;
      this.SetDefaultCurrencyRates();

    });
  }


  SetDefaultCurrencyRates(): void {

    if (this.currencyData) {

      this.selection.LeftSelectedRate = this.currencyData.rates.find(rate => rate.Code === 'MDL') || null;
      this.selection.RightSelectedRate = this.currencyData.rates.find(rate => rate.Code === 'EUR') || null;
    }
  }

}
