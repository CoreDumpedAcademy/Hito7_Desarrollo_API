'use strict'

const express = require('express')
const api = express.Router()

const userController = require('../controllers/user.controller')

api.post('/user', userController.createUser);
//api.post('/logUser', userController.logUser);
api.get('/user/:userId', userController.getUser);
api.get('/users', userController.getUserList);
api.put('/user', userController.updateUser);
api.delete('/user/:userId', userController.deleteUser);

api.put('/favNews/:user', userController.addFavNew) // AÑADIR NOTICIAS FAVORITAS AL USUARIO

module.exports = api;
