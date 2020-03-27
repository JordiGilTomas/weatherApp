import express from 'express';
import morgan from 'morgan';
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
app.set('views', join(dir, 'src/views'));
app.set('port', process.env.PORT || 4000);

app.use(express.static(join(dir, 'src/public')));

app.use(express.urlencoded({
  extended: false,
}));

app.use(morgan('common'));

app.use('/', router);

app.on('error', () => { console.log('Error'); });


const server = app.listen(app.get('port'), () => console.log(`Servidor arrancado en puerto ${app.get('port')}`));
server.on('error', () => app.listen(3002, () => console.log('Iniciado en 3002')));
