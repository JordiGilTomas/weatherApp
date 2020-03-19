import fetch from 'node-fetch';
import xml2js from 'xml2js';
import '../../env.js';

export const getContinents = async () => {
    let continentes;
    const result = await fetch(`http://api.tiempo.com/index.php?api_lang=es&continente=0&affiliate_id=${process.env.KEY}`);
    const xml = await result.text();
    const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });
    parser.parseString(xml, (err, data) => {
         continentes = data.report.location.data;
        });
    return continentes;
};

export const getPaises = (continente) => console.log(continente);
