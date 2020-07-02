const bcrypt = require('bcrypt');

const auth = require('../../../auth');
const TABLA = 'auth';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    async function login(username, password) {
        //Se obtiene el usuario que tenga el username.
        const data = await store.query(TABLA, { username: username });
        
        //Se compara la pass encriptada y se devuelve token de login.
        return bcrypt.compare(password, data.password)
            .then(sonIguales => {
                if (sonIguales === true) {
                    // Generar token;
                    return auth.sign({ ...data })
                } else {
                    throw new Error('Informacion invalida');
                }
            });
    }

    async function upsert(data) {
        //Se inserta nuevo registro con su pass encriptada o se actualiza la data disponible.
        const authData = {
            id: data.id,
        }

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            authData.password = await bcrypt.hash(data.password, 5);
        }

        return store.upsert(TABLA, authData);
    }

    return {
        login,
        upsert,
    };
};