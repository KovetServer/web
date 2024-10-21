function getRandomData(length, max = 100) {
    return Array.from({ length }, () => Math.floor(Math.random() * max));
}

function updateCharts() {
    Highcharts.charts[0].series[0].setData(getRandomData(6));
    Highcharts.charts[0].series[1].setData(getRandomData(6));
    Highcharts.charts[1].series[0].setData(getRandomData(6, 20));
    Highcharts.charts[2].series[0].setData(getRandomData(4, 30));
    Highcharts.charts[3].series[0].setData([
        { name: 'January', y: Math.floor(Math.random() * 10000) },
        { name: 'February', y: Math.floor(Math.random() * 10000) },
        { name: 'March', y: Math.floor(Math.random() * 10000) },
        { name: 'April', y: Math.floor(Math.random() * 10000) },
        { name: 'May', y: Math.floor(Math.random() * 10000) },
        { name: 'June', y: Math.floor(Math.random() * 10000) }
    ]);
    Highcharts.charts[4].series[0].setData(getRandomData(6, 100));
    Highcharts.charts[4].series[1].setData(getRandomData(6, 100));
}

Highcharts.setOptions({
    colors: ['#FFFFFF', '#E0E0E0', '#FFCCCC', '#FFFF99', '#CCCCFF', '#99FF99'],
    chart: {
        backgroundColor: '#1C1C1C',
        style: {
            fontFamily: '\'Poppins\', sans-serif'
        },
        plotBorderColor: '#FFFFFF'
    },
    title: {
        style: {
            color: '#FFFFFF',
            textTransform: 'uppercase',
            fontSize: '20px'
        }
    },
    subtitle: {
        style: {
            color: '#FFFFFF',
            textTransform: 'uppercase'
        }
    },
    xAxis: {
        gridLineColor: '#CCCCCC',
        labels: {
            style: {
                color: '#FFFFFF'
            }
        },
        lineColor: '#CCCCCC',
        minorGridLineColor: '#A0A0A0',
        tickColor: '#CCCCCC',
        title: {
            style: {
                color: '#E0E0E0'
            }
        }
    },
    yAxis: {
        gridLineColor: '#CCCCCC',
        labels: {
            style: {
                color: '#FFFFFF'
            }
        },
        lineColor: '#CCCCCC',
        minorGridLineColor: '#A0A0A0',
        tickColor: '#CCCCCC',
        tickWidth: 1,
        title: {
            style: {
                color: '#E0E0E0'
            }
        }
    },
    tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        style: {
            color: '#333333'
        }
    },
    plotOptions: {
        series: {
            dataLabels: {
                color: '#333333',
                style: {
                    fontSize: '13px'
                }
            },
            marker: {
                lineColor: '#FFFFFF'
            }
        },
        boxplot: {
            fillColor: '#CCCCCC'
        },
        candlestick: {
            lineColor: 'white'
        },
        errorbar: {
            color: 'white'
        }
    },
    legend: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        itemStyle: {
            color: '#333333'
        },
        itemHoverStyle: {
            color: '#000000'
        },
        itemHiddenStyle: {
            color: '#A0A0A0'
        },
        title: {
            style: {
                color: '#CCCCCC'
            }
        }
    },
    credits: {
        style: {
            color: '#AAAAAA'
        }
    },
    labels: {
        style: {
            color: '#CCCCCC'
        }
    },
    drilldown: {
        activeAxisLabelStyle: {
            color: '#FFFFFF'
        },
        activeDataLabelStyle: {
            color: '#FFFFFF'
        }
    },
    navigation: {
        buttonOptions: {
            symbolStroke: '#FFFFFF',
            theme: {
                fill: '#1C1C1C'
            }
        }
    },
    rangeSelector: {
        buttonTheme: {
            fill: '#1C1C1C',
            stroke: '#000000',
            style: {
                color: '#CCC'
            },
            states: {
                hover: {
                    fill: '#CCCCCC',
                    stroke: '#000000',
                    style: {
                        color: 'black'
                    }
                },
                select: {
                    fill: '#FFFFFF',
                    stroke: '#000000',
                    style: {
                        color: 'black'
                    }
                }
            }
        },
        inputBoxBorderColor: '#CCCCCC',
        inputStyle: {
            backgroundColor: '#333333',
            color: '#FFFFFF'
        },
        labelStyle: {
            color: '#FFFFFF'
        }
    },
    navigator: {
        handles: {
            backgroundColor: '#FFFFFF',
            borderColor: '#AAAAAA'
        },
        outlineColor: '#CCCCCC',
        maskFill: 'rgba(255,255,255,0.1)',
        series: {
            color: '#A6C7ED',
            lineColor: '#FFFFFF'
        },
        xAxis: {
            gridLineColor: '#CCCCCC'
        }
    },
    scrollbar: {
        barBackgroundColor: '#CCCCCC',
        barBorderColor: '#CCCCCC',
        buttonArrowColor: '#000000',
        buttonBackgroundColor: '#1C1C1C',
        buttonBorderColor: '#1C1C1C',
        rifleColor: '#000000',
        trackBackgroundColor: '#404043',
        trackBorderColor: '#404043'
    }
});

export function init() {
    Highcharts.chart('events-summary', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Summary of Events'
        },
        xAxis: {
            categories:  ['January', 'February', 'March', 'April', 'May', 'June']
        },
        yAxis: {
            title: {
                text: 'Number of Events'
            }
        },
        series: [{
            name: 'Upcoming Events',
            data: getRandomData(6)
        }, {
            name: 'Recent Events',
            data: getRandomData(6)
        }]
    });

    Highcharts.chart('clients-stats', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Customer Statistics'
        },
        xAxis: {
            categories: ['January', 'February', 'March', 'April', 'May', 'June']
        },
        yAxis: {
            title: {
                text: 'Number of Customers'
            }
        },
        series: [{
            name: 'New Customers',
            data: getRandomData(6, 20)
        }]
    });

    Highcharts.chart('events-stats', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Event Statistics'
        },
        xAxis: {
            categories: ['Conferences', 'Seminars', 'Meetings', 'Workshops']
        },
        yAxis: {
            title: {
                text: 'Number of Events'
            }
        },
        series: [{
            name: 'Events',
            data: getRandomData(4, 30)
        }]
    });

    Highcharts.chart('income-stats', {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Revenue Statistics'
        },
        series: [{
            name: 'Revenues',
            colorByPoint: true,
            data: [
                { name: 'January', y: Math.floor(Math.random() * 10000) },
                { name: 'February', y: Math.floor(Math.random() * 10000) },
                { name: 'March', y: Math.floor(Math.random() * 10000) },
                { name: 'April', y: Math.floor(Math.random() * 10000) },
                { name: 'May', y: Math.floor(Math.random() * 10000) },
                { name: 'June', y: Math.floor(Math.random() * 10000) }
            ]
        }]
    });
    
    Highcharts.chart('occupancy-stats', {
        chart: {
            type: 'area'
        },
        title: {
            text: 'Occupancy of Halls and Transportation'
        },
        xAxis: {
            categories: ['January', 'February', 'March', 'April', 'May', 'June']
        },
        yAxis: {
            title: {
                text: 'Percentage of Occupancy'
            }
        },
        series: [{
            name: 'Salons',
            data: getRandomData(6, 100)
        }, {
            name: 'Transportation',
            data: getRandomData(6, 100)
        }]
    });
}