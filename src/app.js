// global variables
const request = require("request");
const path = require("path");
const hbs = require("hbs");

//install express
const express = require("express");
const app = express();
//setting up a localhost port
const port = 3000 || process.env.PORT;

// const publicDirectory = path.join(__dirname, `../public`);
// app.use(express.static(publicDirectory));

app.set("view engine", "hbs");
// making access to views path
const viewPath = path.join(__dirname, "../templates/views");
app.set("views", viewPath);
// making access to partials path
const partialPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialPath);

// news url
const newsUrl = `https://newsapi.org/v2/top-headlines?country=eg&category=entertainment&apiKey=b108536f0fae47d387099adf2655a86d`;

// HTTP request to news url
request({ url: newsUrl, json: true }, (error, response) => {
    app.get("", (req, res) => {
        res.render("index", {
            data: response.body.articles,
        });
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});