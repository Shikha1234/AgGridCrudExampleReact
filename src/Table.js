import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


export const Table = () => {
    const data = [
        { name: 'Dan', age: 50 },
        { name: 'MaX', age: 35 },
        { name: 'Don', age: 24 },
        { name: 'Mad', age: 36 }
    ]

    const columns = [
        { headerName: "Name", field: "name", checkboxSelection: true },
        { headerName: "Age", field: "age", sortable: true },

    ]



    const defaultColDef = {
        sortable: true,
        editable: true,
        filter: true,
        floatingFilter: true,
        flex: 1
    }

    let gridApi;
    const onGridReady = (params) => {
        gridApi = params.api
    }

    const onExportClick = () => {
        gridApi.exportDataAsCsv();
    }

    return ( <
        div >
        <
        button onClick = { onExportClick } > Export < /button> <
        div className = "ag-theme-alpine"
        style = {
            { height: '500px', width: '1600px' } } >
        <
        AgGridReact rowData = { data }
        columnDefs = { columns }
        defaultColDef = { defaultColDef }
        onGridReady = { onGridReady } >
        < /AgGridReact> <
        /div> <
        /div>
    )
}