const response = require('./response');

//Middleware de errores que se apila al final del stack para capturar error y devolver la respuesta apropiada.
function errors(err, req, res, next) {
    console.error('[error]', err);

    const message = err.message || 'Error interno';
    const status = err.statusCode || 500;

    response.error(req, res, message, status);
}

module.exports = errors;
