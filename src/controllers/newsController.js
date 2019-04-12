const newsapi_config = require('../newsapi_token')
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(newsapi_config.token);
const newsStructs = require("../middlewares/newsStructures");

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

    console.log(req.query)

    //si no se indica idioma, se utilizará inglés
    if (!newsStructs.languagesArray.includes(idioma)) {
        idioma = 'en'
    }

    //si no se indica una fuente se utilizaran todas del idioma seleccionado
    if(fuentes===undefined){
        fuentes = await getSources(idioma)
    }

    console.log(fuentes)

    //Si la busqueda resulta undefined (no realiza busqueda)
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
    //Si se incluye una query (busqueda)
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
async function getTopHeadLines(req, res){
	try{
	let headLine = req.query;
	let idioma = 'en';
	let busqueda = null;
	let pais = 'us';
	let categorias = null;
	console.log(headLine);
	if(headLine != undefined){
		if(headLine.lang != null && newsStructs.languagesArray.includes(headline.lang)) idioma = headLine.lang;
		if(headLine.q != null) busqueda = headLine.q;
		if(headLine.country != null && newsStructs.countriesArray.includes(headLine.country)) pais = headLine.country;
		if(headLine.category != null && newsStructs.categoryArray.contains(headLines.category)) categorias = headLine.category;
	}
		console.log('LANG: ' + idioma + ' q ' + busqueda + ' categorias: ' + categorias + ' country: ' + pais)
		await newsapi.v2.topHeadlines({
			q:busqueda,
			category:categorias,
			language:idioma,
			country:pais
		}).then((response) => {
			res.status(200).send(response);
		}).catch(err => {
			res.status(500).send({Message:`ERROR: ${err}`});
		});
	}catch(e){
		console.log(e);
	}
}
module.exports = {
    getNews,
    getSources,
	getTopHeadLines,
}
