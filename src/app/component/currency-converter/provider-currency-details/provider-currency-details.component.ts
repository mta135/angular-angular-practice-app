import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CurrencyDataService } from '../../../services/exchage-data-service';
import { firstValueFrom } from 'rxjs';
import { CurrencyServiceDataMapper } from '../../../common/mapper/currency-converter-mapper/currency-data-mapper';
import { ExchangeDataViewMode } from '../../../models/currency-converter/exchange-data-view-model';
import { TableModule } from 'primeng/table';
import { CurrencyRates } from '../../../models/currency-converter/provider-mode';
import { AgGridAngular } from 'ag-grid-angular'; // Importă componenta
import { ColDef } from 'ag-grid-community'; // Importă tipul pentru coloane
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { isPlatformBrowser } from '@angular/common';

ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-provider-currency-details',
  standalone: true,
  imports: [TableModule],
  templateUrl: './provider-currency-details.component.html',
  styleUrl: './provider-currency-details.component.scss'
})
export class ProviderCurrencyDetailsComponent {

  public selectedProviderCode: string | null = null;

  private currencyService = inject(CurrencyDataService);

  private mapper?: CurrencyServiceDataMapper;
  public viewModel: ExchangeDataViewMode = new ExchangeDataViewMode();

  public currencyRates: CurrencyRates[] = [];;

  isBrowser: boolean;

  constructor(private route: ActivatedRoute, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }


  public rowData: any[] = [];

  // 2. Definirea coloanelor
  public columnDefs: ColDef[] = [
    { field: 'Code', headerName: 'Cod' },
    { field: 'Name', headerName: 'Valuta' },
    { field: 'Sell', headerName: 'Vânzare' },
    { field: 'Buy', headerName: 'Cumpărare' }
  ];

  // 3. Setări implicite (opțional, dar recomandat pentru resize)
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100
  };


  async GetCurrencyProviderData(): Promise<void> {

    let response = await firstValueFrom(this.currencyService.GetCurrencyProvidersData());
    if (response) {

      this.mapper = new CurrencyServiceDataMapper(response);
      this.selectedProviderCode = this.route.snapshot.paramMap.get('code');
      this.currencyRates = this.mapper.GetCurrencyRates(this.selectedProviderCode ?? "").filter(x => x.Code !== "MDL");

      this.rowData = this.currencyRates;

    }
    else {
      // error handler
    }

  }

  async ngOnInit(): Promise<void> {
    this.GetCurrencyProviderData();
  }

}
