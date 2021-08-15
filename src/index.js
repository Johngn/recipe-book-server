const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const middlewares = require('./middlewares');
const recipes = require('./api/recipes');

require('dotenv').config();

const app = express();

// old version of uri to avoid errors
const db = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@recipe-book-data-shard-00-00.foorh.mongodb.net:27017,recipe-book-data-shard-00-01.foorh.mongodb.net:27017,recipe-book-data-shard-00-02.foorh.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-1x813d-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(morgan('common')); // logger
app.use(helmet()); // added security
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // allow cross origin
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello',
  });
});

app.use('/api/recipes', recipes);

// not found middleware
app.use(middlewares.notFound);

// other error middleware
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
