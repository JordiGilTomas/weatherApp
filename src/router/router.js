import express from 'express';
import {
    showIndex, showPaises, showProvincias, showLocalidades,
} from '../controller/controllerIndex.js';

import {
    pronosticoCincoDiasTresHoras, pronosticoCincoDiasUnaHora, pronosticoSieteDias, findCiudades,
} from '../controller/controllerPronostico.js';

const router = express.Router();

router.get('/', showIndex);

router.get('/getPaises/:idContinente', showPaises);
router.get('/getProvincias/:idPais', showProvincias);
router.get('/getLocalidades/:idProvincia', showLocalidades);
router.get('/getPronostico/CincoDiasTresHoras/:idLocalidad', pronosticoCincoDiasTresHoras);
router.get('/getPronostico/CincoDiasUnaHora/:idLocalidad', pronosticoCincoDiasUnaHora);
router.get('/getPronostico/SieteDias/:idLocalidad', pronosticoSieteDias);
router.get('/getCiudades/:fragment', findCiudades);


export default router;
