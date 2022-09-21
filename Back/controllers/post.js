const Post = require("../models/post");
const fs = require("fs");
const user = require("../models/user");

//////////// CREER UN POST ////////////
exports.createPost = (req, res, next) => {
  // S'il y a une image
  if (req.file) {
    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    delete postObject._userId;
    const post = new Post({
      ...postObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    });
    post
      .save()
      .then(() => {
        res.status(201).json({ message: "Post enregistré !" });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
    // S'il n'y a pas d'image
  } else {
    const postObject = JSON.parse(req.body.post);
    delete req.body._id;
    delete postObject._userId;
    const post = new Post({
      ...postObject,
      userId: req.auth.userId,
    });
    post
      .save()
      .then(() => res.status(201).json({ message: "Post enregistré !" }))
      .catch((error) => res.status(400).json({ error }));
  }
};

//////////// RECUPERER UN POST ////////////
exports.getOnePost = (req, res, next) => {
  Post.findOne({
    _id: req.params.id,
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

//////////// MODIFIER UN POST ////////////
exports.modifyPost = (req, res, next) => {
  const postObject = req.file
    ? // S'il y a une image
      {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : // S'il n'y a pas d'image
      { ...req.body };

  delete postObject._userId;
  // Recherche si l'utilisateur à le statut administrateur
  user.findOne({ _id: req.auth.userId }).then((user) => {
    if (user.Admin) {
      // Si oui modification du post
      Post.findOne({ _id: req.params.id })
        .then(() => {
          Post.updateOne({ _id: req.params.id }, { ...postObject })
            .then(() => res.status(200).json({ message: "Post modifié!" }))
            .catch((error) => res.status(401).json({ error }));
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    } else {
      // Si non modification du post uniquement s'il en est le créateur (post.userId = req.auth.userId)
      Post.findOne({ _id: req.params.id })
        .then((post) => {
          if (post.userId != req.auth.userId) {
            res.status(401).json({ message: "Not authorized" });
          } else {
            Post.updateOne(
              { _id: req.params.id },
              { ...postObject, _id: req.params.id }
            )
              .then(() => res.status(200).json({ message: "Post modifié!" }))
              .catch((error) => res.status(401).json({ error }));
          }
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    }
  });
};

//////////// SUPPRIMER UN POST ////////////
exports.deletePost = (req, res, next) => {
  user
    .findOne({ _id: req.auth.userId })
    .then((user) => {
      // Recherche si l'utilisateur à le statut administrateur
      if (user.Admin) {
        Post.findOne({ _id: req.params.id })
          .then((post) => {
            // Si oui et que le post contient une image => suppression du post
            if (post.imageUrl) {
              const filename = post.imageUrl.split("/images/")[1];
              fs.unlink(`images/${filename}`, () => {
                Post.deleteOne({ _id: req.params.id })
                  .then(() => {
                    res.status(200).json({ message: "Post supprimé !" });
                  })
                  .catch((error) => res.status(401).json({ error }));
              });
              /// Si oui et que le post ne contient pas d'image => suppression du post
            } else {
              Post.deleteOne({ _id: req.params.id })
                .then(() => {
                  res.status(200).json({ message: "Post supprimé !" });
                })
                .catch((error) => res.status(401).json({ error }));
            }
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      } else {
        Post.findOne({ _id: req.params.id })
          .then((post) => {
            // Si non et que le post contient une image => suppression du post s'il en est le créateur
            if (post.imageUrl) {
              if (post.userId != req.auth.userId) {
                res.status(401).json({ message: "Non autorisé !" });
              } else {
                const filename = post.imageUrl.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                  Post.deleteOne({ _id: req.params.id })
                    .then(() => {
                      res.status(200).json({ message: "Post supprimé !" });
                    })
                    .catch((error) => res.status(401).json({ error }));
                });
              }
            } else {
              /// Si non et que le post ne contient pas d'image => suppression du post s'il en est le créateur
              if (post.userId != req.auth.userId) {
                res.status(401).json({ message: "Non autorisé !" });
              } else {
                Post.deleteOne({ _id: req.params.id })
                  .then(() => {
                    res.status(200).json({ message: "Post supprimé !" });
                  })
                  .catch((error) => res.status(401).json({ error }));
              }
            }
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

//////////// RECUPERER TOUS LES POSTS ////////////
exports.getAllPost = (req, res, next) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
