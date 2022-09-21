const Post = require("../models/post");

//////////// LIKER UN POST ////////////
exports.likePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      let find = post.likers.includes(req.auth.userId);

      // Si l'utilisateur n'a pas déjà liké => Ajoute son nom dans l'Array
      if (find == false) {
        res.status(200).json({ message: "Post liké !" });
        Post.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { likers: req.auth.userId } },
          { new: true }
        ).catch((error) => res.status(400).json({ error }));
        // Si l'utilisateur à déjà liké
      } else {
        res.status(400).json("Post déjà liké !");
      }
    })
    .catch((error) => {
      res.status(404).json({ error: error });
    });
};

//////////// UNLIKER UN POST ////////////
exports.unlikePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      let find = post.likers.includes(req.auth.userId);

      // Si l'utilisateur n'a pas déjà unliké => Ajoute son nom dans l'Array
      if (find) {
        res.status(200).json({ message: "Post unliké !" });
        Post.findOneAndUpdate(
          { _id: req.params.id },
          { $pull: { likers: req.auth.userId } },
          { new: true }
        ).catch((error) => res.status(400).json({ error }));
        // Si l'utilisateur à déjà unliké
      } else {
        res.status(400).json("Post déjà unliké !");
      }
    })
    .catch((error) => {
      res.status(404).json({ error: error });
    });
};
