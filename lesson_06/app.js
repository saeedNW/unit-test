const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const {DBConnection} = require("./config/db");
const {initializeRoutes} = require("./app/routes");



dotenv.config({path: `${__dirname}/.env`});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));


DBConnection()
    .then((conn) => {
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`));
        initializeRoutes(app)
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    })


module.exports = app;