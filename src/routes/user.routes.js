'use strict'

const express = require('express')
const api = express.Router()

const userController = require('../controllers/user.controller')

api.post('/user', userController.createUser);
//api.post('/logUser', userController.logUser);
api.get('/user/:userId', userController.getUser);
// GET DE VARIOS USUARIOS
api.get('/users', userController.getAllUsers); // TODOS los usuarios
api.get('/users/Active', userController.getActiveUsers) // USUARIOS ACTIVOS
api.get('/users/Inactive', userController.getInactiveUsers) // USUARIOS INACTIVOS


api.put('/user', userController.updateUser);
api.delete('/user/:userId', userController.deleteUser);

api.put('/user/activate/:username', userController.activate) // ACTIVAR USUARIO (SI ESTÁ INACTIVO)
api.put('/user/deactivate/:username', userController.deactivate) // DESACTIVAR USUARIO (SI ESTÁ ACTIVO)

module.exports = api;
