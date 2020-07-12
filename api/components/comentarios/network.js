const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

// Routes
router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);

// Internal functions
function list(req, res, next) {

    ip = req.ips;

    console.log(ip);

    Controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200);
        })
        .catch(next);
}

function get(req, res, next) {
    Controller.get(req.params.id)
        .then((comentario) => {
            response.success(req, res, comentario, 200);
        })
        .catch(next);
}

function upsert(req, res, next) {
    Controller.upsert(req.body)
        .then((comentario) => {
            response.success(req, res, comentario, 201);
        })
        .catch(next);
}


module.exports = router;