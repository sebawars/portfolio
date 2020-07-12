const config = require('../../../config');

let store = require('../../../store/dummy');

const ctrl = require('./controller');

module.exports = ctrl(store);