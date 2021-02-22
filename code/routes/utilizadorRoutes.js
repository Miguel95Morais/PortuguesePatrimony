var express = require('express');
var router = express.Router();
var utilizadorModel = require("../models/utilizadorModel");


router.get('/SignInInfo/', async function (req, res, next) {
    let utilizador = req.query;
    let result = await utilizadorModel.signin(utilizador);
    res.status(result.status).
        send(result.data);
});



router.post('/newUtilizador', async function (req, res, next) {
    let utilizador = req.body;
    let result = await utilizadorModel.newUtilizador(utilizador);
    res.status(result.status).
        send(result.data);
});

module.exports = router;