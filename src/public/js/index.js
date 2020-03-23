const continenteSelect = document.getElementById('continentes');
const paisSelect = document.getElementById('paises');
const provinciaSelect = document.getElementById('provincias');
const localidadSelect = document.getElementById('localidades');

const getPaises = async (e) => {
    const idContinente = e.target.value;
    const paises = [...await (await fetch(`http://localhost:4000/getPaises/${idContinente}`)).json()];
    paisSelect.innerHTML = '';
    paises.forEach((pais) => {
        paisSelect.innerHTML += `<option value=${pais.name.id}>${pais.name._}</option>`;
    });
};

const getProvincias = async (e) => {
    const idPais = e.target.value;
    const provincias = [...await (await fetch(`http://localhost:4000/getProvincias/${idPais}`)).json()];
    provinciaSelect.innerHTML = '';
    provincias.forEach((provincia) => {
        provinciaSelect.innerHTML += `<option value=${provincia.name.id}>${provincia.name._}</option>`;
    });
};

const getLocalidades = async (e) => {
    const idProvincia = e.target.value;
    localidadSelect.innerHTML = '<option>Loading data...</option>';
    const localidades = [...await (await fetch(`http://localhost:4000/getLocalidades/${idProvincia}`)).json()];
    localidadSelect.innerHTML = '';
    localidades.forEach((localidad) => {
        localidadSelect.innerHTML += `<option value=${localidad.name.id}>${localidad.name._}</option>`;
    });
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


const getPronosticos = async (e) => {
    const idLocalidad = e.target.value;
    const cincoDiasTresHoras = [...await (await fetch(`http://localhost:4000/getPronostico/CincoDiasTresHoras/${idLocalidad}`)).json()];
    const cincoDiasUnaHora = [...await (await fetch(`http://localhost:4000/getPronostico/CincoDiasUnaHora/${idLocalidad}`)).json()];
    const sieteDias = [...await (await fetch(`http://localhost:4000/getPronostico/SieteDias/${idLocalidad}`)).json()];


    const horaActual = new Date().getHours();
    const minutosActualTwoDigits = `0${new Date().getMinutes().toString()}`.slice(-2);
    const estadoHoraActual = cincoDiasUnaHora[0].hour[horaActual].symbol.desc2;
    const indexIconoHoraActual = cincoDiasUnaHora[0].symbol.value2;
    const temperaturaActual = cincoDiasUnaHora[0].hour[horaActual].temp.value;
    const sensacionTermica = cincoDiasUnaHora[0].hour[horaActual].windchill.value;
    const rainCantidad = cincoDiasUnaHora[0].hour[horaActual].rain.value;
    const estadoMayorParteDelDia = encuentraEstadoMasRepetido(cincoDiasUnaHora[0].hour);
    const iconoLuna = cincoDiasUnaHora[0].moon.symbol;
    const luna = cincoDiasUnaHora[0].moon.desc;
    console.log("luna", luna);

    const tipoLuna = luna.slice(0, luna.indexOf(','));
    console.log("luna", luna, "tipoLuna", tipoLuna);

    const descripcionLuna = luna.slice(luna.indexOf(',') + 2);

    console.log("luna", luna, "tipoLuna", tipoLuna, "desc", descripcionLuna);



    const weatherToday = {
        city: e.target.selectedOptions[0].text,
        horaActual,
        minutosActualTwoDigits,
        estadoHoraActual,
        indexIconoHoraActual,
        temperaturaActual,
        sensacionTermica,
        rainCantidad,
        iconoLuna,
        tipoLuna,
        descripcionLuna,
        estadoMayorParteDelDia,
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

    weatherWeek.forEach((dia, indexDia) => {
        // Añado fecha al objeto ya que no figura en el API
        const fecha = new Date();
        fecha.setDate(new Date().getDate() + indexDia);
        const diaAndMes = fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }).slice(0, -1);
        weatherWeek[indexDia].diaAndMes = diaAndMes;
    });

    const template = Handlebars.templates['weatherWidget.hbs'];
    if (document.querySelector('#widget')) {
        document.querySelector('#widget').innerHTML = template({ weatherToday, weatherWeek });
    } else {
        const widget = document.createElement('div');
        widget.id = 'widget';
        widget.innerHTML = template({ weatherToday, weatherWeek });
        document.body.appendChild(widget);
    }
};


// https://www.tiempo.com/css/2018/icons/banderas18/*.svg


continenteSelect.addEventListener('change', getPaises);
paisSelect.addEventListener('change', getProvincias);
provinciaSelect.addEventListener('change', getLocalidades);
localidadSelect.addEventListener('change', getPronosticos);
