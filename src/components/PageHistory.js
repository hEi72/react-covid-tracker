import React, {useState, useEffect} from 'react'
// import { sortData } from '../util';
import { Card, CardContent } from '@material-ui/core';

import LineGraph from './LineGraph';
import Table from './Table';
import db from "../firebase";

function PageHistory({ casesType }) {
    const [tableData, setTableData] = useState([])
   
    useEffect(() => {
        db.collection("districts").orderBy("area_score", "desc").get().then((snapshot) => {
            const docs = snapshot.docs;

            const districtScores = docs.map((doc) => ({
                name: doc.data().name,
                area_score: doc.data().area_score,
            }));
            setTableData(districtScores);

        });

        // fetch("https://disease.sh/v3/covid-19/countries")
        // .then((response) => response.json())
        // .then((data) => {
        //     console.log(data);
        //     // const sortedData = sortData(data);
        //     setTableData(data);
        // });
    }, []);

    return (
        <div className="pageHistory">
            {/* Graph */}
            <div className="pageHistory__left">
                <h3>Historical Individual Risk Score</h3>
                <LineGraph casesType={casesType} className="graph"/>
            </div>

            {/* Table */}
            <div className="pageHistory__right">
                <Card>
                    <CardContent>
                        <h3>Most Visited Districts</h3>
                        <Table data={tableData} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default PageHistory
