const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers/userController.js');

router.post('/', userController.create);
router.get('/', userController.findAll);
router.post('/login', userController.login);

module.exports = router;
