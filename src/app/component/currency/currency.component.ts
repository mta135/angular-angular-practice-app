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



export class CurrencyComponent implements OnInit {


  constructor() {

    this.GetFullData();
  }

  private currencyService = inject(CurrencyService);
  currencyData?: ApiResponseModel;

  value: string | undefined;

  cities: City[] | undefined;

  selectedCity: City | undefined;

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }


  GetFullData() {
    this.currencyService.GetFullData().subscribe((response) => {
      this.currencyData = response;
      console.log(this.currencyData);
    });

  }
}
