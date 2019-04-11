
const User = require("../models/user.model");
const enume = require("../middlewares/enumStructures");
const helpers = require('../lib/helpers.js');
//Login de usuarios, recibimos los parametros en el body de la peticion post, comprobamos que el user existe y comparamos la pw enviada con el hash almacenado.
function logUser(req, res) {
  const logUser = req.body;
  let logueado = false;
  User.findOne({ userName: logUser.userName }, function(err, user){
    if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` });
	console.log(user);
    if (!user) return res.status(404).send({ message: "El usuario no existe" });
    logueado = helpers.compararPassword(logUser.password.toString(), user.password.toString());
    if(logueado){
    	return res.status(200).send({message: "Te has logueado correctamente"});
    }else{
    	return res.status(404).send({ message: "Usuario o contraseña incorrectos" });
    }
  });
}
//Creamos el user, hasemos la pw que recibis en el body del request.
async function createUser (req, res) {
  let user = null;
  if(req.body != null){
	  console.log(req.body);
	  user = new User();
	  user.userName = req.body.userName;
	  user.firstName = req.body.firstName;
	  user.lastName = req.body.lastName;
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
//Devuelve una lista con todos los users de la BD.
function getUserList(req, res) {
  User.find({}, (err, users) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al realizar la petición: ${err}` });
    if (!users) return res.status(404).send({ message: "No existen usuarios" });

    res.status(200).send({ users });
  });
}
//Devuelve el user al que corresponde el id dado.
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
//actualizamos la informacion del usuario, hasheamos su pw.
async function updateUser(req, res) {
  let updated = req.body;
  let userId = req.params.userId;
  let hash = await helpers.encriptarPassword(updated.password);
  updated.password = hash;
  console.log(updated);
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
  getUserList,
  logUser,
};
