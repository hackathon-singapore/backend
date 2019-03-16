const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const container = require('./container');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
var User = require("./models/user");

container.resolve(function (Users , _, routes) {

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/Indegenous');

    const app = SetupExpress();

    function SetupExpress() {
        const app = express();
        const server = http.createServer(app);
        server.listen(process.env.PORT || 3000,function () {
            console.log("Server started on port 3000!!!");
        });
        ConfigureExpress(app);

        //Setup Router
        const router = require('express-promise-router')();
        routes.SetRouting(router);
        app.use(router);
    }

    function ConfigureExpress(app) {
        app.use(express.static('public'));
        app.use(cookieParser());
        app.set('view engine', 'ejs');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(session({
            secret: "Can't tell you it's super secret!",
            resave: true,
            saveUninitialized: true,
            store: new MongoStore({ mongooseConnection: mongoose.connection })
        }))
        app.locals._ = _;
    }
});