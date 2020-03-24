import {
   getPronosticoCincoDiasTresHoras, getPronosticoCincoDiasUnaHora, getPronosticoSieteDias, getCiudades,
} from '../model/model.js';

export const pronosticoCincoDiasTresHoras = async (req, res) => {
    const { idLocalidad } = req.params;
    const pronosticoPorHoras = await getPronosticoCincoDiasTresHoras(idLocalidad);
    res.json(pronosticoPorHoras);
};

export const pronosticoCincoDiasUnaHora = async (req, res) => {
    const { idLocalidad } = req.params;
    const pronosticoPorHoras = await getPronosticoCincoDiasUnaHora(idLocalidad);
    res.json(pronosticoPorHoras);
};

export const pronosticoSieteDias = async (req, res) => {
    const { idLocalidad } = req.params;
    const pronosticoPorDias = await getPronosticoSieteDias(idLocalidad);
    res.json(pronosticoPorDias);
};

export const findCiudades = async (req, res) => {
    const { fragment } = req.params;
    const buscaCiudad = await getCiudades(fragment);
    const ciudades = await buscaCiudad.json();
    res.json([ciudades]);
};
