const express = require('express');
const catControllers = require('../controllers/cats');

const router = express.Router();

router.post('/', catControllers.create);

module.exports = router;
