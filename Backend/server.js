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

const server = app.listen(process.env.PORT, () => {
    console.log("Server is running");
});

process.on("unhandledRejection", (err) => {
    console.log('Shutting down the server.');
    console.log('Shutting down the server for unhandle promise rejection');

    server.close(() => {
        process.exit(1);
    });
});

