const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 5);
  next();
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
