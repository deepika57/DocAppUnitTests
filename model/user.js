const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userschema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { collection: "Users" }
);

const Usermodel = mongoose.model("Users", userschema);

module.exports = {
  Usermodel,
  verifyUserName,
  verifyPassword,
  verifyEmail,
  submit,
  changePassword,
  verifyRegisteredUser,
  verifyUnRegisteredUser,
};

function verifyPassword(password) {
  if (password.length > 7) {
    return true;
  }
  return false;
}

function verifyUserName(username) {
  if (username.length > 8) {
    return true;
  }
  return false;
}

function verifyEmail(email) {
  if (email.includes("@")) {
    return true;
  }
  return false;
}

function submit() {
  return true;
}

function changePassword(newpassword) {
  if (newpassword.length > 7) {
    return true;
  }
  return false;
}

function verifyRegisteredUser(username) {
  if (username.length > 7) {
    return true;
  }
  return false;
}

function verifyUnRegisteredUser(username) {
  if (username.length > 7) {
    return true;
  }
  return false;
}
