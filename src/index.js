const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const auth = require('./routes/auth');
dotenv.config();

const AuthRoute = require('./routes/authRoute');
const verifyToken = require('./middleware/verifyToken');

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

app.get('/test', (req, res) => res.send('Hello World'));

app.use('/auth', AuthRoute);

app.listen(process.env.PORT || port, () => console.log(`Server running on port: http://localhost:${port}`));
