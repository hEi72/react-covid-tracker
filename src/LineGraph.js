import React, { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import numeral from "numeral";


const options = {
    legend: {display: false}, 
    elements: {point: {radius:0}},
    maintainAspectRatio: false, 
    tooltips: {
        mode: "index",
        intersect: false, 
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            }
        }
    }, 
    scales: {
        xAxes: [
            {
                type: "time", 
                time: {
                    format: "MM/DD/YY", 
                    tooltipFormat: "ll"
                }
            }
        ], 
        yAxes: [
            {
                gridLines: { display: false }, 
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    }
                }
            }
        ]
    }
}

function LineGraph({ casesType, className }) {
    const [data, setData] = useState({});

    const buildChartData = (data, casesType) => {
        let chartData = []; // template: [{x: __, y:__}, {x: __, y:__}, ...]
        let lastDataPoint; // use let for changing var
    
        for (let date in data[casesType]) {
            if (lastDataPoint) {
                let newDataPoint = {
                    x: date, 
                    y: data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][date];
        };
        return chartData;
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdatas=120")
            .then((response) => response.json())
            .then((data) => {
                const chartData = buildChartData(data, casesType);
                setData(chartData);
            })
        }

        fetchData();
    }, [casesType])    

    return (
        <div className={className}>
            {data?.length > 0 && (
                <Line 
                    data={{
                        datasets: [{
                            data:data, 
                            backgroundColor: "rgba(204, 16, 52, 0.5)", 
                            borderColor: "#CC1034"
                        }]
                    }}
                    width={visualViewport.width*0.65}
                    height={400}
                    options={options}
                />
            )}
        </div>
    )
}

export default LineGraph
