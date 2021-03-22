const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('dotenv').config()

// Express Route
const sensorRoutes = require('./routes/sensor.route')
const viewRoutes = require('./routes/view.route')
const adminRoutes = require('./routes/admin.route')

var corsOptions = {
  origin: 'https://snow-depth-ui.azurewebsites.net',
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET, PUT"
}

const app = express();
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors(corsOptions));
app.use('/sensors', sensorRoutes)
app.use('/view', viewRoutes)
app.use('/users', adminRoutes)
app.get('/', (req, res) => {
  res.send('Server is up and running.');
})


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
