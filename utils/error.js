//Funcion que instancia objeto de Error con mensaje y codigo que decidas.
function err(message, code) {
    let e = new Error(message);

    if (code) {
        e.statusCode = code;
    }

    return e;
}

module.exports = err;
