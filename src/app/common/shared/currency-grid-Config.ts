import { GridOptions } from "ag-grid-community";

export class CurrencyGridConfig {
    public static getOptions(): GridOptions {
        return {
            columnDefs: [
                {
                    field: 'Code',
                    headerName: 'Cod',
                    maxWidth: 200,
                    filter: 'agTextColumnFilter',
                    filterParams: {
                        maxNumConditions: 1,
                        filterOptions: ['contains', 'equals', 'startsWith'],
                        defaultOption: 'contains',
                        buttons: ['reset', 'apply'], // Adaugă butoane de control în meniu
                        closeOnApply: true
                    }
                },
                { field: 'Name', headerName: 'Valuta' },
                { field: 'Sell', headerName: 'Vânzare', filter: false },
                { field: 'Buy', headerName: 'Cumpărare', resizable: false, filter: false }
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