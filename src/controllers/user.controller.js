
const User = require("../models/user.model");
const enume = require("../middlewares/enumStructures");
const helpers = require('../lib/helpers.js');
/*
function logUser(req, res) {
  const logUser = new User(req.body);

  User.findOne({ userName: logUser.userName })
    .select("+password")
    .exec((err, user) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al realizar la petición: ${err}` });
      if (!user)
        return res.status(404).send({ message: "El usuario no existe" });

      return user.comparePassword(logUser.password, (err, isMatch) => {
        if (err)
          return res.status(500).send({ message: `Error al ingresar: ${err}` });
        if (!isMatch)
          return res
            .status(404)
            .send({ message: "Usuario o contraseña incorrectos" });

        return res.status(200).send({
          message: "Te has logueado correctamente",
        });
      });
    });
}
*/
async function createUser (req, res) {
  let user = null;
  if(req.body != null){
	  console.log(req.body);
	  user = new User();
	  user = req.body
	  user.password = await helpers.encriptarPassword(req.body.password);
	  console.log(user);
	  user.save((err, userStored) => {
	  console.log(userStored);
	    if(err) return res.status(500).send({message: `Error al salvar la base de datos ${err}`})
	    return res.status(200).send( { 
	      message: 'Usuario creado correctamente',
	    })
	  })
	}else{
		res.status(500).send('No mandes request vacias');
	}
}


// LAS DOS FUNCIONES SIGUIENTES SIRVEN PARA ACTIVAR O DESACTIVAR EL USUARIO (BORRADO LÓGICO)
// PARA USARLAS, EL USUARIO TIENE QUE SER PASADO COMO BODY AL HACER LA PETICIÓN.
function deactivate(req, res) {
  var input = req.body
  input.isActive = false
  User.findOneAndUpdate({userName: input.user}, input, (err, updated) => {
    if(err) return res.status(500).send({message: `Error al desactivar el usuario ${err}`})
    if(!updated) return res.status(404).send({message: 'Error 404' })

    res.status(200).send({updated})
  })
}

function activate(req, res) {
  var input = req.body
  input.isActive = true
  User.findOneAndUpdate({userName: input.user}, input, (err, updated) => {
    if(err) return res.status(500).send({message: `Error al activar el usuario ${err}`})
    if(!updated) return res.status(404).send({message: 'Error 404' })

    res.status(200).send({updated})
  })
}


// ESTA FUNCIÓN DEVUELVE TODOS LOS USUARIOS ACTIVOS
function getActiveUsers(req, res) {
  User.find({isActive: true}, (err, users) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al realizar la petición: ${err}` });
    if (!users) return res.status(404).send({ message: "No existen usuarios" });

    res.status(200).send({ users });
  });
}
// ESTA FUNCIÓN DEVUELVE TODOS LOS USUARIOS
function getAllUsers(req, res) {
  User.find({}, (err, users) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al realizar la petición: ${err}` });
    if (!users) return res.status(404).send({ message: "No existen usuarios" });

    res.status(200).send({ users });
  });
}
// ESTA FUNCIÓN DEVUELVE LOS USUARIOS INACTIVOS
function getInactiveUsers(req, res) {
  User.find({isActive: false}, (err, users) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al realizar la petición: ${err}` });
    if (!users) return res.status(404).send({ message: "No existen usuarios" });

    res.status(200).send({ users });
  });
}

function getUser(req, res) {
  let userId = req.params.userId;

  User.findById(userId, (err, user) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al realizar peticion: ${err}` });
    if (!user) return res.status(404).send({ message: `El usuario no existe` });
    res.status(200).send({ user });
  });
}

function updateUser(req, res) {
  let updated = req.body;
  let userId = req.params.userId;

  User.findOneAndUpdate(userId, updated, (err, oldUser) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al actualizar usuario: ${err}` });
    res.status(200).send({ oldUser });
  });
}

function deleteUser(req, res) {
  let userId = req.params.userId;

  User.findById(userId, (err, user) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al borrar usuario: ${err}` });
    if (!user) return res.status(404).send({ message: `El usuario no existe` });
    user.remove(err => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al borrar usuario: ${err}` });
      res.status(200).send({ message: `El usuario ha sido borrado` });
    });
  });
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getActiveUsers,
  getAllUsers,
  getInactiveUsers,
  activate,
  deactivate
 // logUser
};
