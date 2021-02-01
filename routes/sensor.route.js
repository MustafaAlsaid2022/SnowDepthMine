const express = require('express');
const { addSensor,getSensors, getOneSensor, updateSensor, deleteSensor } = require('../controller/sensorApi');
const router = express.Router();
const {auth} = require('../verifyToken')



// router.post('/', addSensor)

router.get('/',auth,  getSensors)

router.get('/:id',  getOneSensor)

router.put('/:id', auth, updateSensor)

router.delete('/:id',  deleteSensor)




module.exports = router;