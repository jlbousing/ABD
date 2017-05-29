var socket = io.connect("http://localhost:8080");



socket.on("grafico",function(data){
    
console.log(data.engrase[0]);
    
    Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'GRAFICOS'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Population (millions)'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Population in 2008: <b>{point.y:.1f} millions</b>'
    },
    series: [{
        name: 'Population',
        data: [
            ['engrase', data.engrase],
            ['revision', data.revision],
            ['aceite', data.aceite],
            ['bateria', data.bateria],
            ['cauchos', data.cauchos],
            ['reparacion', data.reparacion],
            ['latoneria', data.latoneria],
            ['frenos', data.frenos],
            ['pintura', data.pintura],
            ['caja', data.caja]
        ],
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
});
    
});




