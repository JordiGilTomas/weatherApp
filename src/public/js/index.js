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


continenteSelect.addEventListener('change', getPaises);
paisSelect.addEventListener('change', getProvincias);
provinciaSelect.addEventListener('change', getLocalidades);
