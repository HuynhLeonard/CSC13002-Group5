const express = require("express");
const ErrorHandler = require('./utils/ErrorHandler.js');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require("./controller/userControllers.js");

bodyParser.json([this.options]);
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/",express.static("uploads"))
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}));

app.use("/api/user", userRoute);

app.use(ErrorHandler);

module.exports = app;