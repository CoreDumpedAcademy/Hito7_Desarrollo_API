'use strict'

const express = require('express')
const api = express.Router()
var auth = require('../middlewares/auth')
const userController = require('../controllers/user.controller')

api.post('/user', userController.createUser);
api.post('/logUser', userController.logUser);
api.get('/userid/:userId', userController.getUser);
api.get('/username/:username', userController.getByUsername);
api.get('/email/:email', userController.getByEmail);
api.get('/user/private', auth, (req, res) => {
    res.status(200).send({ logged: true })
})

// GET DE VARIOS USUARIOS
api.get('/users', userController.getAllUsers); // TODOS los usuarios
api.get('/users/Active', userController.getActiveUsers) // USUARIOS ACTIVOS
api.get('/users/Inactive', userController.getInactiveUsers) // USUARIOS INACTIVOS

api.put('/userid/:userId', userController.updateUser);
api.delete('/user/:userId', userController.deleteUser);

api.put('/user/activate/:username', userController.activate) // ACTIVAR USUARIO (SI ESTÁ INACTIVO)
api.put('/user/deactivate/:username',userController.deactivate) // DESACTIVAR USUARIO (SI ESTÁ ACTIVO)

api.put('/favNews/:user',userController.addFavNew) // AÑADIR UNA NOTICIA AL USUARIO :user
api.put('/favNews/:user/:index', userController.deleteFavArt) // ELIMINA LA NOTICIA FAVORITA DE LA POSICIÓN INDEX DEL USUARIO USER

api.post('/user/addCategory', userController.addCategory) //+1 A LA CATEGORÍA VISITDADA
api.post('/user/categoriesViews', userController.getCategories);//DEVUELVE TODAS LAS CATEGORIAS Y SUS RESPECTIVAS VISITAS.

api.post('/user/addKeyWord', userController.addKeyWord);//+1 A LA KEYWORD MANDADA.

api.post('/user/newSearch', userController.newSearch);//almacena la hora cada vez que se busca
api.post('/user/newRead', userController.newRead);//almacena la hora cada vez que se lee
api.post('/user/newLogin', userController.newLogin);//almacena la hora cada vez que se hace login

api.put('/user/lang/:userId/:lang',userController.updateLangFav) //Actualizar idioma favorito
api.put('/user/country/:userId/:country',userController.updateCountryFav) //Actualizar pais favorito
api.get('/user/lang/:userId',userController.getLangFav) //Obtener idioma favorito
api.get('/user/country/:userId',userController.getCountryFav) //Obtener pais favorito

api.post('/checkpwd', userController.checkPassword) // COMO EL LOGIN, PERO NO GENERA TOKEN

module.exports = api;
