import { isPlatformServer } from '@angular/common';
import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AgGridAngular } from 'ag-grid-angular'; // Importă componenta Angular
import { ColDef, AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { CurrencyDataService } from '../../../services/exchage-data-service';

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

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private route: ActivatedRoute) {
    this.showGrid = !isPlatformServer(this.platformId);

  }


  ngOnInit(): void {
    this.selectedProviderCode = this.route.snapshot.paramMap.get('providerCode');
    console.log('Providerul selectat este:', this.selectedProviderCode);
  }

  columnDefs: ColDef[] = [
    { field: 'code', headerName: 'Valuta' },
    { field: 'rate', headerName: 'Curs' }
  ];

  // Datele
  rowData = [
    { code: 'USD', rate: 17.85 },
    { code: 'EUR', rate: 19.40 }
  ];

}
