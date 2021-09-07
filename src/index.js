const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
// const auth = require('./routes/auth');
dotenv.config();

const AuthRoute = require('./routes/authRoute');
const Post = require('./models/PostModel');
// const verifyToken = require('./middleware/verifyToken');
import Posts from './routes/posts';

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
      // kompozitni upiti
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

    console.log(selection);
    const cursor = await Post.collection.find(selection);
    const results = await cursor.toArray();
    res.json(results);
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
});

app.listen(process.env.PORT || port, () => console.log(`Server running on port: http://localhost:${port}`));
