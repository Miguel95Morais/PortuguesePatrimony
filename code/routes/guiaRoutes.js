var express = require('express');
var router = express.Router();
var gModel = require("../models/guiaModel");

/* GET all monumentos */
router.get('/', async function (req, res, next) {
    let result = await gModel.getAll();
    res.status(result.status).
        send(result.data);
});


module.exports = router;