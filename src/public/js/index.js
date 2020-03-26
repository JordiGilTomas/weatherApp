const continenteSelect = document.getElementById('continentes');
const paisSelect = document.getElementById('paises');
const provinciaSelect = document.getElementById('provincias');
const localidadSelect = document.getElementById('localidades');
const ciudadInput = document.getElementById('ciudadInput');
const url = window.location.href;

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
    localidadSelect.innerHTML = '<option id="loading" value="0">Loading data...</option>';
    const localidades = [...await (await fetch(`${url}getLocalidades/${idProvincia}`)).json()];
    if (localidades[0].error) {
        localidadSelect.innerHTML = '<option id="optionTitle">Datos no disponibles</option>';
    } else {
        let options = '';
        localidades.forEach(async (localidad) => {
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


const getPronosticos = async (e) => {
    if (localidadSelect.querySelector('#optionTitle')) localidadSelect.removeChild(localidadSelect.options[0]);

    const idLocalidad = e.target.value;

    const cincoDiasTresHoras = [...await (await fetch(`${url}getPronostico/CincoDiasTresHoras/${idLocalidad}`)).json()];
    const cincoDiasUnaHora = [...await (await fetch(`${url}getPronostico/CincoDiasUnaHora/${idLocalidad}`)).json()];
    const sieteDias = [...await (await fetch(`${url}getPronostico/SieteDias/${idLocalidad}`)).json()];

    const city = cincoDiasTresHoras[0].city.split('[')[0];
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
    const tipoLuna = luna.slice(0, luna.indexOf(','));
    const descripcionLuna = luna.slice(luna.indexOf(',') + 2);

    const weatherToday = {
        city,
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

    // Mostramos Widget usando Handlebars Partial
    // eslint-disable-next-line no-undef
    const template = Handlebars.templates['weatherWidget.hbs'];
    if (document.querySelector('#widget')) {
        document.querySelector('#widget').innerHTML = template({ weatherToday, weatherWeek });
    } else {
        const widget = document.createElement('div');
        widget.id = 'widget';
        widget.innerHTML = template({ weatherToday, weatherWeek });
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
            idCiudad.target.value = (item.target.tagName === 'LI') ? item.target.value : item.composedPath().filter((i) => i.tagName === 'LI')[0].value;
            getPronosticos(idCiudad);
            document.getElementById('resultadoCiudades').innerHTML = '';
            ciudadInput.value = '';
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
