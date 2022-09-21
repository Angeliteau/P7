const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");
const CryptoJS = require("crypto-js");

//////////// S'INSCRIRE ////////////
exports.signup = (req, res, next) => {
  // Création de la requête avec hashage du MDP et cryptage de l'email
  bcrypt
    .hash(req.body.password, parseInt(process.env.HASH_NUMBER))
    .then((hash) => {
      const user = new User({
        pseudo: req.body.pseudo,
        email: CryptoJS.HmacSHA256(
          req.body.email,
          process.env.SECRET_KEY
        ).toString(),
        password: hash,
      });
      // REGEX pour la cohérence de l'email
      if (
        req.body.email.match(
          "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
          "g"
        )
      ) {
        user
          .save()
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        res.status(500).json({ message: "Format d'email incorrect" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

//////////// SE CONNECTER ////////////
exports.login = (req, res, next) => {
  // Décryptage de l'email
  let emailCrypt = CryptoJS.HmacSHA256(
    req.body.email,
    process.env.SECRET_KEY
  ).toString();
  // Si l'email existe
  User.findOne({ email: emailCrypt })
    .then((user) => {
      if (!user) {
        return res.status(401).json("Utilisateur non trouvé !");
      }
      // Function de hashage du MDP
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(402).json("Mot de passe incorrect !");
          } // Si Email et MDP correct => Création d'un cookie de JWT
          let maxAge = 240000000;
          let token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: "24h",
          });
          res.cookie("jwt", token, { maxAge });
          res.status(200).json(user._id);
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//////////// SE DECONNECTER ////////////
exports.logout = (req, res) => {
  // Retire le cookie JWT
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ message: "Utilisateur déconnecté !" });
};

//////////// RECUPERER UN UTILISATEUR ////////////
exports.getOneUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })

    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
