const bcrypt = require('bcrypt');
const helpers = {};

 helpers.encriptarPassword = async (password) => {
    const salt = bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};
/*helpers.encriptarPassword = async (password, userName) => {
    const salt = 10;
    const hash = await bcrypt.hash(password + userName, salt);
    return hash;
};*/

helpers.compararPassword = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (e) {
        console.log(e)
    }
};


module.exports = helpers;
