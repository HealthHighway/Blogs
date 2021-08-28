require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const session = require("express-session");
const axios = require("axios");
require("firebase/auth");
require("firebase/firestore");
require("firebase/database");
const fetch = require("node-fetch");
const qs = require("qs");
const _ = require("lodash");
const app = express();
const blogData = require("./views/blogData");

const server = http.createServer(app);
const io = require("socket.io")(server);

const baseUrl = "http://13.127.204.161:5000";

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "Healthhighway2020Secretforthisyear",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: false, path: "/", maxAge: 12342424 },
  })
);

// Blog Routes //
app.get("/", (req, res) => {
  res.render("blogs", {
    blogData,
  });
});

app.get("/blogs/:id", (req, res) => {
  const requestParams = _.lowerCase(req.params.id);
  blogData.forEach(function (post) {
    const storedTitel = _.lowerCase(post.heading);
    if (storedTitel === requestParams) {
      res.render("blogsfullDetails", {
        date: post.date,
        heading: post.heading,
        subheading: post.subheading,
        discription: post.discription,
        discription2: post.discription2,
        image: post.image,
        image2: post.image2,
      });
    }
  });
});

app.get("*", (req, res) => {
  res.redirect("/");
});

var port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`listening at ${port}`);
});
