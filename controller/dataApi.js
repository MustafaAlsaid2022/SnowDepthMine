const sensorList = require("../sensors");
const { getTheNewestData } = require('../data');
const { sendEmail } = require('../sendEmail');

let data = []

const getData = (req, res) => {
    getTheNewestData().then(result =>{
        data = result
        // console.log(data)
      })
      res.status(200).json(data)
      }
    
      module.exports = { getData }