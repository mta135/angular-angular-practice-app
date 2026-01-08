import { GridOptions } from "ag-grid-community";

export class CurrencyGridConfig {
    public static getOptions(): GridOptions {
        return {
            columnDefs: [
                { field: 'Code', headerName: 'Cod', maxWidth: 200 },
                { field: 'Name', headerName: 'Valuta' },
                { field: 'Sell', headerName: 'Vânzare', type: 'numericColumn' },
                { field: 'Buy', headerName: 'Cumpărare', type: 'numericColumn', resizable: false }
            ],
            defaultColDef: {
                flex: 1,
                minWidth: 100,
                resizable: true,
                sortable: true,
                filter: true
            },

            animateRows: true,
            localeText: {
                noRowsToShow: 'Nu sunt date disponibile',
                loadingOoo: 'Se încarcă cursurile...'
            },

            onRowClicked: (event) => {
                console.log('Utilizatorul a dat click pe rândul:', event.data);
            },

            onGridReady: (params) => {
                params.api.sizeColumnsToFit();
            },

            suppressCellFocus: true,
        };

    }
}