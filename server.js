if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const filmsRouter = require("./routes/film");
var port = process.env.PORT || 8080;
var DB_URL = process.env.DATABASE_URL;

class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.db = this.database();
        this.routes();
        this.server.listen(port, () => console.log("server started"));
    }

    middlewares() {
        this.server.use(express.json());
    }

    database() {
        mongoose.connect(DB_URL, { useNewUrlParser: true });
        const db = mongoose.connection;
        db.on("error", error => console.error(error));
        db.once("open", () => console.log("connected to database"));
        return db;
    }

    routes() {
        this.server.use("/", filmsRouter);
    }
}

module.exports = new App();