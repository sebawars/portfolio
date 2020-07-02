const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const secret = config.jwt.secret;

//Firmamos con el secret
function sign(data) {
    return jwt.sign(data, secret);
}

//Verificamos que esté firmado con el secret
function verify(token) {
    return jwt.verify(token, secret)
}

//Verificamos estructura y limpiamos palabra "Bearer"
function getToken(auth) {
    if (!auth) {
        throw error('No viene token', 401);
    }

    if (auth.indexOf('Bearer ') === -1) {
        throw error('Formato invalido', 401);
    }

    let token = auth.replace('Bearer ', '');
    return token;
}

//Sacamos el token del header, lo verificamos con el secret y seteamos el userId a nivel objeto request.
function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}


const check = {
	//Controlamos que el id extraido del token sea el id que buscamos.
    own: function(req, owner) {
        const decoded = decodeHeader(req);
        console.log(decoded);

        if (decoded.id !== owner) {
            throw error('No puedes hacer esto', 401);
        }
    },

	//Se decodifica el token para validar si tiene error
    logged: function(req, owner) {
        const decoded = decodeHeader(req);
    },
}


module.exports = {
    sign,
    check,
};