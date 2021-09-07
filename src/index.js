const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const AuthRoute = require('./routes/authRoute');
const Post = require('./models/PostModel');
const Comment = require('./models/CommentModel');
const Posts = require('./routes/posts');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const connectionString = process.env.ATLAS_URI;
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.get('/test', (req, res) => {
  res.send('Hello ');
});

app.use('/auth', AuthRoute);

app.post('/upload', async (req, res) => {
  const scriptData = req.body;

  let scriptId = await Posts.uploadScript(scriptData);
  if (scriptId) {
    res.status(201).json({
      message: 'Successfully added script!',
      scriptId: scriptId,
    });
  } else {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

app.post('/scripts', async (req, res) => {
  let term = {};
  try {
    const result = await Posts.getScripts(term);
    res.json(result);
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
});

app.get('/scripts/:id', async (req, res) => {
  let id = req.params.id;
  let result = await Post.collection.findOne({ _id: mongoose.Types.ObjectId(id) });
  res.json(result);
});

app.get('/scripts', async (req, res) => {
  let query = req.query;

  try {
    let selection = {};
    if (query._any) {
      let pretraga = query._any;
      let terms = pretraga.split(' ');
      let atributi = ['scriptName', 'university'];

      selection = {
        $and: [],
      };

      terms.forEach((term) => {
        let or = {
          $or: [],
        };
        atributi.forEach((atribut) => {
          or.$or.push({ [atribut]: new RegExp(term) });
        });
        selection.$and.push(or);
      });
    }

    const cursor = await Post.collection.find(selection);
    const results = await cursor.toArray();
    res.json(results);
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
});

app.get('/comments/:scriptId', async (req, res) => {
  let scriptId = req.params.scriptId;

  let result = await Comment.collection.find({ scriptId: scriptId });
  let cursor = await result.toArray();
  res.json(cursor);
});

app.post('/comment', async (req, res) => {
  let data = req.body;

  delete data._id;

  let result = await Comment.collection.insertOne(data);

  if (result && result.insertedCount == 1) {
    res.json(result.ops[0]);
  } else {
    res.json({
      status: 'Something went left',
    });
  }
});

app.post('/delete/:comment', async (req, res) => {
  let commentId = req.params.comment;
  console.log(commentId);

  let result = await Comment.collection.deleteOne({ comment: commentId });
  if (result && result.deletedCount == 1) {
    res.json(result);
  } else {
    res.status(500).json({
      status: 'Something went left',
    });
  }
});

app.listen(process.env.PORT || port, () => console.log(`Server running on port: http://localhost:${port}`));
