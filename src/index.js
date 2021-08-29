import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const AuthRoute = require('./routes/authRoute');

const app = express();
const port = 3000;

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

app.get('/', (req, res) => res.send('Hello World'));

app.use('/auth', AuthRoute);

app.listen(port, () => console.log(`Server running on port: http://localhost:${port}`));
