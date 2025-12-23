import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';


interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-currency',
  imports: [CardModule, DropdownModule, FormsModule, InputTextModule],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss'
})



export class CurrencyComponent implements OnInit {



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


  close(dd: any) {
    setTimeout(() => dd.hide());
  }

}
