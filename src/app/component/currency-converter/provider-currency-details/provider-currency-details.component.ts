import { isPlatformServer } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular'; // Importă componenta Angular
import { ColDef, AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

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

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.showGrid = !isPlatformServer(this.platformId);

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
