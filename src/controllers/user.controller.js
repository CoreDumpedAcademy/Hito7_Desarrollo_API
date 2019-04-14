const User = require("../models/user.model");
const enume = require("../middlewares/enumStructures");
const helpers = require('../lib/helpers.js');
const service = require('../service');
/*
//Login de usuarios, recibimos los parametros en el body de la peticion post, comprobamos que el user existe y comparamos la pw enviada con el hash almacenado.
async function logUser(req, res) {
  const logUser = req.body;
  let logueado = false;
  User.findOne({ email: logUser.email }, async function (err, user) {
    if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` });
    console.log(user);
    if (!user) return res.status(404).send({ message: "El usuario no existe" });
    logueado = await helpers.compararPassword(logUser.password.toString(), user.password.toString());
    if (logueado) {
      return res.status(200).send({ message: "Te has logueado correctamente" });
    } else {
      return res.status(404).send({ message: "Usuario o contraseña incorrectos" });
    }
  });
}
*/

// Funcion logUser Modificado

function logUser(req, res) {
  var logged = false
  User.findOne({
    email: req.body.email
  }, async (err, user) => {
    if (err)
      return res.status(500).send({
        message: err
      })
    if (!user)
      return res.status(404).send({
        message: 'No existe el usuario,'
      })

    req.user = user
    logged = await helpers.compararPassword(req.body.password + "", user.password + "")

    if (logged) {
      res.status(200).send({
        message: 'Login Correcto',
        token: service.createToken(user)
      })
    } else {
      res.status(200).send({
        message: 'Contraseña incorrecta',
      })
    }

  })
}
/*
// Crear usuario
async function createUser (req, res) {
  if(req.body != null){
    console.log(req.body);
    var user = new User(req.body)
    user.password = await helpers.encriptarPassword(req.body.password)
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
*/

// Funcion crear usuario modificada
function createUser(req, res, next) {
  console.log('POST /api/user')
  console.log(req.body)

  var user = new User(req.body)

  User.findOne({
    email: req.body.email
  }, (err, existingUser) => {
    if (existingUser) {
      return res.status(400).send('Este email ya esta registrado');
    }
    user.save((err) => {
      if (err) {
        res.status(500).send({
            message: 'Error al crear el usuario'
          }),
          next(err);
      }
      return res.status(200).send({
        token: service.createToken(user)
      })
    })
  })
}


// LAS DOS FUNCIONES SIGUIENTES SIRVEN PARA ACTIVAR O DESACTIVAR EL USUARIO (BORRADO LÓGICO)
// PARA USARLAS HAY QUE PASAR COMO PARAMETRO EL NOMBRE DE USUARIO AL QUE ACTIVAR - DESACTIVAR
function deactivate(req, res) {
  var username = req.params.username
  User.findOne({
    userName: username
  }, (err, updated) => {
    if (err) return res.status(500).send({
      message: `Error al desactivar el usuario ${err}`
    })
    if (!updated) return res.status(404).send({
      message: 'Error 404'
    })
    updated.isActive = false
    User.findOneAndUpdate({
      userName: username
    }, updated, () => {
      return res.status(200).send({
        message: 'User deactivated correctly'
      })
    })
  })
}

function activate(req, res) {
  var username = req.params.username
  User.findOne({
    userName: username
  }, (err, updated) => {
    if (err) return res.status(500).send({
      message: `Error al desactivar el usuario ${err}`
    })
    if (!updated) return res.status(404).send({
      message: 'Error 404'
    })
    updated.isActive = true
    User.findOneAndUpdate({
      userName: username
    }, updated, () => {
      return res.status(200).send({
        message: 'User deactivated correctly'
      })
    })
  })
}


// ESTA FUNCIÓN DEVUELVE TODOS LOS USUARIOS ACTIVOS
function getActiveUsers(req, res) {
  User.find({
    isActive: true
  }, (err, users) => {
    if (err)
      return res
        .status(500)
        .send({
          message: `Error al realizar la petición: ${err}`
        });
    if (!users) return res.status(404).send({
      message: "No existen usuarios"
    });

    res.status(200).send({
      users
    });
  });
}
// ESTA FUNCIÓN DEVUELVE TODOS LOS USUARIOS
function getAllUsers(req, res) {
  User.find({}, (err, users) => {
    if (err)
      return res
        .status(500)
        .send({
          message: `Error al realizar la petición: ${err}`
        });
    if (!users) return res.status(404).send({
      message: "No existen usuarios"
    });

    res.status(200).send({
      users
    });
  });
}
// ESTA FUNCIÓN DEVUELVE LOS USUARIOS INACTIVOS
function getInactiveUsers(req, res) {
  User.find({
    isActive: false
  }, (err, users) => {
    if (err)
      return res
        .status(500)
        .send({
          message: `Error al realizar la petición: ${err}`
        });
    if (!users) return res.status(404).send({
      message: "No existen usuarios"
    });

    res.status(200).send({
      users
    });
  });
}

function getUser(req, res) {
  let userId = req.params.userId;

  User.findById(userId, (err, user) => {
    if (err)
      return res
        .status(500)
        .send({
          message: `Error al realizar peticion: ${err}`
        });
    if (!user) return res.status(404).send({
      message: `El usuario no existe`
    });
    res.status(200).send({
      user
    });
  });
}

async function updateUser(req, res) {
  let userID = req.params.userId
  let update = req.body
  update.password = await helpers.encriptarPassword(req.body.password);

  User.findByIdAndUpdate(userID, update, (err, oldUser) => {
    if (err) res.status(500).send({
      message: `Error al actualizar el usuario: ${err}`
    })

    res.status(200).send({
      user: oldUser
    })
  })
}

function deleteUser(req, res) {
  let userId = req.params.userId;

  User.findById(userId, (err, user) => {
    if (err)
      return res
        .status(500)
        .send({
          message: `Error al borrar usuario: ${err}`
        });
    if (!user) return res.status(404).send({
      message: `El usuario no existe`
    });
    user.remove(err => {
      if (err)
        return res
          .status(500)
          .send({
            message: `Error al borrar usuario: ${err}`
          });
      res.status(200).send({
        message: `El usuario ha sido borrado`
      });
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
  deactivate,
  logUser
};