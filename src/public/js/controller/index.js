import Weather from '../model/weather.js';
<<<<<<< HEAD
import Cities from '../model/city.js';
=======
import City from '../model/city.js';
>>>>>>> 3b2360dc0ff0ccffd72734c330c164d23feed6d0
import UI from '../view/ui.js';

const continenteSelect = document.getElementById('continentes');
const paisSelect = document.getElementById('paises');
const provinciaSelect = document.getElementById('provincias');
const localidadSelect = document.getElementById('localidades');
const ciudadInput = document.getElementById('ciudadInput');
const url = window.location.href;
const isTouch = ('ontouchstart' in window) ? 'isTouch' : 'isNotTouch';


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

const mostrarDetalleHora = (e) => {
    if (e.target.tagName === 'INPUT') {
        const hora = e.target.dataset.id;
        const detalleDiv = document.getElementById(`detalleHora${hora}`);
        detalleDiv.classList.toggle('detalleHora-selected');
    }
};

const showDaySelected = (weather, dia) => {
    const daySelected = document.getElementById('week-daySelected-hours');
    const city = weather.getCity();
    const horaLocal = weather.getHoraLocal();
    const hoursDaySelected = weather.getHorasRestantes(dia, city, isTouch);

    const horasRestantes = (Number(dia) === 0)
        ? hoursDaySelected.filter((hora) => Number(hora.time.split(':')[0]) >= Number(horaLocal))
        : hoursDaySelected;

    daySelected.innerHTML = UI.createDaySelectedWidget(horasRestantes);
    daySelected.addEventListener('click', mostrarDetalleHora);

    UI.createGrafica(hoursDaySelected);
};

const renderPronosticos = async (e) => {
    if (localidadSelect.querySelector('#optionTitle')) localidadSelect.removeChild(localidadSelect.options[0]);

    const idLocalidad = e.target.value;
    const weather = new Weather(idLocalidad);
    await weather.initData();

    const weatherToday = {
        city: weather.getCity(),
        horaLocal: weather.getHoraLocal(),
        minutos: weather.getMinutos(),
        estadoActual: weather.getEstadoActual(),
        indexIconoHoraActual: weather.getIndexIconoHoraActual(),
        temperaturaActual: weather.getTemperaturaActual(),
        sensacionTermica: weather.getSensacionTermica(),
        rainCantidad: weather.getRainCantidad(),
        iconoLuna: weather.getIconoLuna(),
        tipoLuna: weather.getTipoLuna(),
        descripcionLuna: weather.getDescripcionLuna(),
        estadoMayorParteDelDia: weather.getEstadoMayorParteDelDia(),
        solSalida: weather.getSolSalida(),
        solMediodia: weather.getSolMediodia(),
        solPuesta: weather.getSolPuesta(),
        duracionDia: weather.getDuracionDia(),
        lunaSalida: weather.getLunaSalida(),
        lunaPuesta: weather.getLunaPuesta(),
        duracionNoche: weather.getDuracionNoche(),
    };

    const weatherWeek = weather.getWeatherWeek();

    // Mostramos Widget usando Handlebars Partial
    UI.createTodayWidget({ weatherToday, weatherWeek, isTouch });

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
        showDaySelected(weather, indexDia);
    });
    showDaySelected(weather, 0);
};

const muestraCiudades = async (e) => {
    const cityToMatch = e.target.value;
    if (cityToMatch.length > 2) {
        const ciudadesEncontradas = await Cities.getMatchedCities(cityToMatch);
        document.querySelector('#resultadoCiudades').innerHTML = UI.createCiudadesSelectWidget(ciudadesEncontradas);
        document.getElementById('ciudadUl').addEventListener('click', (item) => {
            const idCiudad = {
                target: { value: 0 },
            };
            idCiudad.target.value = (item.target.tagName === 'LI')
                ? item.target.value
                : item.composedPath().filter((i) => i.tagName === 'LI')[0].value;
            renderPronosticos(idCiudad);
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
localidadSelect.addEventListener('change', renderPronosticos);
ciudadInput.addEventListener('keyup', muestraCiudades);
