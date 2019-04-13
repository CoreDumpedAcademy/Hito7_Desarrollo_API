const bcrypt = require('bcrypt');
const helpers = {};

 helpers.encriptarPassword = async (password) => {
  try{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
	}catch(e){
		console.log(e);
	}
};
/*helpers.encriptarPassword = async (password, userName) => {
    const salt = 10;
    const hash = await bcrypt.hash(password + userName, salt);
    return hash;
};*/

helpers.compararPassword = (password, savedPassword) => {
	let hashesIguales = false;
    try {
        return  bcrypt.compareSync(password, savedPassword);
    } catch (e) {
        console.log(e)
    }
};


module.exports = helpers;
