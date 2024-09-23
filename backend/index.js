require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./middleware/jwtManager");
const cors = require("cors");
const fs = require("fs");
const app = express();

// database
let users = [];
let posts = [];

fs.readFile("./user.json", (err, data) => {
  if (err) {
    return res.status(400).json(err);
  } else {
    users = JSON.parse(data);
  }
});
fs.readFile("./data.json", (err, data) => {
  if (err) {
    return res.status(400).json(err);
  } else {
    posts = JSON.parse(data);
  }
});

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// User registration
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const newUser = { username, password };
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    users.push(newUser);
    fs.writeFile("./user.json", JSON.stringify(users), (err) => {
      if (err) {
        return res.status(400).json(err);
      } else {
        return res.status(201).json("User data saved successfully");
      }
    });
  } else {
    return res.status(400).json("User already exists");
  }
});

// User login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) return res.status(404).json("Please check your details");

  const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY);
  res.status(200).json({ token, message: "login Successfully" });
});

// Protected route
app.post("/protected/post", authenticateToken, (req, res) => {
  const { title, content } = req.body;
  const newPost = {title,content};
  posts.push(newPost);
  fs.writeFile("./data.json", JSON.stringify(posts), (err) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.status(200).send("Your post saved successfully");
    }
  });
});
app.get("/protected/read", authenticateToken, (req, res) => {
  fs.readFile("./data.json", (err, data) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.status(200).send(JSON.parse(data));
    }
  });
});

app.listen(8080, () => {
  console.log(`Server started`);
});
