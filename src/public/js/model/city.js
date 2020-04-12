export default class Cities {

static getMatchedCities = async (cityToMatch) => {
    const url = window.location.href;
    const ciudades = [...await (await fetch(`${url}getCiudades/${cityToMatch}`)).json()];
    const ciudadesEncontradas = ciudades[0].localidad.map((ciudad) => {
        if (ciudad.nivel === 4) {
            return {
                id: ciudad.id,
                ciudad: ciudad.nombre,
                pais: ciudad.pais,
                provincia: ciudad.jerarquia[0],
                comunidad: ciudad.jerarquia[1],
                continente: ciudad.jerarquia[3],
            };
        } return null;
    });
    return ciudadesEncontradas;
};
};