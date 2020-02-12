const Film = require("../../models/film");
const omit = require("lodash/omit");
const comment = require("../../models/comment");
const omdbapi = require("../thirdPartyAPI/omdbapi");
const lang = require("../lang");

module.exports = {
  idNotFound: async (req, res) => {
    return res.status(400).json({ message: lang.idNotFound });
  },
  getFilm: async (req, res) => {
    const { id } = req.params;
    try {
      const film = await Film.findOne({ id }).populate("comments");
      if (film) {
        return res.json(film);
      } else {
        return res.status(400).json({ message: lang.filmNotFound });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const films = await Film.find().populate("comments");
      return res.json(films);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  create: async (req, res) => {
    const { id } = req.params;
    try {
      const filmExist = await Film.findOne({ id }).populate("comments");
      if (filmExist) return res.json(filmExist);

      const details = await omdbapi.getFilmDetailsById(id);
      const film = await Film.create({
        details,
        id
      });
      await film.save();
      return res.json(film);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
};
