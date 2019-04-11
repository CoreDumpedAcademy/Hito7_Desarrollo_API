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
    console.log(req.params.lang)
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
    var param = [req.params.param1, req.params.param2, req.params.param3]

    var country = req.params.country
    var language = req.params.lang
    var categoria = req.params.category

    //Posibles parametros
    var paramNewsArray = [
        "lang", //idioma de la noticia
        "country", //Pais de la noticia
        "categ" //Categoria de la noticia
    ]
    var countriesArray = [
        "ae", //Emiratos Árabes Unidos
        "ar", //Argentina
        "at", //Austria
        "au", //Australia
        "bg", //Bulgaria
        "br", //Brasil
        "ca", //Canadá
        "ch", //Suiza
        "cn", //China
        "co", //Colombia
        "cu", //Cuba
        "cz", //República Checa
        "de", //Alemania
        "eg", //Egipto
        "fr", //Francia
        "gb", //Reino Unido
        "gr", //Grecia
        "hk", //Hong Kong
        "hu", //Hungría
        "id", //Indonesia
        "ie", //Irlanda
        "il", //Israel
        "in", //India
        "it", //Italia
        "jp", //Japón
        "kr", //Corea del Sur
        "lt", //Lituania
        "lv", //Letonia
        "ma", //Marruecos
        "mx", //México
        "my", //Malasia
        "ng", //Nigeria
        "nl", //Paises Bajos
        "no", //Noruega
        "nz", //Nueva Zelanda
        "ph", //Filipinas
        "pl", //Polonia
        "pt", //Portugal
        "ro", //Rumania
        "rs", //Serbia
        "ru", //Rusia
        "sa", //Arabia Saudita
        "se", //Suecia
        "sg", //Singapur
        "si", //Eslovenia
        "sk", //Eslovaquia
        "th", //Tailandia
        "tr", //Turquia
        "tw", //Taiwán
        "ua", //Ucrania
        "us", //Estados Unidos
        "ve", //Venezuela
        "za" //Sudáfrica
    ]
    var languagesArray = [
        "ar", //Arabe
        "de", //Aleman
        "en", //Inglés
        "es", //Español
        "fr", //Francés
        "he", //Hebreo
        "it", //Italiano
        "nl", //Holandés
        "no", //Noruego
        "pt", //Portugués
        "ru", //Ruso
        "se", //Sami
        "ud", //??????
        "zh"  //Chino
    ]
    var categoriesArray = [
        "business",
        "entertainment",
        "general",
        "health",
        "science",
        "sports",
        "technology",
        "business, entertainment, general, health, science, sports, technology" //todas las categorias
    ]

    for(let i=0;i<param.length;i++){
        if(param[i]===undefined){
            if(!param.includes("categ") && param[i]===undefined ){
                param[i]=="categ"
                categoria = categoriesArray[(categoriesArray.length)-1]
            }
            if(!param.includes("country") && param[i]===undefined ){
                param[i]=="country"
                country = 'us'
            }
            if(!param.includes("lang") && param[i]===undefined ){
                param[i]=="lang"
                country = 'us'
            }
        }
    }

    if (!countriesArray.includes(country)){
        country = 'us'
    }

    if (!languagesArray.includes(language)){
        lang = 'en'
    }

    if (!categoriesArray.includes(categoria)){
        categoria = categoriesArray[categoriesArray.length-1]
    }

    console.log(country+" - "+language)
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