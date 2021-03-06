const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const Posts = require('./dbschemas/posts');
const app = express();

mongoose.connect('mongodb://localhost/cleanblog-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
  const posts = await Posts.find({});
  res.render('index', {
    posts,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.post('/posts', async (req, res) => {
  await Posts.create(req.body);
  // await console.log(req.body);
  res.redirect('/');
});

app.get('/posts/:id', async (req, res) => {
  // console.log(req.params.id);
  const post = await Posts.findById(req.params.id);
  res.render('post', {
    post,
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}.`);
});