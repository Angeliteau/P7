const express = require("express");
const helmet = require("helmet");
require("dotenv").config();
const cookiparser = require("cookie-parser");
const sauceRoutes = require("./routes/sauce");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./routes/user");
const path = require("path");
const rateLimit = require("express-rate-limit");

app.use(express.json());
app.use(helmet());
app.use(cookiparser());

//////////// LIMITATION DU NOMBRE DE REQUETE ////////////
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

//////////// CORS ////////////
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

//////////// CONNETION A BDD ////////////
mongoose
  .connect(process.env.MONGOLOG, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//////////// ROUTES ////////////
app.use("/api/posts", sauceRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
