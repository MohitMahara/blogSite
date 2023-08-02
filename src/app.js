const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const lodash = require("lodash");
const app = express();
const PORT = process.env.PORT || 8000;
const date = new Date();
let posts = [];

const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../views");
console.log(publicPath);
console.log(viewsPath);


app.use(bodyParser.urlencoded({
    extended: true
}));

app.set("view engine", "ejs");

app.use(express.static(publicPath));
app.set('views', viewsPath );

app.get("/", (req, res) => {
    res.render('index', {
        year: date.getFullYear(),
        posts: posts
    });
})

app.get("/about", (req, res) => {
    res.render('about', {
        year: date.getFullYear(),
    });
})

app.get("/contact", (req, res) => {
    res.render('contact', {
        year: date.getFullYear(),
    });
})


app.get("/compose", (req, res) => {
    res.render("compose", {
        year: date.getFullYear(),
    });
})

app.post("/compose", (req, res) => {

    const newPost = {
        title: req.body["title"],
        data: req.body["postData"]
    }

    posts.push(newPost);

    res.redirect("/");
})

app.get("/posts/:postName", (req, res) => {

    let requestedPost = lodash.lowerCase(req.params.postName);

    posts.forEach(post => {
        let title = lodash.lowerCase(post.title)
        if (requestedPost === title) {

            res.render("post", {
                year: date.getFullYear(),
                title : post.title,
                content : post.data,
            });
        }

    });
});


app.listen(PORT, () => {
    console.log(`listening to the port ${PORT}`);
})