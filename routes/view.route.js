const express = require('express');
const { getData } = require('../controller/dataApi');
const router = express.Router();


router.get('/', getData)

module.exports = router;

