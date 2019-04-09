const newsapi_config = require('../newsapi_token')
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(newsapi_config.token);

/**
 * @param {*} req 
 * @param {*} res 
 * Esta funcion devuelve un string con todas las fuentes que corresponden con el language y country indicado
 * TO DO: poder pasar language y country por parametros mediante sobrecarga de constructores
 */
async function getSources(req, res) {
    var sourcesArray = ''
    await newsapi.v2.sources({
        language: 'en',
        country: 'us',
    }).then(response => {
        var sourcesLength = response.sources.length

        for (var i = 0; i < sourcesLength; i++) {
            sourcesArray+=response.sources[i].id+", "
        }
        console.log(sourcesArray)
    }).catch(err => {
        console.log(err)
        res.status(500)
    });
    return sourcesArray

}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Esta function obtiene todas las noticias de las fuentes que recibe por el parametro sources, ver funcion getSources
 * To DO: sortBy, pasar por parametro como queremos que se ordene
 */
async function getNews(req, res) {
    var fuentes = ''
    fuentes = await getSources()
    console.log(fuentes)
    await newsapi.v2.everything({
        sources: fuentes,
        sortBy: 'relevancy',
        page: 2
    }).then(response => {
        res.status(200).send({ response })
    })

}

module.exports = {
    getNews,
    getSources
}