'use strict'
// Load modules:
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');

// Load models:
const Product = require('./models/modelProduct');
const Customer = require('./models/modelCustomer');
const Order = require('./models/modelOrder');
const Event = require('./models/modelEvent');

//Load Controllers:
const product = require('./controllers/controllerProduct');
const customer = require('./controllers/controllerCustomer');
const order = require('./controllers/controllerOrder');
const event = require('./controllers/controllerEvent');

// Load routes:
const routeIndex = require('./routes');
const routeProduct = require('./routes/routeProduct');
const routeCustomer = require('./routes/routeCustomer');
const routeOrder = require('./routes/routeOrder');
const routeEvent = require('./routes/routeEvent');

const router = express.Router();
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routeIndex);
app.use('/products', routeProduct);
app.use('/customers', routeCustomer);
app.use('/orders', routeOrder);
app.use('/events', routeEvent);

module.exports = app;