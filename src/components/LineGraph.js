import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    basisUrl,
} from '../utils/utils';
import numeral from 'numeral';

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function(value, index, values) {
                        return numeral(value).format("0a");
                    }
                }
            }
        ]
    }
}

const buildChartData = (data, casesType) => {
    const chartData = [];
    let lastDataPoint;

    Object.keys(data[casesType]).forEach(date => {
        if(lastDataPoint) {
            const newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint
            }
            chartData.push(newDataPoint);
        }
        lastDataPoint = data['cases'][date];
    })
    return chartData;
};

const LineGraph = ({ casesType = "cases"}) => {

    ///v3/covid-19/historical/all?lastdays=120
    const [data, setData] = useState({});


    useEffect(() => {

        const fetchData = async () => {
            fetch(`${basisUrl}historical/all?lastdays=120`)
            .then(response => response.json())
            .then(data => {
                console.log('data >>>>>>>', data);
                const chartData = buildChartData(data, casesType);
                setData(chartData);
            });
        };

        fetchData();
    }, [casesType])

    return (
        <div>
            <h1>Im a graph</h1>
            {data.length > 0 &&
            <Line 
                data={{
                    datasets: [{
                        backgroundColor: "rgba(204, 16, 52, 0.5)",
                        borderColor: "#CC1034",
                        data,
                    }]
                }}
                options={options}
            />
            }
        </div>
    )
};

export default LineGraph;
