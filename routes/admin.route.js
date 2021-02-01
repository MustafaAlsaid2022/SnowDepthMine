const express = require('express');
const { logIn } = require('../controller/adminApi');
const router = express.Router();

router.post('/login', logIn)

module.exports = router;