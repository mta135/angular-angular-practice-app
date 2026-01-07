import { isPlatformServer } from '@angular/common';
import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AgGridAngular } from 'ag-grid-angular'; // Importă componenta Angular
import { ColDef, AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { CurrencyDataService } from '../../../services/exchage-data-service';
import { firstValueFrom } from 'rxjs';
import { CurrencyServiceDataMapper } from '../../../common/mapper/currency-converter-mapper/currency-data-mapper';
import { ExchangeDataViewMode } from '../../../models/currency-converter/exchange-data-view-model';

// Înregistrează toate modulele Community
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-provider-currency-details',
  imports: [AgGridAngular],
  templateUrl: './provider-currency-details.component.html',
  styleUrl: './provider-currency-details.component.scss'
})
export class ProviderCurrencyDetailsComponent {

  public showGrid: boolean = false;

  public selectedProviderCode: string | null = null;

  private currencyService = inject(CurrencyDataService);

  private mapper?: CurrencyServiceDataMapper;
  public viewModel: ExchangeDataViewMode = new ExchangeDataViewMode();

  public rowData: any[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private route: ActivatedRoute) {
    this.showGrid = !isPlatformServer(this.platformId);

  }


  async GetCurrencyProviderData(): Promise<void> {

    let response = await firstValueFrom(this.currencyService.GetCurrencyProvidersData());
    if (response) {

      this.mapper = new CurrencyServiceDataMapper(response);

      this.selectedProviderCode = this.route.snapshot.paramMap.get('code');
      this.rowData = this.mapper.GetCurrencyRates(this.selectedProviderCode ?? "");

    }
    else {
      // error handler
    }

  }

  async ngOnInit(): Promise<void> {
    this.GetCurrencyProviderData();
  }

  columnDefs: ColDef[] = [
    { field: 'Code', headerName: 'Valuta', flex: 1 },
    { field: 'Name', headerName: 'Denumire', flex: 2 },
    { field: 'Sell', headerName: 'Vânzare', flex: 1 },
    { field: 'Buy', headerName: 'Cumpărare', flex: 1 }
  ];

  // Datele

}
