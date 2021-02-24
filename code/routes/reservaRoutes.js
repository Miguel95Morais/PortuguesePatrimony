var express = require('express');
var router = express.Router();
var rModel = require("../models/reservaModel");

/* GET reservas. */
router.get('/', async function (req, res, next) {
    let result = await rModel.getAll();
    res.status(result.status).
        send(result.data);
});


module.exports = router;