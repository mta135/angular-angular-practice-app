import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CurrencyService } from '../../services/currency-service';
import { ApiResponseModel } from '../../models/api-response-model';


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

  value: string | undefined;

  cities: City[] | undefined;

  selectedCity: City | undefined;


  GetFullData() {
    this.currencyService.GetFullData().subscribe((response) => {
      this.currencyData = response;
    });
  }
}
