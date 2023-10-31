// const express = require('express');
// const app = express();
const app = require('./app.js')
const connectDatabase = require("./db/connectDb.js");
require('dotenv').config();

// Handling exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server.')
})
connectDatabase();

app.listen(process.env.PORT, () => {
    console.log("Server is running");
});