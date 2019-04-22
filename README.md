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
   - /logUser **POST**: log a user
   - /users/active **GET**: Display all active users
   - /users/inactive **GET**: Display all inactive users
   - /user/activate/:username **PUT**: Activate an inactive user
   - /user/deactivate/:username **PUT**: Deactivate an active user
   - /userid/:userId **PUT**: Update user
   - /user/:userID **DELETE**: Delete user
   - /user/private **GET** ||| **HEADERS**: authorization(secret + token) - Tokens Tester

   -/favNews/:user **PUT**: Guarda una noticia en el array de noticias del usuario :user
   
#### News Routes

   *Recibe noticias pasando diferentes parametros*
   - /news/everything **GET** 
   - /news/topheadlines **GET**
   
