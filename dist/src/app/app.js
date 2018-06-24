"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");
var errorHandler = require("errorhandler");
var methodOverride = require("method-override");
var cors = require("cors");
var compression = require("compression");
var mongoose = require("mongoose");
var dotenv = require("dotenv");
dotenv.config();
var App = (function () {
    function App() {
        this.app = express();
        this.config();
        this.routes();
    }
    App.prototype.config = function () {
        var MONGO_URI = 'mongodb://localhost/test';
        mongoose.connect(process.env.MONGO_URI || MONGO_URI);
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(methodOverride());
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        this.app.use(errorHandler());
        this.app.use(compression());
        this.app.use(cors());
    };
    App.prototype.routes = function () {
        var router = express.Router();
        router.get('/', function (req, res) {
            res.status(200).send({
                message: 'Hello World!'
            });
        });
        router.post('/', function (req, res) {
            var data = req.body;
            res.status(200).send(data);
        });
        this.app.use('/', router);
    };
    return App;
}());
exports.default = new App().app;
//# sourceMappingURL=app.js.map