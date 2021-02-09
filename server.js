const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

require('dotenv').config()

// Express Route
const sensorRoutes = require('./routes/sensor.route')
const viewRoutes = require('./routes/view.route')
const adminRoutes = require('./routes/admin.route')


const app = express();
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/sensors', sensorRoutes)
app.use('/view', viewRoutes)
app.use('/users', adminRoutes)


// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})



app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
