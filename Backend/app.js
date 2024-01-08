const express = require("express");
const ErrorHandler = require('./utils/ErrorHandler.js');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require("./controller/userControllers.js");
const shopRoute = require("./controller/shopControllers.js");
const productRoute = require("./controller/productControllers.js");
const eventRoute = require("./controller/eventControllers.js");
const orderRoute = require("./controller/orderControllers.js");
const coupounRoute = require('./controller/coupounCode.js');
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
}

bodyParser.json([this.options]);
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/",express.static("uploads"))
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}));


app.use("/api/user", userRoute);
app.use("/api/shop", shopRoute);
app.use("/api/product", productRoute);
app.use("/api/event", eventRoute);
app.use("/api/order", orderRoute);
app.use("/api/coupoun", coupounRoute);
app.use(ErrorHandler);

module.exports = app;