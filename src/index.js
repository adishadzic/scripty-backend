import express from 'express';
import mongoose from 'mongoose';

require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const AuthRoute = require('./routes/authRoute');

app.get('/', (req, res) => res.send('Hello World'));

app.use('/auth', AuthRoute);

app.listen(port, () =>
  console.log(`Server running on port: http://localhost:${port}`)
);
