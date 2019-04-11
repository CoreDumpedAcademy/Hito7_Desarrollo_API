const newsapi_config = require('../newsapi_token')
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(newsapi_config.token);
const newsStructs = require("../middlewares/newsStructures");
var moment = require('moment');

/**
 * 
 * @param {string} idioma Idioma de la fuente
 * Esta funcion devuelve un string con todas las fuentes que corresponden con el language indicado
 */
async function getSources(idioma) {

    var sourcesArray = ''
    await newsapi.v2.sources({
        language: idioma
    }).then(response => {
        var sourcesLength = response.sources.length

        for (var i = 0; i < sourcesLength; i++) {
            sourcesArray += response.sources[i].id + ", "
        }
        console.log("s: " + sourcesArray)
    }).catch(err => {
        console.log(err)
        return 'fox-news'
    });
    return sourcesArray
}

function checkDates(date){
    if(!moment(date, moment.ISO_8601).isValid() && !moment(date,"YYYY-MM-DD").isValid()){
        return false
    }else{
        return true
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Esta function obtiene todas las noticias 
 * Los filtros que soporta son idioma, fuentes y query (busqueda)  
 * idioma por defecto: en (inglés)
 * Sources por defecto: *
 * query (búsqueda) por defecto: *
 * TO-DO: Añadir soporte para buscar por fechas y ordenar 
 **/
async function getNews(req, res) {

    //Querys que se pasan por parametro
    var idioma = req.query.lang
    var busqueda = req.query.q
    var fuentes = req.query.sources
    var pagina = req.query.page
    var tamañoPagina = req.query.pageSize
    var fromDate = req.query.from
    var untilDate = req.query.until
    var ordenar = req.query.sortBy

    //si las fechas no corresponden se pone esas por defecto
    if(!checkDates(fromDate) || fromDate===undefined){
        fromDate = new Date(moment().format("YYYY-MM-DD"))
        fromDate.setMonth(fromDate.getMonth()-1)
        fromDate+=""
    }

    if(!checkDates(untilDate) || untilDate===undefined){
        untilDate = new Date(moment().format("YYYY-MM-DD"))
        untilDate+=""
    }

    console.log(req.query)

    console.log(fromDate+ " -- " +untilDate)

    //si no se indica idioma, se utilizará inglés
    if (!newsStructs.languagesArray.includes(idioma)) {
        idioma = 'en'
    }

    if (!newsStructs.SortByArray.includes(ordenar)) {
        ordenar = 'popularity'
    }

    //si no se indica una fuente se utilizaran todas del idioma seleccionado
    if(fuentes===undefined){
        fuentes = await getSources(idioma)
    }

    //Si pagina no es un numero entero se mostraran resultados de la pagina 1
    if (!Number.isInteger(pagina) || tamañoPagina<1){
        pagina = 1
    }

    //Si el tamaño de la pagina no es un numero pues se utilizara 20(se mostraran 20 noticias)
    if (!Number.isInteger(tamañoPagina) || tamañoPagina<1){
        tamañoPagina = 20
    }

    console.log(fuentes)

    //Si la busqueda resulta undefined (no realiza busqueda)
    if (busqueda === undefined) {
        await newsapi.v2.everything({
            sources: fuentes,
            //country: pais, Parece ser que la api no lo soporta
            language: idioma,
            from: fromDate,
            to: untilDate,
            //category: categoria, Igual que lo otro
            sortBy: ordenar,
            page: pagina,
            pageSize: tamañoPagina
        }).then(response => {
            res.status(200).send({ response })
        }).catch(err => {
            res.status(500).send({Message:`Error: ${err}`})
        })
    //Si se incluye una query (busqueda)
    } else {
        await newsapi.v2.everything({
            sources: fuentes,
            //country: pais, Parece ser que la api no lo soporta
            language: idioma,
            //category: categoria, Igual que lo otro
            q: busqueda,
            sortBy: ordenar,
            page: pagina,
            pageSize: tamañoPagina
        }).then(response => {
            res.status(200).send({ response })
        }).catch(err => {
            res.status(500).send({Message:`Error: ${err}`})
        })
    }
}

module.exports = {
    getNews,
    getSources
}