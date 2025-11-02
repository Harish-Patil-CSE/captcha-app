const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const svgCaptcha = require("svg-captcha");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.static(path.join(__dirname, "public"))); // serve frontend files

app.get("/captcha", (req, res) => {
  const captcha = svgCaptcha.create({
    size: 5,
    noise: 3,
    color: true,
    background: "#f0f0f0",
  });
  req.session.captcha = captcha.text;
  res.type("svg");
  res.status(200).send(captcha.data);
});

app.post("/verify", (req, res) => {
  const userInput = req.body.captcha;
  if (userInput && userInput === req.session.captcha) {
    return res.send(
      "<h3 style='color:green;'>CAPTCHA verified ✅</h3><a href='/'>Try again</a>"
    );
  } else {
    return res.send(
      "<h3 style='color:red;'>Incorrect CAPTCHA ❌</h3><a href='/'>Try again</a>"
    );
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
