import {
 getContinents, getPaises, getProvincias, getLocalidades,
} from '../model/model.js';

export const renderIndex = async (req, res) => {
    const continentes = await getContinents();
    res.render('index', { continentes });
};

export const renderPaises = async (req, res) => {
    const { idContinente } = req.params;
    const paises = await getPaises(idContinente);
    res.json(paises);
};

export const renderProvincias = async (req, res) => {
    const { idPais } = req.params;
    const provincias = await getProvincias(idPais);
    res.json(provincias);
};

export const renderLocalidades = async (req, res) => {
    const { idProvincia } = req.params;
    const localidades = await getLocalidades(idProvincia);
    res.json(localidades);
};
