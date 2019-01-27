import React, {Component} from 'react';

import logo from './logo.svg';
import './App.css';

import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quickFilterText: null,
            columnDefs: [
                {headerName: 'Name', field: 'name'},
                {headerName: 'Position', field: 'position'},
                {headerName: 'Overall Rank', field: 'rankOverall'},
                {headerName: 'Position Rank', field: 'rankPos'},
                {headerName: 'Team', field: 'team'}
            ],
            rowData: [],
            api: {}
        }
    }


    render() {
        return (
            <div>
                <div>
                    <input type="text" onChange={this.onQuickFilterText} placeholder="Type text to filter..."/>
                </div>
                <div
                    className="ag-theme-balham"
                    style={{height: '900px', width: '900px'}}
                >
                    <AgGridReact
                        onGridReady={this.onGridReady}
                        pagination={true}
                        sortable={true}
                        filter={true}
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        quickFilterText={this.state.quickFilterText}
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
