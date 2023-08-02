import express from "express";
import bodyParser from "body-parser";
import _ from "lodash";
import { fileURLToPath } from "url";
import {dirname} from "path";
const app = express();
const PORT = process.env.PORT || 8000;
const date = new Date();
let posts = [];

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicPath = __dirname + '/public';
const viewsPath = __dirname + "/views";


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

    let requestedPost = _.lowerCase(req.params.postName);

    posts.forEach(post => {
        let title = _.lowerCase(post.title)
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