const User = require("../models/user.model");
const enume = require("../middlewares/enumStructures");
const helpers = require('../lib/helpers.js');
const service = require('../service');


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
      res.status(403).send({
        message: 'Contraseña incorrecta',
      })
    }

  })
}


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
  let mail = req.params.email;

  User.findOne({email:mail}, (err, user) => {
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

  User.findOneAndUpdate({userName:userID}, update, (err, oldUser) => {
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

// ESTA FUNCION RECIBE UN USUARIO POR PARAMETRO Y UNA NOTICIA EN EL BODY DE LA PETICIÓN. GUARDA LA NOTICIA EN EL ARRAY DE NOTICIAS FAVORITAS DEL USUARIO
function addFavNew(req, res){
  var noticia = req.body
  console.log(noticia)
  console.log(req.params.user)
  User.findOneAndUpdate({userName: req.params.user}, {$push: {favNews: noticia}}, (err, updated)=>{
    if(err) return res.status(500).send({message: `Error al actualizar el usuario ${err}`})
    if(!updated) return res.status(404).send({message: "El usuario no existe"})
    return res.status(200).send({message: "Usuario actualizado correctamente"})
  })
}
// ESTA FUNCIÓN OBTIENE UN INDICE DE ARRAY Y BORRA EL OBJETIO NOTICIA DE LA POSICION INDICE DEL ARRAY DE NOTICIAS DEL USUARIO
function deleteFavArt(req,res){
  var usern = req.params.user
  var index = req.params.index
  console.log(`ARTICLE DELETING ${usern} - ${index}`)
  User.findOne({userName:usern}, (err, user) => {
    if(err) return res.status(500).send({message: `Error al borrar la noticia: ${err}`})
    if(!user) return res.status(404).send({message: "Usuario no encontrado"})
    console.log(user.favNews.splice(index, 1))
    User.findOneAndUpdate({userName:usern}, user, (err, updated) => {
      if(err) return res.status(500).send({message: `Error ${err}`})
      return res.status(200).send({message: "Noticia eliminada correctamente"})
    })
  })
}

function getByUsername(req, res){
  const username = req.params.username
  console.log(`GET by USERNAME ${username}`)
  User.find({userName: username},(err, user) => {
    if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if(!user) return res.status(404).send({message: 'Usuario no encontrado'})
    return res.status(200).send({user})
  })
}
function getByEmail(req, res){
  console.log("GET by EMAIL "+req.params.email)
	const reqEmail = req.params.email;
	User.findOne({email:reqEmail}, (err, user) =>{
		if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
		if(!user) return res.status(404).send({message: 'Usuario no encontrado'});
		return res.status(200).send({user})
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
  logUser,
  addFavNew,
  getByUsername,
  getByEmail, 
  deleteFavArt,
};
