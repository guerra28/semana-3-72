const express = require('express');
const apiRouter = require('./routes')
const db = require('./models');
const cors = require("cors")
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')


const app = express();
app.use(cors());


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// API ENDPOINTS
app.use('/api', apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})

module.exports = app;