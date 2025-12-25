import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CurrencyService } from '../../services/currency-service';
import { ApiResponseModel } from '../../models/api-response-model';
import { ExchangeSelection } from '../../models/exchange-selection-model';
import { DatePipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';


interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-currency',
  imports: [CardModule, FormsModule, InputTextModule, SelectModule, DatePipe],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss'
})

export class CurrencyComponent implements OnInit {

  currencyData?: ApiResponseModel;

  selection: ExchangeSelection;

  private currencyService = inject(CurrencyService);

  value: string | undefined;


  constructor() {

    this.selection = {
      LeftSelectedRate: null,
      RightSelectedRate: null,
      LeftDescription: '',
      RightDescription: ''
    };

  }
  async ngOnInit(): Promise<void> {

    await this.GetFullData();
    await this.GetFullDataDescrition();

  }


  async GetFullData() {
    try {

      const response = await firstValueFrom(this.currencyService.GetFullData());

      this.currencyData = response;
      this.SetDefaultCurrencyRates();

      console.log('Datele au fost încărcate asincron');

    } catch (error) {
      console.error('Eroare la încărcare:', error);
    }
  }


  async GetFullDataDescrition(): Promise<void> {

    const response = await firstValueFrom(this.currencyService.GetCurrencyDescription());
    console.log('Descrierile au fost încărcate asincron', response);
  }


  LeftOnChange(): void {

  }

  SetDescription(): void {
    let descripon: string = "Hello, world!";

  }


  SetDefaultCurrencyRates(): void {

    if (this.currencyData) {

      this.selection.LeftSelectedRate = this.currencyData.rates.find(rate => rate.Code === 'MDL') || null;
      this.selection.RightSelectedRate = this.currencyData.rates.find(rate => rate.Code === 'EUR') || null;
    }
  }

}
