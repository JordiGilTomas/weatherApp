const continenteSelect = document.getElementById('continentes');
const paisSelect = document.getElementById('paises');
const provinciaSelect = document.getElementById('provincias');
const localidadSelect = document.getElementById('localidades');
const ciudadInput = document.getElementById('ciudadInput');
const url = window.location.href;
const isTouch = ('ontouchstart' in window) ? 'isTouch' : 'isNotTouch';

const getAlturaNubes = (temp, rocio) => Math.max(0, 125 * (temp - rocio));

const getPuntoRocio = (temp, humi) => {
    const rocio = (temp - (14.55 + 0.114 * temp) * (1 - (0.01 * humi)) - (((2.5 + 0.007 * temp)
        * (1 - (0.01 * humi))) ** 3) - (15.9 + 0.117 * temp) * ((1 - (0.01 * humi)) ** 14));
    return Math.round(rocio);
};

const isFoggy = (temp, puntoRocio) => {
    if (temp <= puntoRocio) return 'Si';
    return 'No';
};

const isEuropa = async (pais) => {
    const idEuropa = 1;
    const paises = [...await (await fetch(`${url}getPaises/${idEuropa}`)).json()];
    return (paises.some((p) => p.name._ === pais));
};


const getPaises = async (e) => {
    if (continenteSelect.querySelector('#optionTitle')) continenteSelect.removeChild(continenteSelect.options[0]);
    provinciaSelect.innerHTML = '';
    localidadSelect.innerHTML = '';
    const idContinente = e.target.value;
    const paises = [...await (await fetch(`${url}getPaises/${idContinente}`)).json()];
    paisSelect.innerHTML = '<option id="optionTitle">Elige País</option>';
    paises.forEach((pais) => {
        paisSelect.innerHTML += `<option value=${pais.name.id}>${pais.name._}</option>`;
    });
    // Lanzamos evento Change
    // porque si hay sólo un pais(Antartida) en el continente no podemos usar el evento change.
    if (paises.length === 1) paisSelect.dispatchEvent(new Event('change'));
};

const getProvincias = async (e) => {
    if (paisSelect.querySelector('#optionTitle')) paisSelect.removeChild(paisSelect.options[0]);
    const idPais = e.target.value;
    localidadSelect.innerHTML = '';
    const provincias = [...await (await fetch(`${url}getProvincias/${idPais}`)).json()];
    provinciaSelect.innerHTML = '';
    provincias.forEach((provincia) => {
        // Hay Paises que no tienen provincias (ej: Africa -> Benin)
        // Entonces el pais nos devuelve directamente las localidades
        if (provincia.url.includes('localidad')) {
            if (!localidadSelect.querySelector('#optionTitle')) localidadSelect.innerHTML = '<option id="optionTitle">Elige Localidad</option>';
            localidadSelect.innerHTML += `<option value=${provincia.name.id}>${provincia.name._}</option>`;
        } else {
            if (!provinciaSelect.querySelector('#optionTitle')) provinciaSelect.innerHTML = '<option id="optionTitle">Elige Provincia</option>';
            provinciaSelect.innerHTML += `<option value=${provincia.name.id}>${provincia.name._}</option>`;
        }
    });
};

const getLocalidades = async (e) => {
    if (provinciaSelect.querySelector('#optionTitle')) provinciaSelect.removeChild(provinciaSelect.options[0]);
    const idProvincia = e.target.value;
    localidadSelect.innerHTML = '<option>Loading data...</option>';
    const localidades = [...await (await fetch(`${url}getLocalidades/${idProvincia}`)).json()];
    if (localidades[0].error) {
        localidadSelect.innerHTML = '<option id="optionTitle">Datos no disponibles</option>';
    } else {
        let options = '';
        localidades.forEach((localidad) => {
            options += `<option value=${localidad.name.id}>${localidad.name._}</option>`;
        });
        localidadSelect.innerHTML = `<option id="optionTitle">Elige Localidad</option>${options}`;
    }
};

const encuentraEstadoMasRepetido = (pronosticoPorHoras) => {
    const estados = [];
    pronosticoPorHoras.forEach((estadoHora) => {
        const estadoRepetido = estados.find((estado) => estado.desc2 === estadoHora.symbol.desc2);
        if (estadoRepetido) estadoRepetido.cantidad += 1;
        else estados.push({ ...estadoHora, cantidad: 1 });
    });
    const maxCantidad = Math.max(...estados.map((estado) => estado.cantidad));
    return estados.find((estado) => estado.cantidad === maxCantidad).symbol.desc2;
};


const getLocalTime = async (offset, pais) => {
    // Issue with API has been fixed. No need to calculate SummerTime anymore.
    const fecha = new Date();
    let minutos = fecha.getUTCMinutes();
    const utcHora = fecha.getUTCHours();
    // const madridHora = Number(fecha.toLocaleTimeString(
    // { timeZone: 'Europe/Madrid' }).split(':')[0]);
    // const isEuropaSummerTime = (madridHora - utcHora === 2);
    // fecha.setHours(utcHora + ((await isEuropa(pais) && isEuropaSummerTime)
    // ? offset + 1
    // : offset));
    fecha.setHours(utcHora + offset);
    let horaLocal = fecha.getHours();

    horaLocal = `0${horaLocal}`.slice(-2);
    minutos = `0${minutos}`.slice(-2);

    return { horaLocal, minutos };
};

const getWindDirectionName = (direccionViento) => {
    const nombres = {
        N: 'Norte',
        NE: 'Noreste',
        E: 'Este',
        SE: 'Sureste',
        S: 'Sur',
        SW: 'Suroeste',
        W: 'Oeste',
        NW: 'Noroeste',
    };
    return nombres[direccionViento];
};

const getNivelUv = (uv) => {
    if (uv < 2) return 'Bajo';
    if (uv < 6) return 'Moderado';
    if (uv < 8) return 'Alto';
    if (uv < 11) return 'Muy alto';
    return 'Extremo';
};

const getMinFps = (uv) => {
    if (uv < 2) return 8;
    if (uv < 6) return 15;
    if (uv < 8) return 25;
    if (uv < 11) return 30;
    return '50+';
};

const getMaxFps = (uv) => {
    if (uv < 2) return 15;
    if (uv < 6) return 25;
    if (uv < 8) return 30;
    if (uv < 11) return '50+';
    return '50+';
};

const getTiempoSinProteccion = (uv) => {
    if (uv < 2) return '80 - 110';
    if (uv < 6) return '40 - 60';
    if (uv < 8) return '25 - 35';
    if (uv < 11) return '20 - 30';
    return '15 - 25';
};

const getFecha = (index) => {
    let fecha = new Date();

    fecha.setDate(new Date().getDate() + Number(index));
    fecha = fecha.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });

    if (index < 2) {
        fecha = (Number(index) === 0) ? `hoy,${fecha.split(',')[1]}` : `mañana,${fecha.split(',')[1]}`;
        return fecha;
    }

    return fecha;
};

const mostrarDetalleHora = (e) => {
    if (e.target.tagName === 'INPUT') {
        const hora = e.target.dataset.id;
        const detalleDiv = document.getElementById(`detalleHora${hora}`);
        detalleDiv.classList.toggle('detalleHora-selected');
    }
};

const isNoche = (hora, primeraLuz, ultimaLuz) => {
    if (hora < Number(primeraLuz.split(':')[0]) || hora > Number(ultimaLuz.split(':')[0])) return true;
    return false;
};

const getDuracionDia = (solSalida, solPuesta) => {
    const duracionDia = new Date();
    duracionDia.setUTCHours(
        Number(solPuesta.split(':')[0]) - Number(solSalida.split(':')[0]),
        Number(solPuesta.split(':')[1] - Number(solSalida.split(':')[1])),
    );
    return `${duracionDia.getUTCHours()}h ${(`0${duracionDia.getMinutes()}`).slice(-2)}m`;
};

const getDuracionNoche = (lunaSalida, lunaPuesta) => {
    const duracionNoche = new Date();
    duracionNoche.setUTCHours(
        Number(lunaSalida.split(':')[0]) - Number(lunaPuesta.split(':')[0]),
        Number(lunaSalida.split(':')[1] - Number(lunaPuesta.split(':')[1])),
    );
    return `${duracionNoche.getUTCHours()}h ${(`0${duracionNoche.getMinutes()}`).slice(-2)}m`;
};

const showGrafica = (hoursDaySelected) => {
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

const showDaySelected = (pronostico, dia, city, horaLocal) => {
    const daySelected = document.getElementById('week-daySelected-hours');
    const primeraLuz = pronostico[dia].sun.in;
    const ultimaLuz = pronostico[dia].sun.out;
    const hoursDaySelected = pronostico[dia].hour.map((eachHora, index) => {
        const hour = Number(eachHora.value.split(':')[0]);
        return {
            isTouch,
            index,
            city,
            nombreDia: getFecha(dia),
            time: `0${hour}:00`.slice(-5),
            iconoTime: eachHora.symbol.value2,
            temp: eachHora.temp.value,
            descTemp: eachHora.symbol.desc2,
            sensacionTermica: eachHora.windchill.value,
            iconoViento: eachHora.wind.symbolB,
            vientoDireccion: getWindDirectionName(eachHora.wind.dir),
            vientoKmh: eachHora.wind.value,
            vientoRachas: eachHora['wind-gusts'].value,
            uv: eachHora.uv_index.value,
            nivel: getNivelUv(eachHora.uv_index.value),
            fpsMin: getMinFps(eachHora.uv_index.value),
            fpsMax: getMaxFps(eachHora.uv_index.value),
            tiempoSinProteccion: getTiempoSinProteccion(eachHora.uv_index.value),
            humedad: eachHora.humidity.value,
            nubosidad: eachHora.clouds.value,
            presion: eachHora.pressure.value,
            alturaNubes: getAlturaNubes(eachHora.temp.value,
                getPuntoRocio(eachHora.temp.value, eachHora.humidity.value)),
            puntoRocio: getPuntoRocio(eachHora.temp.value, eachHora.humidity.value),
            niebla: isFoggy(eachHora.temp.value,
                getPuntoRocio(eachHora.temp.value, eachHora.humidity.value)),
            cuotaNieve: eachHora.snowline.value,
            noche: isNoche(hour, primeraLuz, ultimaLuz),
        };
    });

    const horasRestantes = (Number(dia) === 0)
        ? hoursDaySelected.filter((hora) => Number(hora.time.split(':')[0]) >= Number(horaLocal))
        : hoursDaySelected;

    // eslint-disable-next-line no-undef
    const template = Handlebars.templates['daySelected.hbs'];
    daySelected.innerHTML = template({ hour: horasRestantes });
    daySelected.addEventListener('click', mostrarDetalleHora);

    showGrafica(hoursDaySelected);
};

const getPronosticos = async (e) => {
    if (localidadSelect.querySelector('#optionTitle')) localidadSelect.removeChild(localidadSelect.options[0]);

    const idLocalidad = e.target.value;

    const cincoDiasTresHoras = [...await (await fetch(`${url}getPronostico/CincoDiasTresHoras/${idLocalidad}`)).json()];
    const cincoDiasUnaHora = [...await (await fetch(`${url}getPronostico/CincoDiasUnaHora/${idLocalidad}`)).json()];
    const sieteDias = [...await (await fetch(`${url}getPronostico/SieteDias/${idLocalidad}`)).json()];

    const city = cincoDiasTresHoras[0].city.split('[')[0];
    const pais = cincoDiasTresHoras[0].city.split(';')[1].slice(0, -1);
    const offset = Number(cincoDiasUnaHora[0].local_info.offset);
    const { horaLocal, minutos } = await getLocalTime(offset, pais);
    const estadoActual = cincoDiasUnaHora[0].hour[Number(horaLocal) - 1].symbol.desc2;
    const indexIconoHoraActual = cincoDiasUnaHora[0].hour[Number(horaLocal) - 1].symbol.value2;
    const temperaturaActual = cincoDiasUnaHora[0].hour[Number(horaLocal) - 1].temp.value;
    const sensacionTermica = cincoDiasUnaHora[0].hour[Number(horaLocal) - 1].windchill.value;
    const rainCantidad = cincoDiasUnaHora[0].hour[Number(horaLocal) - 1].rain.value;
    const estadoMayorParteDelDia = encuentraEstadoMasRepetido(cincoDiasUnaHora[0].hour);
    const iconoLuna = cincoDiasUnaHora[0].moon.symbol;
    const luna = cincoDiasUnaHora[0].moon.desc;
    const tipoLuna = luna.slice(0, luna.indexOf(','));
    const descripcionLuna = luna.slice(luna.indexOf(',') + 2);
    const solSalida = cincoDiasTresHoras[0].day[0].sun.in;
    const solMediodia = cincoDiasTresHoras[0].day[0].sun.mid;
    const solPuesta = cincoDiasTresHoras[0].day[0].sun.out;
    const lunaSalida = cincoDiasTresHoras[0].day[0].moon.in;
    const lunaPuesta = cincoDiasTresHoras[0].day[0].moon.out;
    const duracionDia = getDuracionDia(solSalida, solPuesta);
    const duracionNoche = getDuracionNoche(lunaSalida, lunaPuesta);


    const weatherToday = {
        city,
        horaLocal,
        minutos,
        estadoActual,
        indexIconoHoraActual,
        temperaturaActual,
        sensacionTermica,
        rainCantidad,
        iconoLuna,
        tipoLuna,
        descripcionLuna,
        estadoMayorParteDelDia,
        solSalida,
        solMediodia,
        solPuesta,
        duracionDia,
        lunaSalida,
        lunaPuesta,
        duracionNoche,
    };

    const weatherWeek = [];

    sieteDias.forEach((dato, campo) => {
        switch (campo) {
            case 0: {
                dato.data.forecast.forEach((tempMinimaDia) => {
                    weatherWeek.push({ temperaturaMinima: tempMinimaDia.value });
                });
                break;
            }
            case 1: {
                dato.data.forecast.forEach((tempMaxima, indexDia) => {
                    weatherWeek[indexDia].temperaturaMaxima = tempMaxima.value;
                });
                break;
            }
            case 2: {
                dato.data.forecast.forEach((viento, indexDia) => {
                    weatherWeek[indexDia].vientoIcono = viento.idB;
                    weatherWeek[indexDia].vientoDescripcion = viento.valueB;
                });
                break;
            }
            case 3: {
                dato.data.forecast.forEach((tiempoIcono, indexDia) => {
                    weatherWeek[indexDia].tiempoIcono = tiempoIcono.id2;
                    weatherWeek[indexDia].tiempoDescripcion = tiempoIcono.value2;
                });
                break;
            }
            case 4: {
                dato.data.forecast.forEach((nombreDia, indexDia) => {
                    if (indexDia < 2) weatherWeek[indexDia].nombreDia = (indexDia === 0) ? 'HOY' : 'MAÑANA';
                    else weatherWeek[indexDia].nombreDia = nombreDia.value;
                });
                break;
            }
            case 5: {
                dato.data.forecast.forEach((atmosfera, indexDia) => {
                    weatherWeek[indexDia].atmosferaDescripcion = atmosfera.value;
                });
                break;
            }
            default: break;
        }
    });

    cincoDiasUnaHora.forEach((dia, index) => {
        weatherWeek[index].lluvia = dia.rain.value;
        weatherWeek[index].vientoKmh = dia.wind.value;
        weatherWeek[index].vientoRachas = dia['wind-gusts'].value;
    });

    weatherWeek[0].selected = true;

    weatherWeek.forEach((dia, indexDia) => {
        // Añado fecha al objeto ya que no figura en el API
        const fecha = new Date();
        fecha.setDate(new Date().getDate() + indexDia);
        const diaAndMes = fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }).slice(0, -1);
        weatherWeek[indexDia].diaAndMes = diaAndMes;
    });

    // Mostramos Widget usando Handlebars Partial
    // eslint-disable-next-line no-undef
    const template = Handlebars.templates['weatherWidget.hbs'];

    if (document.querySelector('#widget')) {
        document.querySelector('#widget').innerHTML = template({ weatherToday, weatherWeek, isTouch });
    } else {
        const widget = document.createElement('div');
        widget.id = 'widget';
        widget.innerHTML = template({ weatherToday, weatherWeek, isTouch });
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

    const weekDayDivContainer = document.getElementById('week-weather');
    weekDayDivContainer.addEventListener('click', (event) => {
        // Si el elemento que se hace click ya es el selecionado
        // hacemos return y ya no hacemos nada.
        // Con closest div lo que hacemos es buscar el elemento padre
        // ya que hemos delegado el evento.
        // Sólo hay datos por horas los 5 primeros días (0 a 4, >4 return)
        const divPadre = event.target.closest('div');
        if ((divPadre.classList.contains('selected')) || (divPadre.id > 4)) return;

        // Buscamos el div que está seleccionado
        // y le quitamos la clase Selected para deseleccionarlo.
        // Usamos Spread para convertirlo en Array para poder usar el método find.

        const oldSelected = [...weekDayDivContainer.querySelectorAll('div')].find((day) => day.classList.contains('selected'));
        oldSelected.classList.remove('selected');

        // Añadimos la clase Selected al elemento padre del que hemos hecho click
        divPadre.classList.add('selected');
        const indexDia = divPadre.id;
        showDaySelected(cincoDiasUnaHora, indexDia, city, horaLocal);
    });

    showDaySelected(cincoDiasUnaHora, 0, city, horaLocal);
};

const muestraCiudades = async (e) => {
    const ciudadesEncontradas = [];
    if (e.target.value.length > 2) {
        const ciudades = [...await (await fetch(`${url}getCiudades/${e.target.value}`)).json()];
        ciudades[0].localidad.forEach((ciudad) => {
            if (ciudad.nivel === 4) {
                ciudadesEncontradas.push({
                    id: ciudad.id,
                    ciudad: ciudad.nombre,
                    pais: ciudad.pais,
                    provincia: ciudad.jerarquia[0],
                    comunidad: ciudad.jerarquia[1],
                    continente: ciudad.jerarquia[3],
                });
            }
        });
        // eslint-disable-next-line no-undef
        const template = Handlebars.templates['ciudadesSelect.hbs'];
        document.querySelector('#resultadoCiudades').innerHTML = template({ ciudadesEncontradas });
        document.getElementById('ciudadUl').addEventListener('click', (item) => {
            const idCiudad = {
                target: { value: 0 },
            };
            idCiudad.target.value = (item.target.tagName === 'LI')
                ? item.target.value
                : item.composedPath().filter((i) => i.tagName === 'LI')[0].value;
            getPronosticos(idCiudad);
            document.getElementById('resultadoCiudades').innerHTML = '';
            ciudadInput.value = '';
                window.scroll({
                    top: 115,
                });
        });
    } else if (document.querySelector('#resultadoCiudades')) {
        document.querySelector('#resultadoCiudades').innerHTML = '';
    }
};

continenteSelect.addEventListener('change', getPaises);
paisSelect.addEventListener('change', getProvincias);
provinciaSelect.addEventListener('change', getLocalidades);
localidadSelect.addEventListener('change', getPronosticos);
ciudadInput.addEventListener('keyup', muestraCiudades);
