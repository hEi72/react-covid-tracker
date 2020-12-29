import Table from './Table'
import React, {useState, useEffect} from 'react'
import { sortData } from './util';
import { Card, CardContent } from '@material-ui/core';
import LineGraph from './LineGraph';

function PageHistory({ casesType }) {
    const [tableData, setTableData] = useState([])
   
    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
            const sortedData = sortData(data);
            setTableData(sortedData);
        });
    }, []);

    return (
        <div className="pageHistory">
            {/* Graph */}
            <div className="pageHistory__left">
                <h3>New worldwide cases</h3>
                <LineGraph casesType={casesType} className="graph"/>
            </div>

            {/* Table */}
            <div className="pageHistory__right">
                <Card>
                    <CardContent>
                        <h3>Live Cases by Country</h3>
                        <Table countries={tableData} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default PageHistory
