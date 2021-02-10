const express = require('express');
const { logIn, logOut } = require('../controller/adminApi');
const router = express.Router();

router.post('/login', logIn)
router.get('/logout', logOut)

module.exports = router;
