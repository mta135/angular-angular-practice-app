import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CurrencyDataService } from '../../../services/exchage-data-service';
import { firstValueFrom } from 'rxjs';
import { CurrencyServiceDataMapper } from '../../../common/mapper/currency-converter-mapper/currency-data-mapper';
import { ExchangeDataViewMode } from '../../../models/currency-converter/exchange-data-view-model';
import { TableModule } from 'primeng/table';
import { CurrencyRates } from '../../../models/currency-converter/provider-mode';
import { AgGridAngular } from 'ag-grid-angular'; // Importă componenta
import { ColDef, GridOptions } from 'ag-grid-community'; // Importă tipul pentru coloane
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { isPlatformBrowser } from '@angular/common';
import { CurrencyGridConfig } from '../../../common/shared/currency-gri-Config';
import { CurrencyDataServiceV2 } from '../../../services/currency-data-service';
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

  private currencyServiceV2 = inject(CurrencyDataServiceV2);

  public viewModel: ExchangeDataViewMode = new ExchangeDataViewMode();

  public isBrowser: boolean;

  constructor(private route: ActivatedRoute, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.GetCurrencyProviderData();
  }

  GetCurrencyProviderData() {

    this.currencyServiceV2.loadCurrencyData().subscribe({
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
    let service = this.currencyServiceV2;

    vm.SelectedProviderLabel = service.GetSelectedProvider(provideCode).code;
    vm.CurrencyRates = service.GetCurrencyRates(provideCode).filter(x => x.Code != CurrencyCode.MDL);

  }

}
