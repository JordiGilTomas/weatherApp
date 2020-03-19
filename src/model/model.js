import fetch from 'node-fetch';
import xml2js from 'xml2js';
import '../../env.js';
/* 0 devuelve todos continentes sino devuelve paises */
export const getContinents = async (buscar = '&continente=0') => {
    console.log('buscar', buscar);

    let datos;
    const result = await fetch(`http://api.tiempo.com/index.php?api_lang=es${buscar}&affiliate_id=${process.env.KEY}`);
    const xml = await result.text();
    const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });
    parser.parseString(xml, (err, data) => {
         datos = data.report.location.data;
        });
    console.log(datos);

    return datos;
};

export const getPaises = (continente) => getContinents(`&continente=${continente}`);

export const getProvincias = (pais) => getContinents(`&pais=${pais}`);

export const getLocalidades = (provincia) => getContinents(`&division=${provincia}`);
