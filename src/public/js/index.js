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
    const indexHour = horaActual - 1;
    const minutosActualTwoDigits = `0${new Date().getMinutes().toString()}`.slice(-2);
    const estadoHoraActual = cincoDiasUnaHora[0].hour[indexHour].symbol.desc2;
    const indexIconoHoraActual = cincoDiasUnaHora[0].symbol.value2;
    const temperaturaActual = cincoDiasUnaHora[0].hour[indexHour].temp.value;
    const sensacionTermica = cincoDiasUnaHora[0].hour[indexHour].windchill.value;
    const rainCantidad = cincoDiasUnaHora[0].hour[indexHour].rain.value;
    const estadoMayorParteDelDia = encuentraEstadoMasRepetido(cincoDiasUnaHora[0].hour);

const pronostico = {
    city: e.target.selectedOptions[0].text,
    horaActual,
    indexHour,
    minutosActualTwoDigits,
    estadoHoraActual,
    indexIconoHoraActual,
    temperaturaActual,
    sensacionTermica,
    rainCantidad,
    estadoMayorParteDelDia,
};

console.log(pronostico);


const widget = document.createElement('div');
const template = Handlebars.templates['weatherWidget.hbs']
widget.innerHTML = template(pronostico);
document.body.appendChild(widget);




console.log('Icono Luna', cincoDiasUnaHora[0].moon.symbol);
console.log('luna Menguanta, 13.64% iluminada =', cincoDiasUnaHora[0].moon.desc);
console.log('La mayor parte del día', cincoDiasUnaHora[0].symbol.desc2);
};




// https://www.tiempo.com/css/2018/icons/banderas18/*.svg


continenteSelect.addEventListener('change', getPaises);
paisSelect.addEventListener('change', getProvincias);
provinciaSelect.addEventListener('change', getLocalidades);
localidadSelect.addEventListener('change', getPronosticos);
