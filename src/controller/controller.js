import { getContinents } from '../model/model.js';

const renderIndex = async (req, res) => {
    const continentes = await getContinents();
    res.render('index', { continentes });
};

export default renderIndex;
