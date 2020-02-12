const Film = require("../../models/film");
const Comment = require("../../models/comment");
const lang = require("../lang");

module.exports = {
    idNotFound: async(req, res) => {
        return res.status(400).json({ message: lang.idNotFound });
    },
    getAll: async(req, res) => {
        try {
            const comments = await Comment.find();
            return res.status(200).json(comments);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    create: async(req, res) => {
        const { id } = req.params;
        const { value } = req.body;
        try {
            const film = await Film.findOne({ id });
            if (!film) {
                return res.status(400).json({ message: lang.filmNotFound });
            }
            const comment = await Comment.create({
                id,
                value,
                film: film._id
            });
            await comment.save();
            film.comments.push(comment);
            await film.save();
            return res.send(comment);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
};