const express = require('express');
const router = express.Router();
const pkmController = require('../controllers/pokemon.controller.js');
//const auth = require('./middlewares/auth.js');
const { authenticate } = require('../middlewares/auth.js');

//Create a new Pkm
router.post('/', pkmController.create);
router.get('/',authenticate ,pkmController.findAll);
router.get('/:pkmid', pkmController.findOne);
router.put('/:pkmid', pkmController.update);
router.delete('/:pkmid', pkmController.delete);

module.exports = router;