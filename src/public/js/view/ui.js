export default class Widgets {

    static createTodayWidget = (weatherToday, weatherWeek, isTouch) => {
        const template = Handlebars.templates['weatherWidget.hbs'];
        if (document.querySelector('#widget')) {
            document.querySelector('#widget').innerHTML = template( weatherToday, weatherWeek, isTouch );
        } else {
            const widget = document.createElement('div');
            widget.id = 'widget';
            widget.innerHTML = template(weatherToday, weatherWeek, isTouch);
            document.body.appendChild(widget);
        }
        const heart = document.getElementById('heart');
        heart.addEventListener('click', () => {
            heart.className = (heart.className.includes('unselected') ? 'icon-heart-selected' : 'icon-heart-unselected');
        });
        const share = document.getElementById('share');
        share.addEventListener('click', () => {
            share.firstElementChild.classList.toggle('show');
        });
    }

    static createGrafica = (hoursDaySelected) => {
        const xLabels = hoursDaySelected.map((hour) => hour.time);
        const yTemps = hoursDaySelected.map((hour) => hour.temp);
        const yTermica = hoursDaySelected.map((hour) => hour.sensacionTermica);
        const yHumedad = hoursDaySelected.map((hour) => hour.puntoRocio);

        // Para resetear el Canvas ya que al cargar nuevos datos
        // muestra datos antiguos si no se resetea al hacer hover
        // Destroy y clear no logro que funcionen bien en ChartJS
        const graficas = document.getElementById('graficas');
        graficas.innerHTML = '<canvas id="grafica"></canvas>';

        const ctx = document.getElementById('grafica').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: xLabels,
                datasets: [{
                    label: 'Temperatura',
                    data: yTemps,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    fill: false,
                },
                {
                    label: 'Sensación Térmica',
                    data: yTermica,
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1,
                    fill: false,
                },
                {
                    label: 'Punto de Rocío',
                    data: yHumedad,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false,
                },
                ],
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            // fontColor: 'white',
                            beginAtZero: true,
                            callback(value) {
                                return `${value} °C`;
                            },
                        },
                        // gridLines: {
                        //     display: true,
                        //     zeroLineColor: 'black',
                        //     color: 'gray',
                        // },
                    }],
                    xAxes: [{
                        ticks: {
                            // fontColor: 'white',
                        },
                        // gridLines: {
                        //     display: true,
                        //     zeroLineColor: 'black',
                        //     color: 'gray',
                        // },
                    }],
                },
                legend: {
                    labels: {
                        // fontColor: 'white'
                    },
                },
                maintainAspectRatio: false,
                tooltips: {
                    callbacks: {
                        label(tooltipItem, data) {
                            return `${data.datasets[tooltipItem.datasetIndex].label}: ${tooltipItem.yLabel} °C`;
                        },
                    },
                },
            },
        });
    };

}

