'use strict'
/**
 * Roles que soporta el usuario
 */
const role = [
	'admin',
	'baseUser'
];
const modelsName = {
		user:'User',
}

/**
 *  Array de parametros posibles que puede recibir la ruta /api/news
 */
var paramNewsArray = [
	"lang", //idioma de la noticia
	"country", //Pais de la noticia
	"categ" //Categoria de la noticia
]

/**
 * Array de paises que soporta la API al hacer una petición GET a /api/news?country=CODIGOPAIS
 */
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

/**
 * Array de lenguajes que soporta la API al hacer una peticion GET /api/news?lang=CODIGOIDIOMA
 */
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

/**
 * Array de categorias posibles de las noticias que soporta la API al hacer una petición GET /api/news?categ=CATEGORIA
 */
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

/**
 * Exportamos las diferentes variables para su posterior uso
 */
module.exports = {
	role,
	modelsName,
	paramNewsArray,
	countriesArray,
	languagesArray,
	categoriesArray
};
