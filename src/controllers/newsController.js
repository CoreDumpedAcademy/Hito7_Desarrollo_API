const newsapi_config = require('../newsapi_token')
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(newsapi_config.token);
const enume = require("../middlewares/enumStructures");

/**
 * @param {*} req 
 * @param {*} res 
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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Esta function obtiene todas las noticias 
 * Los filtros que soporta son idioma, fuentes y query (busqueda)  
 * idioma por defecto: en (inglés)
 * Sources por defecto: *
 * query (búsqueda) por defecto: *
 * TO-DO: Añadir soporte para buscar por fechas
 **/
async function getNews(req, res) {

    var idioma = req.query.lang
    var pais = req.query.country
    var categoria = req.query.categoria
    var busqueda = req.query.q
    var fuentes = req.query.sources

    console.log(req.query)

    if (!enume.countriesArray.includes(pais)) {
        pais = 'us'
    }

    if (!enume.languagesArray.includes(idioma)) {
        idioma = 'en'
    }

    if (!enume.categoriesArray.includes(categoria)) {
        categoria = enume.categoriesArray[enume.categoriesArray.length - 1]
    }

    if(fuentes===undefined){
        fuentes = await getSources(idioma)
    }

    console.log(fuentes)
    if (busqueda === undefined) {
        await newsapi.v2.everything({
            sources: fuentes,
            //country: pais, Parece ser que la api no lo soporta
            language: idioma,
            //category: categoria, Igual que lo otro
            sortBy: 'relevancy',
            page: 2
        }).then(response => {
            res.status(200).send({ response })
        }).catch(err => {
            res.status(500).send({Message:`Error: ${err}`})
        })
    } else {
        await newsapi.v2.everything({
            sources: fuentes,
            //country: pais, Parece ser que la api no lo soporta
            language: idioma,
            //category: categoria, Igual que lo otro
            q: busqueda,
            sortBy: 'relevancy',
            page: 2
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