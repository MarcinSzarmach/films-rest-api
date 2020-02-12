if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require("express");
const app = express();
const mongoose = require("mongoose");
var port = process.env.PORT || 8080;

console.logger = function(...args) {
    // here we can add some custom logger function to collect errors, right now its juts console.log
    console.log(...args);
    // throw Error(...args);
};

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.logger("connected to database"));

app.use(express.json());

const filmsRouter = require("./routes/film");
app.use("/", filmsRouter);

app.listen(port, () => console.logger("server started"));