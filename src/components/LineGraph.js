import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { basisUrl } from "../utils/utils";

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
                    parser: "MM/DD/YY",
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
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};


const buildChartData = (data, casesType) => {
    const chartData = [];
    let lastDataPoint;

    Object.keys(data[casesType]).forEach((date) => {
        if (lastDataPoint) {
            const newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint,
            };
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    });
    return chartData;
};

function LineGraph({ casesType = "cases" }) {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            await fetch(`${basisUrl}historical/all?lastdays=120`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    // console.log("data >>>>>>>", data);
                    let chartData = buildChartData(data, casesType);
                    setData(chartData);
                    console.log(chartData);
                });
        };

        fetchData();
    }, [casesType]);

    return (
        <div>
            {data.length > 0 && (
                <Line
                    data={{
                        datasets: [
                            {
                                backgroundColor: "rgba(204, 16, 52, 0.5)",
                                borderColor: "#CC1034",
                                data: data,
                            },
                        ],
                    }}
                    options={options}
                />
            )}
        </div>
    );
}

export default LineGraph;
