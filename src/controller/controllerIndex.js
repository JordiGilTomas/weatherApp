import {
 getDataFromWeatherAPI, getPaises, getProvincias, getLocalidades,
} from '../model/model.js';

export const showIndex = async (req, res) => {
    const continentes = await getDataFromWeatherAPI();
    res.render('index', { continentes });
};

export const showPaises = async (req, res) => {
    const { idContinente } = req.params;
    const paises = await getPaises(idContinente);
    res.json(paises);
};

export const showProvincias = async (req, res) => {
    const { idPais } = req.params;
    const provincias = await getProvincias(idPais);
    res.json(provincias);
};

export const showLocalidades = async (req, res) => {
    const { idProvincia } = req.params;
    const localidades = await getLocalidades(idProvincia);
    res.json(localidades);
};
