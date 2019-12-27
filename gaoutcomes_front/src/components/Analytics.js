import React from 'react';
import Chart from "chart.js";


class Analytics extends React.Component {

    chartRef = React.createRef();

    componentDidUpdate() {
        const myChartRef = this.chartRef.current.getContext("2d");

        new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: this.props.daysArrayIndex,
                datasets: [
                    {
                        label: "Search Time (Days)",
                        data: this.props.daysArray,
                    }
                ]
            },
            options: {
              legend:{display:false},
              scales: {
                yAxes: [{
                  scaleLabel: {display: true, labelString: 'Search Time (Days)'},
                  ticks: {beginAtZero: true}
                }],
                xAxes: [{
                  scaleLabel: {display: true, labelString: 'Student'}
                }]
              }
            }
        });
    }
    render() {
        return (
            <div className="chart">
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}

export default Analytics
