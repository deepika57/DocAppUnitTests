require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const user = require("./model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { regexpToText } = require("nodemon/lib/utils");

const uri = process.env.Atlas_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection has been established");
});

const app = express();

app.use("/", express.static(path.join(__dirname, "static")));
app.use(bodyparser.json());

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

app.post("/api/change-password", authenticateToken, async (req, res) => {
  try {
    jwt.verify(req.token, JWT_SECRET, (err, user));
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "Incorrect Token" });
  }
  res.json({ status: "success", data: "Verified" });
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const User = await user.findOne({ username }).lean();

  if (!User) {
    return res.json({ status: "error", error: "Invalid username/password" });
  }

  if (await bcrypt.compare(password, User.password)) {
    const token = jwt.sign(
      {
        id: User.id,
        username: User.username,
      },
      JWT_SECRET
    );

    return res.json({ status: "ok", acesstoken: token });
  }

  res.json({ status: "error", data: "Invalid username/password" });
});

app.post("/api/register", async (req, res) => {
  const { username, email, password: plaintextpassword } = req.body;

  if (!username || typeof username !== "string") {
    return res.json({
      status: "error",
      error: "Invalid username",
    });
  }

  if (!email || typeof email !== "string") {
    return res.json({
      status: "error",
      error: "Invalid email",
    });
  }

  if (email.includes("@") !== true) {
    return res.json({
      status: "error",
      error: "Invalid email. Should contain @",
    });
  }

  if (email.includes(".com") !== true) {
    return res.json({
      status: "error",
      error: "Invalid email. Should contain .com",
    });
  }

  if (!plaintextpassword || typeof plaintextpassword !== "string") {
    return res.json({
      status: "error",
      error: "Invalid password",
    });
  }

  if (plaintextpassword.length < 7) {
    return res.json({
      status: "error",
      error: "Password too small. Min length should be 7",
    });
  }
  const password = await bcrypt.hash(plaintextpassword, 12);

  try {
    const response = await user.create({
      username,
      email,
      password,
    });
    console.log("User created successfully", response);
  } catch (error) {
    if (error.code == 11000) {
      return res.json({ status: "error", error: "Username already in use" });
    }
    throw error;
  }

  res.json({ status: "ok" });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (typeof authHeader !== "undefined") {
    const token = authHeader.split(" ")[1];
    req.token = token;
    next();
  } else {
    return res.sendStatus(403);
  }
}

app.listen(3000, () => {
  console.log("Server up at 3000");
});
