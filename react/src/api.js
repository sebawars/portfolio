const config = require('../config.js');
const BASE_URL = `http://${config.server.domain}:${config.server.port}`;


const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const randomNumber = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const simulateNetworkLatency = (min = 30, max = 1500) =>
  delay(randomNumber(min, max));

async function callApi(endpoint, options = {}) {
  await simulateNetworkLatency();

  options.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const url = BASE_URL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
}

const api = {
  comentarios: {
    list() {
      return callApi('/comentarios');
    },
    create(comentarios) {
      // throw new Error('500: Server error');
      return callApi(`/comentarios`, {
        method: 'POST',
        body: JSON.stringify(comentarios),
      });
    },
    read(comentarioId) {
      return callApi(`/comentarios/${comentarioId}`);
    },
    update(comentarioId, updates) {
      return callApi(`/comentarios/${comentarioId}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
    },
    // Lo hubiera llamado `delete`, pero `delete` es un keyword en JavaScript asi que no es buena idea :P
    remove(comentarioId) {
      return callApi(`/comentarios/${comentarioId}`, {
        method: 'DELETE',
      });
    },
  },
};

export default api;