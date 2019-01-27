import React, {Component} from 'react';

import './App.css';

import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
                {headerName: 'Name', field: 'name'},
                {headerName: 'Position', field: 'position'},
                {headerName: 'Overall Rank', field: 'rankOverall'},
                {headerName: 'Position Rank', field: 'rankPos'},
                {headerName: 'Team', field: 'team'},
                {headerName: 'Standard Deviation', field: 'standDev'}
            ],
            rowData: []
        }
    }


    render() {
        return (
            <div>
                <div className="header">Weighted Consensus NBA Fantasy Draft Rankings</div>
                <div className="header">
                    <input type="text" onChange={this.onQuickFilterText} placeholder="Filter..."/>
                </div>
                <div
                    className="ag-theme-balham"
                    style={{height: '900px', width: '900px'}}
                >
                    <AgGridReact
                        onGridReady={this.onGridReady}
                        enableSorting={true}
                        enableFilter={true}
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                    >
                    </AgGridReact>
                </div>
            </div>
        );
    }

    componentDidMount() {
        fetch("http://localhost:8080/players/rankings")
            .then(result => result.json())
            .then(rowData => this.setState({rowData}))
    }

    onGridReady = (params) => {
        this.api = params.api;
        this.columnApi = params.columnApi;
    };

    onQuickFilterText = (event) => {
        this.api.setQuickFilter(event.target.value);
    };


}


export default App;
