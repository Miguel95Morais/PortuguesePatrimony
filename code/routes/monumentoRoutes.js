var express = require('express');
var router = express.Router();
var mntoModel = require("../models/monumentoModel");

/* GET all monumentos */
router.get('/', async function (req, res, next) {
    let filterObj = req.query;
    let result = await mntoModel.getAll(filterObj);
    res.status(result.status).
        send(result.data);
});

/*
router.get('/filtered', async function(req, res, next) {
  let title = req.query.title;
  let artist = req.query.artist;
  let result = await albModel.getFiltered(title,artist);
  res.status(result.status).
     send(result.data);
});
*/



/* GET one monumento */

// /api/albuns/3
router.get('/:id', async function (req, res, next) {
    let monumento_id = req.params.id;
    let result = await mntoModel.getOne(monumento_id);
    res.status(result.status).
        send(result.data);
});


/* GET all albuns */
router.post('/', async function (req, res, next) {
    let monumento = req.body;
    let result = await mntoModel.save(monumento);
    res.status(result.status).
        send(result.data);
});


module.exports = router;