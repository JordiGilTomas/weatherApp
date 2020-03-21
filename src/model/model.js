import fetch from 'node-fetch';
import xml2js from 'xml2js';
import '../../env.js';
/* 0 devuelve todos continentes sino devuelve paises */
export const getDataFromWeatherAPI = async (buscar = '&continente=0', version = '') => {
    let datos;
    const result = await fetch(`http://api.tiempo.com/index.php?api_lang=es${buscar}&affiliate_id=${process.env.KEY}${version}`);
    const xml = await result.text();
    const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });
    parser.parseString(xml, (err, data) => {
         datos = data.report;
        });

    if (buscar.includes('localidad')) {
        if (version === '') return datos.location.var;
        return datos.location.day;
    }
    return datos.location.data;
};

export const getPaises = (continente) => getDataFromWeatherAPI(`&continente=${continente}`);

export const getProvincias = (pais) => getDataFromWeatherAPI(`&pais=${pais}`);

export const getLocalidades = (provincia) => getDataFromWeatherAPI(`&division=${provincia}`);

export const getPronosticoSieteDias = (localidad) => getDataFromWeatherAPI(`&localidad=${localidad}`);

export const getPronosticoCincoDiasTresHoras = (localidad) => getDataFromWeatherAPI(`&localidad=${localidad}`, '&v=2');

export const getPronosticoCincoDiasUnaHora = (localidad) => getDataFromWeatherAPI(`&localidad=${localidad}`, '&v=2&h=1');
