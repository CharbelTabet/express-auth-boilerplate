// CALL packages
const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

// CALL routers
const users = require('./controllers/users.js');
const privateroutes = require('./controllers/privateroute.js')


// CONNECT to database
mongoose.connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(() => console.log('Connected to DB'))
.catch((err) => console.log(`DB connection Error ${err}`));


// CONFIGURE express app
app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} '${req.url}'`);
    next();})


// USE routers
app.use('/users', users);
app.use('/private', privateroutes);

// USE other middlewares
app.use((req, res) => res.status(404).json(`404, ${req.url} not found`))


// CORS server
PORT =  process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Authentication API listening at port ${PORT}`));
