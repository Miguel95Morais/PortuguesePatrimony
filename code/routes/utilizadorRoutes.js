var express = require('express');
var router = express.Router();
var utilizadorModel = require("../models/utilizadorModel");


router.get('/SignInInfo/', async function (req, res, next) {
    let utilizador = req.query;
    let result = await utilizadorModel.signin(utilizador);
    res.status(result.status).
        send(result.data);
});



router.post('/novoUtilizador', async function (req, res, next) {
    let utilizador = req.body;
    let result = await utilizadorModel.novoUtilizador(utilizador);
    res.status(result.status).
        send(result.data);
});
/*sessionStorage.setItem("user_id", utilizador.user_id)
window.location = "index.html"*/

module.exports = router;