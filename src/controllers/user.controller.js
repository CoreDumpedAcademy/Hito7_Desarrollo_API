const User = require("../models/user.model");
const enume = require("../middlewares/enumStructures");
const helpers = require('../lib/helpers.js');
const service = require('../service');
const newsStrc = require('../middlewares/newsStructures');
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
      res.status(500).send({
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
      }else{
      return res.status(200).send({
        token: service.createToken(user)
      })
	}
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
function getCategories(req, res){
	User.findOne({email:req.body.email}, (err, user)=>{
		if(err){ 
			res.status(500).send(`Error: ${err}`);
			return next(err)
		}else{ 
		return res.status(200).send(user.statistics.categoryViews);
		}
	});
}
//Funcion que saca el array categoryViews, lo actualiza y lo vuelve a guardar.
//Sería mas eficiente hacerlo desde el modelo, por el hecho de no tener que sacarlo y luego meterlo pero no lo consigo hacer.
async function  addCategory(req, res, next){
	try{
		const reqCategory = req.body.category;
		const reqEmail = req.body.email;
		let categories =  [];
		let categorySchema;
		if(reqCategory != null && reqEmail != null){
			await User.findOne({email:reqEmail}, (err, user) =>{
				if(err){ 
					res.status(500).send('HA OCURRIDO UN ERROR'); 
					return next(err);
				}
				if(user){
					categories = user.statistics.categoryViews;
				}else{
					console.log('User no encontrado');
					res.status(500).send("no user");
				}
			});
			categories.forEach((element) => {
				if(element.categoryName == reqCategory)element.views = element.views + 1;
			});
			User.findOneAndUpdate({email:reqEmail}, {$set:{statistics:{categoryViews:categories}}}, (err, user) =>{
				if(err) return res.status(500).send("Error: " + err);
				res.status(200).send('ok');
			});
		}
	}catch(e){
		console.log(e);
	}
}
async function addKeyWord(req, res){
	const kw = req.body.q;
	const reqEmail = req.body.email;
	let kwArray = [];
	let finded = false;
	if(reqEmail != null && kw != null){
		await User.findOne({email:reqEmail}, (err, user) =>{
			if(err) return res.status(500).send("ERROR: " + err);
			if(user){
				kwArray = user.statistics.mostUsedKeyWords;
				console.log('Recibimos: ' + user.statistics.mostUsedKeyWords + ' Almacenamos: ' + kwArray);
				res.status(200).send(kwArray);
			}
		});
		console.log('oldKwArray: ' + kwArray);
		if(kwArray != []){
			kwArray.forEach((element) =>{
				console.log(element);
				if(element.name == kw){
					element.counter = element.counter + 1;
					element.lastView = Date.now();
					finded = true;
				}
			});
			if(!finded){
				let newKw = {
					name:kw,
					counter:1,
					lastView:Date.now(),
				}
				kwArray.push(newKw);
			}
		User.findOneAndUpdate({email:reqEmail}, {$set:{statistics:{mostUsedKeyWords:kwArray}}}, err =>{
				if(err)console.log("Ya la has liao: " + err)
		});
		}
	}
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
	const reqEmail = req.params.email;
	User.findOne({email:reqEmail}, (err, user) =>{
		if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
		if(!user) return res.status(404).send({message: 'Usuario no encontrado'});
		return res.status(200).send({user})
	});
}
function newSearch(req, res){
	const reqEmail = req.body.email;
	let date = Date.now();
		console.log('Date: ' + date + ' mail: ' + reqEmail);
	if(reqEmail != null){
		User.findOneAndUpdate({email:reqEmail}, {$push:{searchTimes:date}}, (err, updated) =>{
				if(err){
				 res.status(500).send('Error: ' + err);
				}else{
				 res.status(200).send('ok');
				}
		});
	}
}
function newRead(req, res){
	const reqEmail = req.body.email;
	let date = Date.now();
		console.log('Date: ' + date + ' mail: ' + reqEmail);
	if(reqEmail != null){
		User.findOneAndUpdate({email:reqEmail}, {$push:{readTimes:date}}, (err, updated) =>{
				if(err){
				 res.status(500).send('Error: ' + err);
				}else{
				 res.status(200).send('ok');
				}
		});
	}
}
function newLogin(req, res){
	const reqEmail = req.body.email;
	let date = Date.now();
		console.log('Date: ' + date + ' mail: ' + reqEmail);
	if(reqEmail != null){
		User.findOneAndUpdate({email:reqEmail}, {$push:{loginTimes:date}}, (err, updated) =>{
				if(err){
				 res.status(500).send('Error: ' + err);
				}else{
				 res.status(200).send('ok');
				}
		});
	}
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
  addCategory,
  getCategories,
  addKeyWord,
  newSearch,
  newRead,
  newLogin,
};
