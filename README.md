# API for News APP - Hito 7
## ON DEV

## installation
- `git clone https://github.com/HackatonTeam-CoreDumped/Hito7_Desarrollo_API`
- `cd Hito7_Desarrollo_API`
- `npm install`
- `npm run dev`

## API Functions
This API uses NewsApi's API to get most news from all over the world (with the API's limitation of developer plan) 

**Controllers:** 
 - **NewsController**
  
        function getSources(lang), get news sources sending a language as parameter
        endpoint Everything, get all news using some params like dates, query string, language, sources, etc...
        endpoint TopHeadLines, get all news using params like query string, country or categorie
  
  - **UserController**   
  
        Basic Create, Read, Update, Delete functions, activate or deactivate user, log user with tokens, get active/deactivate users, etc...
        
## API Routes

*Using /api/ before each route*

#### User Routes

   - /user/ **POST**: create a new user
   - /userid/:userId **GET**: Display a user that match with the ID
   - /users/ **GET**: display all users
   - /logUser **POST**: log a user (genera token)
   - /checkpwd **POST**: Compara contraseña con usuario pero sin generar token 
   - /users/active **GET**: Display all active users
   - /users/inactive **GET**: Display all inactive users
   - /user/activate/:username **PUT**: Activate an inactive user
   - /user/deactivate/:username **PUT**: Deactivate an active user
   - /userid/:userId **PUT**: Update user
   - /user/:userID **DELETE**: Delete user
   - /user/private **GET** ||| **HEADERS**: authorization(secret + token) - Tokens Tester
   - /email/:email **GET** ||| Obtiene usuario por email
   - /username/:username **GET** ||| Obtiene usuario por username
   - /favNews/:user **PUT**: Guarda una noticia en el array de noticias del usuario :user
   - /favNews/:user/:index **PUT**: Elimina una noticia en el array de noticias del usuario :user
   - /user/addCategory **POST** (body -> email + category): Añade categoria visitada por usuario (sube +1 el contador a esa cat)
   - /user/categoriesViews **POST** (body -> email): Devuelve las categorias visitadas y el numero de veces
   - /user/addKeyWord **POST** (body -> email + q): Cuando se hace una busqueda se guarda la palabra buscada y cuantas veces se ha buscado
   - /user/newSearch **POST** (body --> email) Almacena la fecha y hora cuando se busca algo
   - /user/newRead **POST** (body --> email) Almacena la fecha y hora cuando se lee un articulo
   - /user/newLogin **POST** (body --> email) Almacena la fecha y hora cuando se hace login
   - /user/lang/:userId/:lang **PUT** Actualizar idioma favorito (preferencia del usuario)
   - /user/country/:userId/:country **PUT** Actualizar país favorito (preferencia del usuario)
   - /user/lang/:userId **GET** Obtiene el idioma preferente del usuario
   - /user/country/:userId **GET** Obtiene el pais preferente del usuario

   
#### News Routes

   *Recibe noticias pasando diferentes parametros*
   - /news/everything **GET** 
   - /news/topheadlines **GET**
   
