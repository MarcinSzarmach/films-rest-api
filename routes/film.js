const express = require("express");
const router = new express.Router();

const Film = require("../controllers/film");
const Comment = require("../controllers/comment");

router.get("/", (req, res) => res.send("ok"));

// movies routes
router.get("/movies", Film.getAll);
router.get("/movies/:id", Film.getFilm);
router.post("/movies/:id", Film.create);
router.post("/movies", Film.idNotFound);

// comments routes
router.get("/comments", Comment.getAll);

router.post("/comments", Comment.idNotFound);
router.post("/comments/:id", Comment.create);

module.exports = router;
