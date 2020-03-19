import express from 'express';
import {
    renderIndex, renderPaises, renderProvincias, renderLocalidades,
} from '../controller/controller.js';

const router = express.Router();

router.get('/', renderIndex);

router.get('/getPaises/:idContinente', renderPaises);
router.get('/getProvincias/:idPais', renderProvincias);
router.get('/getLocalidades/:idProvincia', renderLocalidades);

export default router;
