
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
// A ESTA FUNCION SE LE PASA COMO PARAMETRO UN USUARIO Y TE DEVUELVE LAS NOTICIAS FAVORITAS DE ESTE USER
function showFavNews(req, res){
  var param = req.params.user
  User.find({userName: param}, (err, user)=>{
    if (err) return res.status(500).send({message:`Error al buscar al usuario ${err}`})
    if (!user) return res.status(404).send({message:`El usuario no existe`})
    console.log(user.favNews)
    /*for(var i=0;i<user.favNews.length;i++){
      console.log("patata")
    }*/
    res.status(200).send({message:"hola"})
  })
}
// A ESTA FUNCION SE LE PASAN DOS PARAMETROS: EL USUARIO Y LA NOTICIA. LA NOTICIA VA EN EL BODY. AÑADE DICHA NOTICIA A SUS FAVS
// LA ESTRUCTURA DEL BODY ES _id: {string}, url: {string}. Esto se puede modificar facilmente en el modelo de usuario.
function addFavNew(req, res){
  var noticia = req.body.title
  console.log(noticia)
  console.log(req.params.user)
  User.findOneAndUpdate({userName: req.params.user}, {$push: {favNews: noticia}}, (err, updated)=>{
    if(err) return res.status(500).send({message: `Error al actualizar el usuario ${err}`})
    if(!updated) return res.status(404).send({message: "El usuario no existe"})
    return res.status(200).send({message: "Usuario actualizado correctamente"})
  })
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserList,
  showFavNews,
  addFavNew,
 // logUser
};
