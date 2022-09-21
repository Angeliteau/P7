const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//////////// MODELE D'UTILISATEUR ////////////
const userSchema = mongoose.Schema({
  pseudo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  Admin: { type: Boolean, default: false },
});
// Plugin pour l'impossibilité de doublon pour l'email
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);
