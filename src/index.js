import express from 'express';
import hbs from 'express-handlebars';
import { join } from 'path';
import * as util from '../util.js';
import router from './router/router.js';
import '../env.js';

const { dir } = util;

console.log(dir);


const app = express();

console.log(process.platform);

app.engine('hbs', hbs({
  defaultLayout: 'main',
  extname: '.hbs',
}));

app.set('dirname', dir);
app.set('view engine', 'hbs');

app.use(express.static(join(dir, 'src/public')));

app.use(express.urlencoded({
  extended: false,
}));

app.use('/', router);

app.listen(4000, () => console.log('Servidor arrancado'));
