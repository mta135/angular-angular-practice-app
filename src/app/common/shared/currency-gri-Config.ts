import { GridOptions } from "ag-grid-community";

export class CurrencyGridConfig {
    public static getOptions(): GridOptions {
        return {
            columnDefs: [
                { field: 'Code', headerName: 'Cod', maxWidth: 100 },
                { field: 'Name', headerName: 'Valuta' },
                { field: 'Sell', headerName: 'Vânzare', type: 'numericColumn' },
                { field: 'Buy', headerName: 'Cumpărare', type: 'numericColumn' }
            ],
            defaultColDef: {
                flex: 1,
                minWidth: 100,
                resizable: true,
                sortable: true,
                filter: true
            },
            pagination: true,
            paginationPageSize: 20,
            animateRows: true,
            localeText: {
                noRowsToShow: 'Nu sunt date disponibile',
                loadingOoo: 'Se încarcă cursurile...'
            }
        };
    }
}