export default class Weather{
    constructor(idLocalidad) {
        this.idLocalidad = idLocalidad;
        this.url = window.location.href;
    };

    initData = async () => {
        this.cincoDiasTresHoras = [...await (await fetch(`${this.url}getPronostico/CincoDiasTresHoras/${this.idLocalidad}`)).json()];
        this.cincoDiasUnaHora = [...await (await fetch(`${this.url}getPronostico/CincoDiasUnaHora/${this.idLocalidad}`)).json()];
        this.sieteDias = [...await (await fetch(`${this.url}getPronostico/SieteDias/${this.idLocalidad}`)).json()];
        const offset = this.getOffset()
        Object.assign(this, this.getLocalTime(offset));
    }

    getOffset = () => Number(this.cincoDiasUnaHora[0].local_info.offset);
    getLocalTime = (offset) => {
        // Issue with API has been fixed. No need to calculate SummerTime anymore.
        const fecha = new Date();
        let minutos = fecha.getUTCMinutes();
        const utcHora = fecha.getUTCHours();
        // const madridHora = Number(fecha.toLocaleTimeString(
        // { timeZone: 'Europe/Madrid' }).split(':')[0]);
        // const isEuropaSummerTime = (madridHora - utcHora === 2);
        // fecha.setHours(utcHora + ((await isEuropa(pais) && isEuropaSummerTime)
        // ? offset + 1
        // : offset));
        fecha.setHours(utcHora + offset);
        let horaLocal = fecha.getHours();

        horaLocal = `0${horaLocal}`.slice(-2);
        minutos = `0${minutos}`.slice(-2);

        return { horaLocal, minutos };
    };

    getCity = () => this.cincoDiasTresHoras[0].city.split('[')[0];
    getHoraLocal = () => this.horaLocal;
    getMinutos = () => this.minutos;
    getPais = () => this.cincoDiasTresHoras[0].city.split(';')[1].slice(0, -1);
    getEstadoActual = () => this.cincoDiasUnaHora[0].hour[Number(this.horaLocal) - 1].symbol.desc2;
    getIndexIconoHoraActual = () => this.cincoDiasUnaHora[0].hour[Number(this.horaLocal) - 1].symbol.value2;
    getTemperaturaActual = () => this.cincoDiasUnaHora[0].hour[Number(this.horaLocal) - 1].temp.value;
    getSensacionTermica = () => this.cincoDiasUnaHora[0].hour[Number(this.horaLocal) - 1].windchill.value;
    getRainCantidad = () => this.cincoDiasUnaHora[0].hour[Number(this.horaLocal) - 1].rain.value;
    getEstadoMayorParteDelDia = () => this.encuentraEstadoMasRepetido(this.cincoDiasUnaHora[0].hour);
    getIconoLuna = () => this.cincoDiasUnaHora[0].moon.symbol;
    getTipoLuna = () => {
        const luna = this.cincoDiasUnaHora[0].moon.desc;
        return luna.slice(0, luna.indexOf(','));
    };
    getDescripcionLuna = () => {
        const luna = this.cincoDiasUnaHora[0].moon.desc;
        return luna.slice(luna.indexOf(',') + 2);
    };
    getSolSalida = () => this.cincoDiasTresHoras[0].day[0].sun.in;
    getSolMediodia = () => this.cincoDiasTresHoras[0].day[0].sun.mid;
    getSolPuesta = () => this.cincoDiasTresHoras[0].day[0].sun.out;
    getLunaSalida = () => this.cincoDiasTresHoras[0].day[0].moon.in;
    getLunaPuesta = () => this.cincoDiasTresHoras[0].day[0].moon.out;

    encuentraEstadoMasRepetido = (pronosticoPorHoras) => {
        const estados = [];
        pronosticoPorHoras.forEach((estadoHora) => {
            const estadoRepetido = estados.find((estado) => estado.desc2 === estadoHora.symbol.desc2);
            if (estadoRepetido) estadoRepetido.cantidad += 1;
            else estados.push({desc2: estadoHora.symbol.desc2, cantidad: 1 });
        });
        const maxCantidad = Math.max(...estados.map((estado) => estado.cantidad));
        return estados.find((estado) => estado.cantidad === maxCantidad).desc2;
    };

    getDuracionDia = () => {
        const solSalida = this.getSolSalida();
        const solPuesta = this.getSolPuesta();
        if (solPuesta.includes('-') || solPuesta === null ||
            solSalida.includes('-') || solSalida === null) {
            return '--:--';
        };
        const duracionDia = new Date();

        duracionDia.setUTCHours(
            Number(solPuesta.split(':')[0]) - Number(solSalida.split(':')[0]),
            Number(solPuesta.split(':')[1] - Number(solSalida.split(':')[1])),
        );
        return `${duracionDia.getUTCHours()}h ${(`0${duracionDia.getMinutes()}`).slice(-2)}m`;
    };

    getDuracionNoche = () => {
        const lunaSalida = this.getLunaSalida();
        const lunaPuesta = this.getLunaPuesta();
        if (lunaPuesta.includes('-') || lunaPuesta === null ||
            lunaSalida.includes('-') || lunaSalida === null) {
            return '--:--';
        }
        const duracionNoche = new Date();

        duracionNoche.setUTCHours(
            Number(lunaSalida.split(':')[0]) - Number(lunaPuesta.split(':')[0]),
            Number(lunaSalida.split(':')[1] - Number(lunaPuesta.split(':')[1])),
        );
        return `${duracionNoche.getUTCHours()}h ${(`0${duracionNoche.getMinutes()}`).slice(-2)}m`;
    };

    getWeatherWeek = () => {
        const weatherWeek = [];
        this.sieteDias.forEach((dato, campo) => {
            switch (campo) {
                case 0: {
                    dato.data.forecast.forEach((tempMinimaDia) => {
                        weatherWeek.push({ temperaturaMinima: tempMinimaDia.value });
                    });
                    break;
                }
                case 1: {
                    dato.data.forecast.forEach((tempMaxima, indexDia) => {
                        weatherWeek[indexDia].temperaturaMaxima = tempMaxima.value;
                    });
                    break;
                }
                case 2: {
                    dato.data.forecast.forEach((viento, indexDia) => {
                        weatherWeek[indexDia].vientoIcono = viento.idB;
                        weatherWeek[indexDia].vientoDescripcion = viento.valueB;
                    });
                    break;
                }
                case 3: {
                    dato.data.forecast.forEach((tiempoIcono, indexDia) => {
                        weatherWeek[indexDia].tiempoIcono = tiempoIcono.id2;
                        weatherWeek[indexDia].tiempoDescripcion = tiempoIcono.value2;
                    });
                    break;
                }
                case 4: {
                    dato.data.forecast.forEach((nombreDia, indexDia) => {
                        if (indexDia < 2) weatherWeek[indexDia].nombreDia = (indexDia === 0) ? 'HOY' : 'MAÑANA';
                        else weatherWeek[indexDia].nombreDia = nombreDia.value;
                    });
                    break;
                }
                case 5: {
                    dato.data.forecast.forEach((atmosfera, indexDia) => {
                        weatherWeek[indexDia].atmosferaDescripcion = atmosfera.value;
                    });
                    break;
                }
                default: break;
            }
        });

        this.cincoDiasUnaHora.forEach((dia, index) => {
            weatherWeek[index].lluvia = dia.rain.value;
            weatherWeek[index].vientoKmh = dia.wind.value;
            weatherWeek[index].vientoRachas = dia['wind-gusts'].value;
        });

        weatherWeek.forEach((dia, indexDia) => {
            // Añado fecha al objeto ya que no figura en el API
            const fecha = new Date();
            fecha.setDate(new Date().getDate() + indexDia);
            const diaAndMes = fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }).slice(0, -1);
            weatherWeek[indexDia].diaAndMes = diaAndMes;
        });

        weatherWeek[0].selected = true;

        return weatherWeek;
    };

    getHorasRestantes = (dia, city, isTouch) => {
        const primeraLuz = this.cincoDiasUnaHora[dia].sun.in;
        const ultimaLuz = this.cincoDiasUnaHora[dia].sun.out;
        const hoursDaySelected = this.cincoDiasUnaHora[dia].hour.map((eachHora, index) => {
            const hour = Number(eachHora.value.split(':')[0]);
            return {
                isTouch,
                index,
                city,
                nombreDia: this.getFecha(dia),
                time: `0${hour}:00`.slice(-5),
                iconoTime: eachHora.symbol.value2,
                temp: eachHora.temp.value,
                lluvia: (eachHora.rain.value === '0') ? null : eachHora.rain.value,
                descTemp: eachHora.symbol.desc2,
                sensacionTermica: eachHora.windchill.value,
                iconoViento: eachHora.wind.symbolB,
                vientoDireccion: this.getWindDirectionName(eachHora.wind.dir),
                vientoKmh: eachHora.wind.value,
                vientoRachas: eachHora['wind-gusts'].value,
                uv: eachHora.uv_index.value,
                nivel: this.getNivelUv(eachHora.uv_index.value),
                fpsMin: this.getMinFps(eachHora.uv_index.value),
                fpsMax: this.getMaxFps(eachHora.uv_index.value),
                tiempoSinProteccion: this.getTiempoSinProteccion(eachHora.uv_index.value),
                humedad: eachHora.humidity.value,
                nubosidad: eachHora.clouds.value,
                presion: eachHora.pressure.value,
                alturaNubes: this.getAlturaNubes(eachHora.temp.value, eachHora.humidity.value),
                puntoRocio: this.getPuntoRocio(eachHora.temp.value, eachHora.humidity.value),
                niebla: this.isFoggy(eachHora.temp.value),
                cuotaNieve: eachHora.snowline.value,
                noche: this.isNoche(hour, primeraLuz, ultimaLuz),
            };
        });
        return hoursDaySelected;
    };

    getFecha = (index) => {
        let fecha = new Date();

        fecha.setDate(new Date().getDate() + Number(index));
        fecha = fecha.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });

        if (index < 2) {
            fecha = (Number(index) === 0) ? `hoy,${fecha.split(',')[1]}` : `mañana,${fecha.split(',')[1]}`;
            return fecha;
        }
        return fecha;
    };

    getWindDirectionName = (direccionViento) => {
        const nombres = {
            N: 'Norte',
            NE: 'Noreste',
            E: 'Este',
            SE: 'Sureste',
            S: 'Sur',
            SW: 'Suroeste',
            W: 'Oeste',
            NW: 'Noroeste',
        };
        return nombres[direccionViento];
    };

    getNivelUv = (uv) => {
        if (uv < 2) return 'Bajo';
        if (uv < 6) return 'Moderado';
        if (uv < 8) return 'Alto';
        if (uv < 11) return 'Muy alto';
        return 'Extremo';
    };

    getMinFps = (uv) => {
        if (uv < 2) return 8;
        if (uv < 6) return 15;
        if (uv < 8) return 25;
        if (uv < 11) return 30;
        return '50+';
    };

    getMaxFps = (uv) => {
        if (uv < 2) return 15;
        if (uv < 6) return 25;
        if (uv < 8) return 30;
        if (uv < 11) return '50+';
        return '50+';
    };

    getTiempoSinProteccion = (uv) => {
        if (uv < 2) return '80 - 110';
        if (uv < 6) return '40 - 60';
        if (uv < 8) return '25 - 35';
        if (uv < 11) return '20 - 30';
        return '15 - 25';
    };


    getPuntoRocio = (temp, humidity) => {
        const rocio = (temp - (14.55 + 0.114 * temp) * (1 - (0.01 * humidity)) - (((2.5 + 0.007 * temp)
            * (1 - (0.01 * humidity))) ** 3) - (15.9 + 0.117 * temp) * ((1 - (0.01 * humidity)) ** 14));
        return Math.round(rocio);
    };

    getAlturaNubes = (temp, humidity) => {
        const rocio = this.getPuntoRocio(temp, humidity);
        return Math.max(0, 125 * (temp - rocio));
    }

    isFoggy = (temp) => {
        const puntoRocio = this.getPuntoRocio();
        if (temp <= puntoRocio) return 'Si';
        return 'No';
    };
    isNoche = (hora, primeraLuz, ultimaLuz) => {
        if (hora < Number(primeraLuz.split(':')[0]) || hora > Number(ultimaLuz.split(':')[0])) return true;
        return false;
    };
};