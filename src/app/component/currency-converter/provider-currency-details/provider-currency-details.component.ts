import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ExchangeDataViewMode } from '../../../models/currency-converter/exchange-data-view-model';
import { TableModule } from 'primeng/table';
import { AgGridAngular } from 'ag-grid-angular'; // Importă componenta
import { GridOptions } from 'ag-grid-community'; // Importă tipul pentru coloane
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { isPlatformBrowser } from '@angular/common';
import { CurrencyGridConfig } from '../../../common/shared/currency-gri-Config';
import { CurrencyDataService } from '../../../services/currency-data-service';
import { CurrencyCode } from '../../../enums/currencty-converter/currency-code-enum';

ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-provider-currency-details',
  standalone: true,
  imports: [TableModule, AgGridAngular],
  templateUrl: './provider-currency-details.component.html',
  styleUrl: './provider-currency-details.component.scss'
})
export class ProviderCurrencyDetailsComponent {

  public gridOptions: GridOptions = CurrencyGridConfig.getOptions();

  public selectedProviderCode: string | null = null;

  private currencyService = inject(CurrencyDataService);

  public viewModel: ExchangeDataViewMode = new ExchangeDataViewMode();

  public isBrowser: boolean;

  constructor(private route: ActivatedRoute, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.GetCurrencyProviderData();
  }

  GetCurrencyProviderData() {

    this.currencyService.loadCurrencyData().subscribe({
      next: () => {

        this.selectedProviderCode = this.route.snapshot.paramMap.get('code');
        this.UpdateUI(this.selectedProviderCode ?? "");

      },
      error: (err) => {
        console.log(err);
      }

    });

  }


  private UpdateUI(provideCode: string): void {

    let vm = this.viewModel;
    let service = this.currencyService;

    vm.SelectedProviderLabel = service.GetSelectedProvider(provideCode).code;
    vm.CurrencyRates = service.GetCurrencyRates(provideCode).filter(x => x.Code != CurrencyCode.MDL);

  }

}
