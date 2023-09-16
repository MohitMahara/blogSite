const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8000;
const date = new Date();

const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../views");



app.use(bodyParser.urlencoded({
    extended: true
}));

app.set("view engine", "ejs");

app.use(express.static(publicPath));
app.set('views', viewsPath);

mongoose.connect("mongodb://127.0.0.1:27017/blogDB", {
    useNewUrlParser: true
});

const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Post = mongoose.model("Post", postSchema);


app.get("/", (req, res) => {

    Post.find().then((posts) => {
        res.render("index", {
            year: date.getFullYear(),
            posts : posts
        });
    })


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

    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postBody
    })

    post.save();
    res.redirect('/');
  
})


app.get("/posts/:postId", async(req, res) => {

  let requestedPostId = req.params.postId
  await Post.findOne({_id : requestedPostId}).then((post) =>{
    res.render('post', {
         year: date.getFullYear(),
         title : post.title,
         content : post.content,
         postId : post._id
    })
  })
});


app.post('/delete', async (req, res) =>{
  const  deletingPostId =  req.body.deletePost;
  await Post.deleteOne({_id : deletingPostId});
  res.redirect('/')

})


app.listen(PORT, () => {
    console.log(`listening to the port ${PORT}`);
})