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
  origin: process.env.UI_URL,
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET, PUT, POST",
  credentials: true
}

const app = express();
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// app.use(function (request, response, next) {
//   response.header("Access-Control-Allow-Origin", "*");
//   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(cors(corsOptions));
// app.use(cors({credentials: true, origin: 'http://localhost:4000'}));
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
