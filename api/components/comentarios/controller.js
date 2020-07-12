const nanoid = require('nanoid');

const TABLA = 'comentarios';

module.exports = function (injectedStore) {
    let store = injectedStore;
	
    if (!store) {
        store = require('../../../store/dummy');
    }

    async function list() {

        comentarios = await store.list(TABLA);
        
        return comentarios;
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    async function upsert(body) {
        const comentario = {
            texto: body.texto,
        }

        comentario.id = nanoid();

        return store.upsert(TABLA, comentario);
    }

    return {
        list,
        get,
        upsert
    };
}